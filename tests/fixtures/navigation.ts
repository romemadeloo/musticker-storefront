import type { Page, Response } from '@playwright/test';

import { internalOriginKey } from './env.js';
import { DEV_STOREFRONT_HOST } from './hosts.js';

// The storefront sits behind a WAF that rate-limits our single CI egress IP under full-suite load:
// the document request comes back as a bare nginx 403 Forbidden page instead of the app, in
// contiguous windows lasting from ~35s to well over a minute. Nothing is wrong with the site --
// the same URLs answer 200 on a manual re-check moments later.
//
// Playwright's own `retries: 2` cannot ride that out. Its three attempts run back-to-back with no
// backoff, so all of them land inside the same block window and the test dies on whatever content
// assertion follows the navigation ("element(s) not found" on a heading or the header banner),
// which says nothing about the real cause. Navigating through this helper instead re-requests the
// page with a growing delay before the caller ever asserts on content.
//
// The delays below spend ~29s over five attempts, which fits inside the 60s per-test timeout and,
// combined with Playwright's own retries, covers a window several times longer than any observed
// so far.
const throttleRetryDelaysMs = [2_000, 4_000, 8_000, 15_000];

// A block does not always hit the document. Observed on production 2026-08-28: the document
// answered 200 while every _nuxt chunk and stylesheet behind it came back 403, so the shell arrived,
// Nuxt never hydrated, and the caller failed on a missing heading -- the same misdiagnosis this
// helper exists to prevent, one layer down. That shape gets no retry from the document check alone.
//
// Three rather than one: a lone 403 on some individual asset is a real finding and must not be
// relabelled as throttling. A block refuses everything at once -- 45+ assets in the run that
// prompted this.
const subresourceBlockThreshold = 3;

const storefrontUrlPattern = new RegExp(`^https://${DEV_STOREFRONT_HOST}/`, 'i');

// 403s this helper deliberately navigated past, per page. The guard in e2e-test.ts records every
// failed response as it happens -- before this helper has seen the status -- so it cannot skip them
// at listen time; it subtracts them at assertion time instead. Keyed weakly so nothing outlives the
// page it belongs to.
const retriedThrottleBlocks = new WeakMap<Page, number>();

export function isThrottleBlockResponse(status: number, url: string): boolean {
  return status === 403 && storefrontUrlPattern.test(url);
}

// The browser logs the blocked document request to the console as well, so a forgiven 403 has to
// clear its console message alongside its response entry. Matched by prefix because the trailing
// parenthesised status text varies with what the blocker sends: the live WAF page omits it
// entirely ("... status of 403 ()"), other responders spell it out ("... status of 403
// (Forbidden)").
export function isThrottleBlockConsoleError(text: string): boolean {
  return text.startsWith('Failed to load resource: the server responded with a status of 403');
}

export function retriedThrottleBlockCount(page: Page): number {
  return retriedThrottleBlocks.get(page) ?? 0;
}

/**
 * Navigates to a storefront path, retrying with backoff while the WAF answers 403.
 *
 * Returns the final response so callers can assert on its status, exactly like `page.goto`. Throws
 * a described error rather than returning a blocked response, so an exhausted retry budget reports
 * the throttling itself instead of surfacing as a downstream missing-element failure.
 */
export async function gotoStorefront(
  page: Page,
  path: string,
  options?: Parameters<Page['goto']>[1]
): Promise<Response | null> {
  let blockedSubresources = 0;

  const countBlockedSubresource = (response: Response): void => {
    if (
      response.request().resourceType() !== 'document' &&
      isThrottleBlockResponse(response.status(), response.url())
    ) {
      blockedSubresources += 1;
    }
  };

  page.on('response', countBlockedSubresource);

  try {
    let response = await page.goto(path, options);
    let attempts = 1;

    for (const delayMs of throttleRetryDelaysMs) {
      if (!isAttemptBlocked(response, blockedSubresources)) {
        return response;
      }

      countThrottleBlocks(page, blockedRequestCount(response, blockedSubresources));
      await new Promise((resolve) => setTimeout(resolve, delayMs));

      blockedSubresources = 0;
      response = await page.goto(path, options);
      attempts += 1;
    }

    if (isAttemptBlocked(response, blockedSubresources)) {
      // Counted as well, so the guard reports this one failure rather than trailing it with its own
      // soft assertions about the same blocked requests.
      countThrottleBlocks(page, blockedRequestCount(response, blockedSubresources));

      throw new Error(describeExhaustedRetries(response, path, attempts, blockedSubresources));
    }

    return response;
  } finally {
    page.off('response', countBlockedSubresource);
  }
}

function describeExhaustedRetries(
  response: Response | null,
  path: string,
  attempts: number,
  blockedSubresources: number
): string {
  const totalWaitSeconds = throttleRetryDelaysMs.reduce((sum, delay) => sum + delay, 0) / 1_000;
  const key = internalOriginKey();

  return [
    `Storefront returned 403 Forbidden for ${response?.url() ?? path} on all ${attempts} attempts ` +
      `over ~${totalWaitSeconds}s.`,
    isBlocked(response)
      ? 'The document request itself was refused.'
      : `The document answered ${response?.status() ?? '(no response)'} but ${blockedSubresources} of ` +
        'its assets were refused, so Nuxt never hydrated and the page stayed an empty shell.',
    'This is WAF/rate-limit throttling of the CI egress IP, not a broken page: the same URL',
    'normally answers 200 on a manual re-check.',
    '',
    // Which of the two failure modes this is decides who can fix it, and the answer is not
    // otherwise visible in a published report -- an unset secret sends no header and looks exactly
    // like a rejected one.
    key
      ? 'An x-internal-origin key WAS sent for this run and the WAF refused anyway, so the key is ' +
        'not being accepted. That is a question for whoever owns the WAF rule, not a test fix.'
      : 'No x-internal-origin key was sent for this run, so the WAF exemption was never in play. ' +
        'Check that INTERNAL_ORIGIN_KEY (production) or DEV_INTERNAL_ORIGIN_KEY (development-*) is ' +
        'set for this job; env.ts picks by target environment.',
    '',
    'Failing that, widen throttleRetryDelaysMs in tests/fixtures/navigation.ts if the block windows',
    'have grown.'
  ].join('\n');
}

// A 200 is only trustworthy if the assets under it were not being refused at the same time. See the
// note on subresourceBlockThreshold.
function isAttemptBlocked(response: Response | null, blockedSubresources: number): boolean {
  return isBlocked(response) || blockedSubresources >= subresourceBlockThreshold;
}

// How many refusals this attempt produced, which is how many entries the guard has to forgive: one
// for a blocked document, plus one per refused asset.
function blockedRequestCount(response: Response | null, blockedSubresources: number): number {
  return (isBlocked(response) ? 1 : 0) + blockedSubresources;
}

function isBlocked(response: Response | null): boolean {
  return Boolean(response && isThrottleBlockResponse(response.status(), response.url()));
}

function countThrottleBlocks(page: Page, count: number): void {
  retriedThrottleBlocks.set(page, retriedThrottleBlockCount(page) + count);
}
