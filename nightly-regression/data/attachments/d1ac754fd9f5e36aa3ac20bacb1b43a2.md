# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: purchasing/sheet-sticker-size-rules.spec.ts >> storefront v2 sheet sticker size rules (minimum two stickers per sheet) >> MS-V2-073 타원형 시트 스티커 rejects a custom size that fits only one sticker per sheet
- Location: tests/e2e/purchasing/sheet-sticker-size-rules.spec.ts:47:5

# Error details

```
Error: Storefront returned 403 Forbidden for https://www.musticker.com/kr/sheet-stickers/oval-sheet on all 5 attempts over ~29s.
The document request itself was refused.
This is WAF/rate-limit throttling of the CI egress IP, not a broken page: the same URL
normally answers 200 on a manual re-check.

An x-internal-origin key WAS sent for this run and the WAF refused anyway, so the key is not being accepted. That is a question for whoever owns the WAF rule, not a test fix.

Failing that, widen throttleRetryDelaysMs in tests/fixtures/navigation.ts if the block windows
have grown.
```

```
Error: Unexpected browser console errors or warnings

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 20

- Array []
+ Array [
+   "[error] TypeError: Failed to fetch dynamically imported module: https://www.musticker.com/_nuxt/C-aw2VvM.js",
+   "[error] [nuxt] error caught during app initialization Hc: Failed to fetch dynamically imported module: https://www.musticker.com/_nuxt/C-aw2VvM.js",
+   "[warning] Failed to load messages for locale \"kr\" FetchError: [GET] \"/_i18n/9ea404f6/kr/messages.json\": 403 
+     at async s (https://www.musticker.com/_nuxt/Dg7tq4wn.js:4:69752)
+     at async p (https://www.musticker.com/_nuxt/Dg7tq4wn.js:4:239324)
+     at async Object.loadMessages (https://www.musticker.com/_nuxt/Dg7tq4wn.js:4:240392)
+     at async Bd (https://www.musticker.com/_nuxt/Dg7tq4wn.js:4:243285)
+     at async setup (https://www.musticker.com/_nuxt/Dg7tq4wn.js:6:30230)
+     at async J3 (https://www.musticker.com/_nuxt/Dg7tq4wn.js:4:76854)
+     at async a (https://www.musticker.com/_nuxt/Dg7tq4wn.js:4:77389)
+     at async https://www.musticker.com/_nuxt/Dg7tq4wn.js:4:77290
+     at async Promise.all (index 1)
+     at async https://www.musticker.com/_nuxt/Dg7tq4wn.js:4:77199",
+   "[error] [nuxt] error caught during app initialization Hc: Failed to fetch dynamically imported module: https://www.musticker.com/_nuxt/C-aw2VvM.js",
+   "[error] [nuxt] error caught during app initialization Hc: Failed to fetch dynamically imported module: https://www.musticker.com/_nuxt/C-aw2VvM.js",
+   "[error] Failed to load resource: the server responded with a status of 403 ()",
+   "[error] Failed to load resource: the server responded with a status of 403 ()",
+   "[error] Failed to load resource: the server responded with a status of 403 ()",
+ ]
```

```
Error: Unexpected failed HTTP responses

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 5

- Array []
+ Array [
+   "403 https://www.musticker.com/kr/sheet-stickers/oval-sheet",
+   "403 https://www.musticker.com/kr/sheet-stickers/oval-sheet",
+   "403 https://www.musticker.com/kr/sheet-stickers/oval-sheet",
+ ]
```

# Page snapshot

```yaml
- heading "403 Forbidden" [level=1] [ref=e3]
```

# Test source

```ts
  338 | 
  339 |       if (allowTransientApiCorsFailures && isTransientApiFetchFailure(text)) {
  340 |         pendingTransientApiNetworkFailures = Math.max(0, pendingTransientApiNetworkFailures - 1);
  341 |         return;
  342 |       }
  343 | 
  344 |       if (allowTransientCartCreateFailures && isCartCreateCorsFailure(text)) {
  345 |         pendingCartCreateNetworkFailures += 1;
  346 |         return;
  347 |       }
  348 | 
  349 |       if (
  350 |         allowTransientCartCreateFailures &&
  351 |         pendingCartCreateNetworkFailures > 0 &&
  352 |         text === 'Failed to load resource: net::ERR_FAILED'
  353 |       ) {
  354 |         return;
  355 |       }
  356 | 
  357 |       if (allowTransientCartCreateFailures && isCartCreateFetchFailure(text)) {
  358 |         pendingCartCreateNetworkFailures = Math.max(0, pendingCartCreateNetworkFailures - 1);
  359 |         return;
  360 |       }
  361 | 
  362 |       if (allowKnownPriceWarnings && isSupersededPricingRequest(text)) {
  363 |         hadSupersededPricingRequest = true;
  364 |         return;
  365 |       }
  366 | 
  367 |       if (allowKnownPriceWarnings && hadSupersededPricingRequest && text === 'Unable to retrieve prices.') {
  368 |         hadSupersededPricingRequest = false;
  369 |         return;
  370 |       }
  371 | 
  372 |       if (isKnownConsoleMessage(text, guardOptions)) {
  373 |         return;
  374 |       }
  375 | 
  376 |       consoleFailures.push(`[${message.type()}] ${text}`);
  377 |     });
  378 | 
  379 |     page.on('response', (response) => {
  380 |       const status = response.status();
  381 |       if (status < 400) {
  382 |         return;
  383 |       }
  384 | 
  385 |       const url = response.url();
  386 |       if (allowGuestUserMe401 && isExpectedGuestUserMe401(status, url)) {
  387 |         return;
  388 |       }
  389 | 
  390 |       if (allowExpectedAuthFailures && isExpectedAuthFailure(status, url)) {
  391 |         return;
  392 |       }
  393 | 
  394 |       if (allowKnownNuxtPayloadFailures && isKnownNuxtPayloadFailure(status, url)) {
  395 |         return;
  396 |       }
  397 | 
  398 |       if (allowTransientProductPageFailures && isTransientProductPageServerFailure(status, url)) {
  399 |         pendingTransientProductPageFailures += 1;
  400 |         return;
  401 |       }
  402 | 
  403 |       if (allowExpectedNotFound && isExpectedStorefrontNotFound(status, url)) {
  404 |         pendingExpectedNotFoundResponses += 1;
  405 |         return;
  406 |       }
  407 | 
  408 |       if (allowGuestCheckoutBootstrap401 && isExpectedGuestCheckoutBootstrap401(status, url)) {
  409 |         return;
  410 |       }
  411 | 
  412 |       if (allowPostLogout401 && isPostLogoutMemberDataUnauthorized(status, url)) {
  413 |         return;
  414 |       }
  415 | 
  416 |       responseFailures.push(`${status} ${url}`);
  417 |     });
  418 | 
  419 |     await applyInternalOriginHeader(page);
  420 |     await use(page);
  421 | 
  422 |     // gotoStorefront() retries past WAF 403s, but the listeners above have already recorded each
  423 |     // blocked attempt by the time it does. Forgive exactly as many as it navigated past -- a 403
  424 |     // that nothing retried still fails the run.
  425 |     const throttleBlocks = retriedThrottleBlockCount(page);
  426 | 
  427 |     expect
  428 |       .soft(
  429 |         dropForgiven(consoleFailures, throttleBlocks, isThrottleBlockConsoleFailure),
  430 |         'Unexpected browser console errors or warnings'
  431 |       )
  432 |       .toEqual([]);
  433 |     expect
  434 |       .soft(
  435 |         dropForgiven(responseFailures, throttleBlocks, isThrottleBlockResponseFailure),
  436 |         'Unexpected failed HTTP responses'
  437 |       )
> 438 |       .toEqual([]);
      |        ^ Error: Unexpected failed HTTP responses
  439 |   }
  440 | });
  441 | 
  442 | export { expect };
  443 | 
```