import { test as base, expect } from '@playwright/test';

type GuardOptions = {
  allowGuestUserMe401: boolean;
  allowKnownPriceWarnings: boolean;
  allowKnownHydrationMismatch: boolean;
  allowExpectedAuthFailures: boolean;
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

function isKnownConsoleMessage(text: string, options: GuardOptions): boolean {
  if (options.allowGuestUserMe401 && /401/.test(text)) {
    return true;
  }

  if (
    options.allowKnownPriceWarnings &&
    /Updating prices|Invalid data Proxy|Invalidd minimum quantity|Calculating carts|New Size:/.test(text)
  ) {
    return true;
  }

  if (options.allowKnownHydrationMismatch && text === 'Hydration completed but contains mismatches.') {
    return true;
  }

  return false;
}

export const test = base.extend<GuardOptions>({
  allowGuestUserMe401: [false, { option: true }],
  allowKnownPriceWarnings: [true, { option: true }],
  allowKnownHydrationMismatch: [false, { option: true }],
  allowExpectedAuthFailures: [false, { option: true }],

  page: async (
    { page, allowGuestUserMe401, allowKnownPriceWarnings, allowKnownHydrationMismatch, allowExpectedAuthFailures },
    use
  ) => {
    const guardOptions = {
      allowGuestUserMe401,
      allowKnownPriceWarnings,
      allowKnownHydrationMismatch,
      allowExpectedAuthFailures
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

      responseFailures.push(`${status} ${url}`);
    });

    await use(page);

    expect.soft(consoleFailures, 'Unexpected browser console errors or warnings').toEqual([]);
    expect.soft(responseFailures, 'Unexpected failed HTTP responses').toEqual([]);
  }
});

export { expect };
