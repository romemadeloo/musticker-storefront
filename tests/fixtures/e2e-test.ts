import { test as base, expect } from '@playwright/test';

type GuardOptions = {
  allowGuestUserMe401: boolean;
  allowKnownPriceWarnings: boolean;
  allowExpectedAuthFailures: boolean;
  allowKnownNuxtPayloadFailures: boolean;
  allowTransientCartCreateFailures: boolean;
  allowTransientApiCorsFailures: boolean;
  allowTransientProductPageFailures: boolean;
  allowGuestCheckoutBootstrap401: boolean;
};

function isExpectedGuestUserMe401(status: number, url: string): boolean {
  return status === 401 && url.includes('/sys/kr/user/me');
}

// The checkout page eagerly bootstraps account-linked data (saved addresses, points balance,
// coupon eligibility) even for anonymous shoppers with a guest cart; those calls correctly 401
// for a guest and are not indicative of a bug.
function isExpectedGuestCheckoutBootstrap401(status: number, url: string): boolean {
  return status === 401 && /\/sys\/kr\/(?:user-address|user-point\/points|coupon\/applicable|address\/validate)(?:\?|$)/i.test(url);
}

function isGuestCheckoutBootstrapUnauthorizedWarning(text: string): boolean {
  return text === 'Unauthorized action!';
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

function isSupersededPricingRequest(text: string): boolean {
  return (
    /Pricing request failed! FetchError: \[GET\] "https:\/\/(?:dev-)?api\.musticker\.com\/.*\/pricing\/quotation\/[^"]+": <no response> Canceled due to newer request\./.test(
      text
    ) || text === 'Pricing request failed! AbortError: The user aborted a request.'
  );
}

function isCartCreateCorsFailure(text: string): boolean {
  return /Access to fetch at 'https:\/\/(?:dev-)?api\.musticker\.com\/.*\/cart\/create' .*CORS policy/i.test(text);
}

function isCartCreateFetchFailure(text: string): boolean {
  return /FetchError: \[POST\] "https:\/\/(?:dev-)?api\.musticker\.com\/.*\/cart\/create": <no response> Failed to fetch/i.test(
    text
  );
}

function isTransientApiCorsFailure(text: string): boolean {
  return /Access to fetch at 'https:\/\/(?:dev-)?api\.musticker\.com\/.*' from origin 'https:\/\/dev\.musticker\.com' has been blocked by CORS policy/i.test(
    text
  );
}

function isTransientApiFetchFailure(text: string): boolean {
  return /FetchError: \[(?:GET|POST|PUT|PATCH|DELETE)\] "https:\/\/(?:dev-)?api\.musticker\.com\/.*": <no response> Failed to fetch/i.test(
    text
  );
}

function isTransientProductPageServerFailure(status: number, url: string): boolean {
  return (
    [502, 503].includes(status) &&
    /^https:\/\/www\.musticker\.com\/kr\/(?:stickers|roll-stickers|sheet-stickers)\/[^/?#]+/i.test(url)
  );
}

function isBenignUnusedPreloadWarning(text: string): boolean {
  return /The resource https:\/\/www\.musticker\.com\/illustrations\/products\/.* was preloaded using link preload but not used within a few seconds/i.test(
    text
  );
}

function isKnownConsoleMessage(text: string, options: GuardOptions): boolean {
  if (isBenignUnusedPreloadWarning(text)) {
    return true;
  }

  if (options.allowGuestCheckoutBootstrap401 && isGuestCheckoutBootstrapUnauthorizedWarning(text)) {
    return true;
  }

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
      /Static review preload failed\.[\s\S]*getActivePinia\(\)/i.test(text) ||
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
  allowTransientCartCreateFailures: [false, { option: true }],
  allowTransientApiCorsFailures: [false, { option: true }],
  allowTransientProductPageFailures: [false, { option: true }],
  allowGuestCheckoutBootstrap401: [false, { option: true }],

  page: async (
    {
      page,
      allowGuestUserMe401,
      allowKnownPriceWarnings,
      allowExpectedAuthFailures,
      allowKnownNuxtPayloadFailures,
      allowTransientCartCreateFailures,
      allowTransientApiCorsFailures,
      allowTransientProductPageFailures,
      allowGuestCheckoutBootstrap401
    },
    use
  ) => {
    const guardOptions = {
      allowGuestUserMe401,
      allowKnownPriceWarnings,
      allowExpectedAuthFailures,
      allowKnownNuxtPayloadFailures,
      allowTransientCartCreateFailures,
      allowTransientApiCorsFailures,
      allowTransientProductPageFailures,
      allowGuestCheckoutBootstrap401
    };
    const consoleFailures: string[] = [];
    const responseFailures: string[] = [];
    let hadSupersededPricingRequest = false;
    let pendingCartCreateNetworkFailures = 0;
    let pendingTransientApiNetworkFailures = 0;
    let pendingTransientProductPageFailures = 0;

    page.on('console', (message) => {
      if (!['error', 'warning'].includes(message.type())) {
        return;
      }

      const text = message.text();
      if (
        allowTransientProductPageFailures &&
        pendingTransientProductPageFailures > 0 &&
        /Failed to load resource: the server responded with a status of 50[23]/i.test(text)
      ) {
        pendingTransientProductPageFailures = Math.max(0, pendingTransientProductPageFailures - 1);
        return;
      }

      if (allowTransientApiCorsFailures && isTransientApiCorsFailure(text)) {
        pendingTransientApiNetworkFailures += 1;
        return;
      }

      if (
        allowTransientApiCorsFailures &&
        pendingTransientApiNetworkFailures > 0 &&
        text === 'Failed to load resource: net::ERR_FAILED'
      ) {
        return;
      }

      if (allowTransientApiCorsFailures && isTransientApiFetchFailure(text)) {
        pendingTransientApiNetworkFailures = Math.max(0, pendingTransientApiNetworkFailures - 1);
        return;
      }

      if (allowTransientCartCreateFailures && isCartCreateCorsFailure(text)) {
        pendingCartCreateNetworkFailures += 1;
        return;
      }

      if (
        allowTransientCartCreateFailures &&
        pendingCartCreateNetworkFailures > 0 &&
        text === 'Failed to load resource: net::ERR_FAILED'
      ) {
        return;
      }

      if (allowTransientCartCreateFailures && isCartCreateFetchFailure(text)) {
        pendingCartCreateNetworkFailures = Math.max(0, pendingCartCreateNetworkFailures - 1);
        return;
      }

      if (allowKnownPriceWarnings && isSupersededPricingRequest(text)) {
        hadSupersededPricingRequest = true;
        return;
      }

      if (allowKnownPriceWarnings && hadSupersededPricingRequest && text === 'Unable to retrieve prices.') {
        hadSupersededPricingRequest = false;
        return;
      }

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

      if (allowTransientProductPageFailures && isTransientProductPageServerFailure(status, url)) {
        pendingTransientProductPageFailures += 1;
        return;
      }

      if (allowGuestCheckoutBootstrap401 && isExpectedGuestCheckoutBootstrap401(status, url)) {
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
