# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth/change-password.spec.ts >> storefront change password >> seeded member >> MS-V2-090 change password stays disabled until every field is filled @validation
- Location: tests/e2e/auth/change-password.spec.ts:48:5

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator: getByTestId('account-profile-current-password-control')
Expected: "password"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('account-profile-current-password-control')

```

```
Error: Unexpected browser console errors or warnings

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 13

- Array []
+ Array [
+   "[error] NotFoundError: Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.
+     at insert (https://www.musticker.com/_nuxt/Cn3COCsy.js:4:44541)
+     at I (https://www.musticker.com/_nuxt/Cn3COCsy.js:4:23773)
+     at k (https://www.musticker.com/_nuxt/Cn3COCsy.js:4:23197)
+     at g (https://www.musticker.com/_nuxt/Cn3COCsy.js:4:22542)
+     at P (https://www.musticker.com/_nuxt/Cn3COCsy.js:4:25152)
+     at H (https://www.musticker.com/_nuxt/Cn3COCsy.js:4:25700)
+     at g (https://www.musticker.com/_nuxt/Cn3COCsy.js:4:22503)
+     at O6.A [as fn] (https://www.musticker.com/_nuxt/Cn3COCsy.js:4:26672)
+     at O6.run (https://www.musticker.com/_nuxt/Cn3COCsy.js:2:6423)
+     at w1 (https://www.musticker.com/_nuxt/Cn3COCsy.js:4:26265)",
+ ]
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - link "Musticker" [ref=e7] [cursor=pointer]:
          - /url: /kr
          - img "musticker logo" [ref=e8]
        - generic [ref=e9]:
          - button "공지사항 열기" [ref=e11] [cursor=pointer]:
            - img [ref=e13]
          - button "layout.header.search" [ref=e15] [cursor=pointer]:
            - img [ref=e16]
          - generic [ref=e18]:
            - button "장바구니" [ref=e19] [cursor=pointer]:
              - img [ref=e20]
            - generic: "1"
          - button "계정" [ref=e23] [cursor=pointer]:
            - img "Rome Tester" [ref=e26]
      - navigation "Primary":
        - link "스티커" [ref=e27] [cursor=pointer]:
          - /url: /kr/stickers
        - link "롤스티커" [ref=e28] [cursor=pointer]:
          - /url: /kr/roll-stickers
        - link "시트 스티커" [ref=e29] [cursor=pointer]:
          - /url: /kr/sheet-stickers
  - main [ref=e30]:
    - generic [ref=e31]:
      - generic [ref=e32]:
        - generic [ref=e33]:
          - generic [ref=e34]:
            - img "Rome Tester" [ref=e35]
            - img "Bumper Boss (Level 3)" [ref=e36]
          - generic [ref=e37]:
            - heading "Rome Tester" [level=5] [ref=e38]
            - paragraph [ref=e39]: MuScout (등급 1)
        - generic [ref=e40]:
          - generic [ref=e41]:
            - img "Orders" [ref=e42]
            - generic [ref=e43]:
              - paragraph [ref=e44]: 주문
              - paragraph [ref=e45]: "12"
          - generic [ref=e46]:
            - img "Points" [ref=e47]
            - generic [ref=e48]:
              - paragraph [ref=e49]: 포인트
              - paragraph [ref=e50]: "700"
          - generic [ref=e51]:
            - img "Coupons" [ref=e52]
            - generic [ref=e53]:
              - paragraph [ref=e54]: 쿠폰
              - paragraph [ref=e55]: "0"
          - generic [ref=e56]:
            - img "Total spent" [ref=e57]
            - generic [ref=e58]:
              - paragraph [ref=e59]: 총 결제 금액
              - paragraph [ref=e60]: 0원
      - navigation [ref=e61]:
        - link "프로필" [ref=e62] [cursor=pointer]:
          - /url: /kr/account/profile
          - img [ref=e63]
          - generic [ref=e65]: 프로필
        - link "주소록" [ref=e66] [cursor=pointer]:
          - /url: /kr/account/address-book
          - img [ref=e67]
          - generic [ref=e69]: 주소록
        - link "주문 내역" [ref=e70] [cursor=pointer]:
          - /url: /kr/account/orders
          - img [ref=e71]
          - generic [ref=e73]: 주문 내역
        - link "포인트" [ref=e74] [cursor=pointer]:
          - /url: /kr/account/points
          - img [ref=e75]
          - generic [ref=e77]: 포인트
        - link "쿠폰" [ref=e78] [cursor=pointer]:
          - /url: /kr/account/coupons
          - img [ref=e79]
          - generic [ref=e81]: 쿠폰
      - generic [ref=e82]:
        - heading "프로필" [level=4] [ref=e83]
        - generic [ref=e84]:
          - generic [ref=e86]:
            - heading "개인 정보" [level=2] [ref=e87]
            - paragraph [ref=e88]: 개인 정보 및 연락처 관리
          - generic [ref=e124]:
            - generic [ref=e125]:
              - heading "머스티커 회원 탈퇴" [level=2] [ref=e126]
              - paragraph [ref=e127]: 회원 탈퇴 시 회원 정보 및 관련 데이터가 영구적으로 삭제되며, 삭제된 정보는 복구할 수 없습니다.
            - button "회원 탈퇴" [ref=e129] [cursor=pointer]:
              - generic [ref=e130]: 회원 탈퇴
    - navigation "네이버 톡톡으로 문의하기" [ref=e131]:
      - link "카카오채널로 문의하기" [ref=e132] [cursor=pointer]:
        - /url: https://pf.kakao.com/_nJxnTX/chat
        - generic:
          - generic:
            - generic:
              - img
            - paragraph: 카카오채널로 문의하기
        - img [ref=e134]
      - link "네이버 톡톡 으로 문의하기" [ref=e135] [cursor=pointer]:
        - /url: https://talk.naver.com/ct/w2luxqo
        - generic:
          - generic:
            - generic:
              - img
            - paragraph: 네이버 톡톡 으로 문의하기
        - img [ref=e137]
      - generic "이메일로 문의하기" [ref=e138] [cursor=pointer]:
        - generic:
          - generic:
            - generic:
              - img
            - paragraph: 이메일로 문의하기
        - img [ref=e140]
  - contentinfo [ref=e141]:
    - generic [ref=e142]:
      - generic [ref=e143]: ⓒ (주)글로픽스. 2026. All rights reserved.
      - generic [ref=e144]:
        - generic [ref=e145]: "판매: sales@musticker.com"
        - link "이용약관" [ref=e146] [cursor=pointer]:
          - /url: /kr/terms-of-use
        - link "개인정보처리방침" [ref=e147] [cursor=pointer]:
          - /url: /kr/privacy-policy
        - generic [ref=e148] [cursor=pointer]: 사업자정보확인
        - link "회사소개" [ref=e149] [cursor=pointer]:
          - /url: /kr/about
      - generic [ref=e150]:
        - button "1:1문의하기" [ref=e151] [cursor=pointer]
        - link "자주 묻는 질문" [ref=e152] [cursor=pointer]:
          - /url: /kr/faq
```

# Test source

```ts
  271 |       if (
  272 |         allowTransientApiCorsFailures &&
  273 |         pendingTransientApiNetworkFailures > 0 &&
  274 |         text === 'Failed to load resource: net::ERR_FAILED'
  275 |       ) {
  276 |         return;
  277 |       }
  278 | 
  279 |       if (allowTransientApiCorsFailures && isTransientApiFetchFailure(text)) {
  280 |         pendingTransientApiNetworkFailures = Math.max(0, pendingTransientApiNetworkFailures - 1);
  281 |         return;
  282 |       }
  283 | 
  284 |       if (allowTransientCartCreateFailures && isCartCreateCorsFailure(text)) {
  285 |         pendingCartCreateNetworkFailures += 1;
  286 |         return;
  287 |       }
  288 | 
  289 |       if (
  290 |         allowTransientCartCreateFailures &&
  291 |         pendingCartCreateNetworkFailures > 0 &&
  292 |         text === 'Failed to load resource: net::ERR_FAILED'
  293 |       ) {
  294 |         return;
  295 |       }
  296 | 
  297 |       if (allowTransientCartCreateFailures && isCartCreateFetchFailure(text)) {
  298 |         pendingCartCreateNetworkFailures = Math.max(0, pendingCartCreateNetworkFailures - 1);
  299 |         return;
  300 |       }
  301 | 
  302 |       if (allowKnownPriceWarnings && isSupersededPricingRequest(text)) {
  303 |         hadSupersededPricingRequest = true;
  304 |         return;
  305 |       }
  306 | 
  307 |       if (allowKnownPriceWarnings && hadSupersededPricingRequest && text === 'Unable to retrieve prices.') {
  308 |         hadSupersededPricingRequest = false;
  309 |         return;
  310 |       }
  311 | 
  312 |       if (isKnownConsoleMessage(text, guardOptions)) {
  313 |         return;
  314 |       }
  315 | 
  316 |       consoleFailures.push(`[${message.type()}] ${text}`);
  317 |     });
  318 | 
  319 |     page.on('response', (response) => {
  320 |       const status = response.status();
  321 |       if (status < 400) {
  322 |         return;
  323 |       }
  324 | 
  325 |       const url = response.url();
  326 |       if (allowGuestUserMe401 && isExpectedGuestUserMe401(status, url)) {
  327 |         return;
  328 |       }
  329 | 
  330 |       if (allowExpectedAuthFailures && isExpectedAuthFailure(status, url)) {
  331 |         return;
  332 |       }
  333 | 
  334 |       if (allowKnownNuxtPayloadFailures && isKnownNuxtPayloadFailure(status, url)) {
  335 |         return;
  336 |       }
  337 | 
  338 |       if (allowTransientProductPageFailures && isTransientProductPageServerFailure(status, url)) {
  339 |         pendingTransientProductPageFailures += 1;
  340 |         return;
  341 |       }
  342 | 
  343 |       if (allowExpectedNotFound && isExpectedStorefrontNotFound(status, url)) {
  344 |         pendingExpectedNotFoundResponses += 1;
  345 |         return;
  346 |       }
  347 | 
  348 |       if (allowGuestCheckoutBootstrap401 && isExpectedGuestCheckoutBootstrap401(status, url)) {
  349 |         return;
  350 |       }
  351 | 
  352 |       if (allowPostLogoutCart401 && isPostLogoutCartUnauthorized(status, url)) {
  353 |         return;
  354 |       }
  355 | 
  356 |       responseFailures.push(`${status} ${url}`);
  357 |     });
  358 | 
  359 |     await use(page);
  360 | 
  361 |     // gotoStorefront() retries past WAF 403s, but the listeners above have already recorded each
  362 |     // blocked attempt by the time it does. Forgive exactly as many as it navigated past -- a 403
  363 |     // that nothing retried still fails the run.
  364 |     const throttleBlocks = retriedThrottleBlockCount(page);
  365 | 
  366 |     expect
  367 |       .soft(
  368 |         dropForgiven(consoleFailures, throttleBlocks, isThrottleBlockConsoleFailure),
  369 |         'Unexpected browser console errors or warnings'
  370 |       )
> 371 |       .toEqual([]);
      |        ^ Error: Unexpected browser console errors or warnings
  372 |     expect
  373 |       .soft(
  374 |         dropForgiven(responseFailures, throttleBlocks, isThrottleBlockResponseFailure),
  375 |         'Unexpected failed HTTP responses'
  376 |       )
  377 |       .toEqual([]);
  378 |   }
  379 | });
  380 | 
  381 | export { expect };
  382 | 
```