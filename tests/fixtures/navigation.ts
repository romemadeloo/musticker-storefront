import type { Page, Response } from '@playwright/test';

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
  let response = await page.goto(path, options);
  let attempts = 1;

  for (const delayMs of throttleRetryDelaysMs) {
    if (!isBlocked(response)) {
      return response;
    }

    countThrottleBlock(page);
    await new Promise((resolve) => setTimeout(resolve, delayMs));
    response = await page.goto(path, options);
    attempts += 1;
  }

  if (isBlocked(response)) {
    // Counted as well, so the guard reports this one failure rather than trailing it with its own
    // soft assertions about the same blocked requests.
    countThrottleBlock(page);

    const totalWaitSeconds = throttleRetryDelaysMs.reduce((sum, delay) => sum + delay, 0) / 1_000;

    throw new Error(
      [
        `Storefront returned 403 Forbidden for ${response?.url() ?? path} on all ${attempts} attempts ` +
          `over ~${totalWaitSeconds}s.`,
        'This is WAF/rate-limit throttling of the CI egress IP, not a broken page: the same URL',
        'normally answers 200 on a manual re-check. Re-run, or widen throttleRetryDelaysMs in',
        'tests/fixtures/navigation.ts if the block windows have grown.'
      ].join('\n')
    );
  }

  return response;
}

function isBlocked(response: Response | null): boolean {
  return Boolean(response && isThrottleBlockResponse(response.status(), response.url()));
}

function countThrottleBlock(page: Page): void {
  retriedThrottleBlocks.set(page, retriedThrottleBlockCount(page) + 1);
}
