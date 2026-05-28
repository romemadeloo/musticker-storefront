import { test as base, expect } from '@playwright/test';

type GuardOptions = {
  allowGuestUserMe401: boolean;
  allowKnownPriceWarnings: boolean;
  allowExpectedAuthFailures: boolean;
  allowKnownNuxtPayloadFailures: boolean;
};

function isExpectedGuestUserMe401(status: number, url: string): boolean {
  return status === 401 && url.includes('/sys/kr/user/me');
}

function isExpectedAuthFailure(status: number, url: string): boolean {
  if (![400, 401, 403, 404, 422].includes(status)) {
    return false;
  }

  return /auth|login|register|order|guest|non-member|user\/me/i.test(url);
}

function isKnownNuxtPayloadFailure(status: number, url: string): boolean {
  return status === 500 && /\/kr\/.*_payload\.json/i.test(url);
}

function isKnownConsoleMessage(text: string, options: GuardOptions): boolean {
  if (options.allowGuestUserMe401 && /401/.test(text)) {
    return true;
  }

  if (
    options.allowKnownPriceWarnings &&
    /Updating prices|Invalid data Proxy|Invalidd minimum quantity|Calculating carts|New Size:|price_per_mm/.test(text)
  ) {
    return true;
  }

  if (
    options.allowKnownNuxtPayloadFailures &&
    (/Cannot load payload\s+\/kr\/.*_payload\.json/i.test(text) ||
      /Hydration completed but contains mismatches/i.test(text) ||
      text === 'Failed to load resource: the server responded with a status of 500 ()')
  ) {
    return true;
  }

  return false;
}

export const test = base.extend<GuardOptions>({
  allowGuestUserMe401: [false, { option: true }],
  allowKnownPriceWarnings: [true, { option: true }],
  allowExpectedAuthFailures: [false, { option: true }],
  allowKnownNuxtPayloadFailures: [false, { option: true }],

  page: async (
    { page, allowGuestUserMe401, allowKnownPriceWarnings, allowExpectedAuthFailures, allowKnownNuxtPayloadFailures },
    use
  ) => {
    const guardOptions = {
      allowGuestUserMe401,
      allowKnownPriceWarnings,
      allowExpectedAuthFailures,
      allowKnownNuxtPayloadFailures
    };
    const consoleFailures: string[] = [];
    const responseFailures: string[] = [];

    page.on('console', (message) => {
      if (!['error', 'warning'].includes(message.type())) {
        return;
      }

      const text = message.text();
      if (isKnownConsoleMessage(text, guardOptions)) {
        return;
      }

      consoleFailures.push(`[${message.type()}] ${text}`);
    });

    page.on('response', (response) => {
      const status = response.status();
      if (status < 400) {
        return;
      }

      const url = response.url();
      if (allowGuestUserMe401 && isExpectedGuestUserMe401(status, url)) {
        return;
      }

      if (allowExpectedAuthFailures && isExpectedAuthFailure(status, url)) {
        return;
      }

      if (allowKnownNuxtPayloadFailures && isKnownNuxtPayloadFailure(status, url)) {
        return;
      }

      responseFailures.push(`${status} ${url}`);
    });

    await use(page);

    expect.soft(consoleFailures, 'Unexpected browser console errors or warnings').toEqual([]);
    expect.soft(responseFailures, 'Unexpected failed HTTP responses').toEqual([]);
  }
});

export { expect };
