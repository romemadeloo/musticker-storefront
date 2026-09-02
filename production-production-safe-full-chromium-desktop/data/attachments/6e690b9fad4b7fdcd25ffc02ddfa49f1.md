# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: purchasing/cart-lifecycle.spec.ts >> storefront v2 cart lifecycle >> MS-V2-101 two distinct products become two lines whose prices sum to the cart total
- Location: tests/e2e/purchasing/cart-lifecycle.spec.ts:70:3

# Error details

```
Error: the cart total must be the two quoted prices added together

expect(received).toBe(expected) // Object.is equality

Expected: 17700
Received: 37200
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
            - generic: "2"
          - button "계정" [ref=e23] [cursor=pointer]:
            - img [ref=e25]
      - navigation "Primary":
        - link "스티커" [ref=e27] [cursor=pointer]:
          - /url: /kr/stickers
        - link "롤스티커" [ref=e28] [cursor=pointer]:
          - /url: /kr/roll-stickers
        - link "시트 스티커" [ref=e29] [cursor=pointer]:
          - /url: /kr/sheet-stickers
  - main [ref=e30]:
    - generic [ref=e32]:
      - generic [ref=e33]:
        - heading "내 장바구니" [level=1] [ref=e34]
        - link "쇼핑 계속하기" [ref=e35] [cursor=pointer]:
          - /url: /stickers
          - img [ref=e36]
          - text: 쇼핑 계속하기
      - generic [ref=e38]:
        - generic [ref=e39]:
          - generic [ref=e40]:
            - generic [ref=e41] [cursor=pointer]:
              - 'checkbox "전체 선택 : 2개 상품" [checked] [ref=e42]'
              - img [ref=e44]
              - generic [ref=e46]: "전체 선택 : 2개 상품"
            - button "삭제" [ref=e47] [cursor=pointer]:
              - generic [ref=e48]:
                - img [ref=e49]
                - text: 삭제
          - generic [ref=e51]:
            - generic [ref=e52]: 상품
            - generic [ref=e53]: 수량
            - generic [ref=e54]: 가격
          - article [ref=e56]:
            - generic [ref=e57] [cursor=pointer]:
              - checkbox [checked] [ref=e58]
              - img [ref=e60]
            - generic [ref=e62]:
              - generic [ref=e63]:
                - generic [ref=e64]:
                  - button "홀로그램 스티커" [ref=e65] [cursor=pointer]:
                    - img "홀로그램 스티커" [ref=e66]
                    - img [ref=e68]
                  - generic [ref=e70]:
                    - heading "홀로그램 스티커" [level=3] [ref=e71]
                    - paragraph [ref=e72]: 75x75mm
                    - button "이미지 추가" [ref=e73] [cursor=pointer]:
                      - generic [ref=e74]: 이미지 추가
                - button "사이즈 변경" [ref=e76] [cursor=pointer]:
                  - generic [ref=e77]: 사이즈 변경
              - generic [ref=e78]:
                - button "100개" [ref=e81] [cursor=pointer]:
                  - generic [ref=e82]: 100개
                  - img [ref=e83]
                - strong [ref=e85]: 19,500원
            - button "상품 삭제" [ref=e86] [cursor=pointer]:
              - img [ref=e87]
              - generic [ref=e89]: 상품 삭제
          - article [ref=e90]:
            - generic [ref=e91] [cursor=pointer]:
              - checkbox [checked] [ref=e92]
              - img [ref=e94]
            - generic [ref=e96]:
              - generic [ref=e97]:
                - generic [ref=e98]:
                  - button "자유형 스티커" [ref=e99] [cursor=pointer]:
                    - img "자유형 스티커" [ref=e100]
                    - img [ref=e102]
                  - generic [ref=e104]:
                    - heading "자유형 스티커" [level=3] [ref=e105]
                    - paragraph [ref=e106]: 75x75mm
                    - button "이미지 추가" [ref=e107] [cursor=pointer]:
                      - generic [ref=e108]: 이미지 추가
                - button "사이즈 변경" [ref=e110] [cursor=pointer]:
                  - generic [ref=e111]: 사이즈 변경
              - generic [ref=e112]:
                - button "100개" [ref=e115] [cursor=pointer]:
                  - generic [ref=e116]: 100개
                  - img [ref=e117]
                - strong [ref=e119]: 17,700원
            - button "상품 삭제" [ref=e120] [cursor=pointer]:
              - img [ref=e121]
              - generic [ref=e123]: 상품 삭제
        - complementary [ref=e124]:
          - generic [ref=e125]:
            - heading "주문 요약" [level=2] [ref=e127]
            - generic [ref=e128]:
              - generic [ref=e129]:
                - generic [ref=e130]: 합계
                - strong [ref=e131]: 37,200원
              - generic [ref=e132]:
                - button "주문하기 (2)" [ref=e133] [cursor=pointer]:
                  - generic [ref=e134]: 주문하기 (2)
                - paragraph [ref=e135]: 배송비 및 할인은 결제 시 적용됩니다.
    - navigation "네이버 톡톡으로 문의하기" [ref=e136]:
      - link "카카오채널로 문의하기" [ref=e137] [cursor=pointer]:
        - /url: https://pf.kakao.com/_nJxnTX/chat
        - generic:
          - generic:
            - generic:
              - img
            - paragraph: 카카오채널로 문의하기
        - img [ref=e139]
      - link "네이버 톡톡 으로 문의하기" [ref=e140] [cursor=pointer]:
        - /url: https://talk.naver.com/ct/w2luxqo
        - generic:
          - generic:
            - generic:
              - img
            - paragraph: 네이버 톡톡 으로 문의하기
        - img [ref=e142]
      - generic "이메일로 문의하기" [ref=e143] [cursor=pointer]:
        - generic:
          - generic:
            - generic:
              - img
            - paragraph: 이메일로 문의하기
        - img [ref=e145]
  - contentinfo [ref=e146]:
    - generic [ref=e147]:
      - generic [ref=e148]: ⓒ (주)글로픽스. 2026. All rights reserved.
      - generic [ref=e149]:
        - generic [ref=e150]: "판매: sales@musticker.com"
        - link "이용약관" [ref=e151] [cursor=pointer]:
          - /url: /kr/terms-of-use
        - link "개인정보처리방침" [ref=e152] [cursor=pointer]:
          - /url: /kr/privacy-policy
        - generic [ref=e153] [cursor=pointer]: 사업자정보확인
        - link "회사소개" [ref=e154] [cursor=pointer]:
          - /url: /kr/about
      - generic [ref=e155]:
        - button "1:1문의하기" [ref=e156] [cursor=pointer]
        - link "자주 묻는 질문" [ref=e157] [cursor=pointer]:
          - /url: /kr/faq
```

# Test source

```ts
  1   | import { test, expect } from '../../fixtures/e2e-test.js';
  2   | import { appPath, env } from '../../fixtures/env.js';
  3   | import { SKIP_WITHOUT_MEMBER_CREDENTIALS, hasMemberCredentials } from '../../fixtures/member-auth.js';
  4   | import { gotoStorefront } from '../../fixtures/navigation.js';
  5   | import { dieCutShapeStickers, v2Products } from '../../fixtures/storefront-data.js';
  6   | import { CartDrawer } from '../../pom/cart-drawer.js';
  7   | import { CartV2Page } from '../../pom/cart-page.js';
  8   | import { HeaderComponent } from '../../pom/header-component.js';
  9   | import { LoginPage } from '../../pom/login-page.js';
  10  | import { ProductV2Page } from '../../pom/product-page.js';
  11  | 
  12  | // The configurator specs all end at "the item reached the cart". What happens to it afterwards --
  13  | // removing it, holding two of them, surviving a reload, or being carried across a login -- had no
  14  | // coverage at all, which for a storefront is the cart's whole job.
  15  | //
  16  | // Verified live against development-1 on 2026-08-27:
  17  | //
  18  | //   * A guest cart survives a full document reload (the badge still reads 1).
  19  | //   * Two distinct products make two rows, and 13,800원 + 18,700원 = the 32,500원 cart total.
  20  | //   * The cart page confirms every removal through `cart-item-delete-modal`; cancelling keeps the row.
  21  | //   * Logging in merges the guest cart into the member cart *additively* -- a member holding one item
  22  | //     who signs in with two guest items ends up with three, not two.
  23  | const hologramSticker = dieCutShapeStickers[0];
  24  | const canRunDestructiveAuth = process.env.RUN_AUTH_DESTRUCTIVE_E2E === 'true';
  25  | 
  26  | async function addToCart(page: Parameters<typeof gotoStorefront>[0], data: { path: string; heading: string; size: string; quantity: number }): Promise<number> {
  27  |   const product = new ProductV2Page(page);
  28  | 
  29  |   await product.goto(data.path, data.heading);
  30  |   await product.selectSize(data.size);
  31  |   await product.selectQuantity(data.quantity);
  32  | 
  33  |   const price = await product.captureQuantityTierPrice(data.quantity);
  34  |   await product.addToCart();
  35  | 
  36  |   const drawer = new CartDrawer(page);
  37  |   await drawer.expectVisible();
  38  | 
  39  |   return price;
  40  | }
  41  | 
  42  | test.describe('storefront v2 cart lifecycle', { tag: ['@regression', '@production', '@purchasing'] }, () => {
  43  |   test.use({
  44  |     allowGuestUserMe401: true,
  45  |     allowKnownNuxtPayloadFailures: true,
  46  |     allowTransientCartCreateFailures: true,
  47  |     allowTransientApiCorsFailures: true,
  48  |     allowTransientProductPageFailures: true
  49  |   });
  50  | 
  51  |   test('MS-V2-100 removing the only line item leaves an empty cart, not a broken one', async ({ page }) => {
  52  |     const data = v2Products.dieCutSticker;
  53  |     const header = new HeaderComponent(page);
  54  | 
  55  |     await addToCart(page, { ...data, size: data.size });
  56  |     await header.expectCartCount(1);
  57  | 
  58  |     const drawer = new CartDrawer(page);
  59  |     await drawer.removeLineItem(data.heading);
  60  |     await drawer.expectEmpty();
  61  |     await header.expectCartCount(0);
  62  | 
  63  |     // The full cart page has to agree, and has to render its own empty state rather than a summary
  64  |     // with nothing in it.
  65  |     const cart = new CartV2Page(page);
  66  |     await gotoStorefront(page, appPath('./cart'));
  67  |     await cart.expectEmpty();
  68  |   });
  69  | 
  70  |   test('MS-V2-101 two distinct products become two lines whose prices sum to the cart total', async ({ page }) => {
  71  |     const first = v2Products.dieCutSticker;
  72  |     const header = new HeaderComponent(page);
  73  | 
  74  |     const firstPrice = await addToCart(page, { ...first, size: first.size });
  75  |     await header.expectCartCount(1);
  76  | 
  77  |     const secondPrice = await addToCart(page, {
  78  |       path: hologramSticker.path,
  79  |       heading: hologramSticker.heading,
  80  |       size: hologramSticker.size,
  81  |       quantity: hologramSticker.quantity
  82  |     });
  83  |     await header.expectCartCount(2);
  84  | 
  85  |     const drawer = new CartDrawer(page);
  86  |     await drawer.expectLineItems([first.heading, hologramSticker.heading]);
  87  | 
  88  |     const cart = new CartV2Page(page);
  89  |     await drawer.viewCart();
  90  |     await cart.expectRowCount(2);
  91  |     await cart.expectDeclaredItemCount(2);
  92  | 
  93  |     const total = await cart.expectTotalIsSumOfRows();
> 94  |     expect(total, 'the cart total must be the two quoted prices added together').toBe(firstPrice + secondPrice);
      |                                                                                  ^ Error: the cart total must be the two quoted prices added together
  95  |   });
  96  | 
  97  |   test('MS-V2-102 a guest cart survives a full page reload @smoke', async ({ page }) => {
  98  |     const data = v2Products.dieCutSticker;
  99  |     const header = new HeaderComponent(page);
  100 | 
  101 |     const price = await addToCart(page, { ...data, size: data.size });
  102 |     await header.expectCartCount(1);
  103 | 
  104 |     // A document reload, not client-side routing: the guest cart has to be restored from the server
  105 |     // rather than from in-memory store state.
  106 |     await page.reload();
  107 |     await header.expectCartCount(1);
  108 | 
  109 |     const cart = new CartV2Page(page);
  110 |     await cart.goto();
  111 |     await cart.expectRowCount(1);
  112 |     expect(await cart.captureRowPrices(), 'the restored line must keep its price').toEqual([price]);
  113 |   });
  114 | 
  115 |   test('MS-V2-103 the cart page confirms a removal before acting on it', async ({ page }) => {
  116 |     const data = v2Products.dieCutSticker;
  117 | 
  118 |     await addToCart(page, { ...data, size: data.size });
  119 | 
  120 |     const cart = new CartV2Page(page);
  121 |     await cart.goto();
  122 |     await cart.expectRowCount(1);
  123 | 
  124 |     // Cancelling must be a no-op -- an accidental click on the bin icon cannot cost the shopper the
  125 |     // configuration they just built.
  126 |     await cart.cancelRemoveRow(data.heading);
  127 |     await cart.expectRowCount(1);
  128 | 
  129 |     await cart.removeRow(data.heading);
  130 |     await cart.expectEmpty();
  131 |   });
  132 | 
  133 | });
  134 | 
  135 | test.describe('storefront v2 cart lifecycle copy', { tag: ['@regression', '@production'] }, () => {
  136 |   test.use({ allowGuestUserMe401: true, allowKnownNuxtPayloadFailures: true });
  137 | 
  138 |   test('MS-V2-105 an empty cart page offers a way back into the catalog', async ({ page }) => {
  139 |     const cart = new CartV2Page(page);
  140 | 
  141 |     await gotoStorefront(page, appPath('./cart'));
  142 |     await cart.expectEmpty();
  143 | 
  144 |     // The empty state is the only thing standing between a shopper and a dead end, so it has to
  145 |     // carry real product links rather than just an apology.
  146 |     await expect(page.getByTestId('cart-empty-featured-die-cut-sticker')).toBeVisible();
  147 |     await expect(page.getByTestId('cart-empty-discover-circle-sticker')).toBeVisible();
  148 | 
  149 |     // The empty state replaces the whole page, 내 장바구니 heading included -- verified on
  150 |     // development-1, so this asserts the summary block is gone rather than expecting that heading.
  151 |     await expect(page.getByTestId('cart-page-summary')).toHaveCount(0);
  152 |   });
  153 | });
  154 | 
  155 | // Deliberately NOT tagged @production: this adds a line to a real member's cart. It is excluded from
  156 | // production runs by @destructive anyway, but carrying @production would label it production-safe,
  157 | // which it is not.
  158 | test.describe('storefront v2 guest-to-member cart merge', { tag: ['@regression', '@purchasing'] }, () => {
  159 |   test.use({
  160 |     allowGuestUserMe401: true,
  161 |     allowExpectedAuthFailures: true,
  162 |     allowKnownNuxtPayloadFailures: true,
  163 |     allowTransientCartCreateFailures: true,
  164 |     allowTransientApiCorsFailures: true,
  165 |     allowTransientProductPageFailures: true
  166 |   });
  167 | 
  168 |   test(
  169 |     'MS-V2-104 a guest cart is merged into the member cart on login',
  170 |     { tag: ['@credentialed', '@destructive', '@slow'] },
  171 |     async ({ page }) => {
  172 |       test.skip(!hasMemberCredentials(), SKIP_WITHOUT_MEMBER_CREDENTIALS);
  173 |       test.skip(
  174 |         !canRunDestructiveAuth,
  175 |         'MS-V2-104 adds a line to the seeded member\'s real cart before removing it again. Set ' +
  176 |           'RUN_AUTH_DESTRUCTIVE_E2E=true against a dev environment (not production) to run it.'
  177 |       );
  178 |       test.setTimeout(180_000);
  179 | 
  180 |       const header = new HeaderComponent(page);
  181 |       const guestPrice = await addToCart(page, {
  182 |         path: hologramSticker.path,
  183 |         heading: hologramSticker.heading,
  184 |         size: hologramSticker.size,
  185 |         quantity: hologramSticker.quantity
  186 |       });
  187 |       await header.expectCartCount(1);
  188 | 
  189 |       // Logging in through the form is the merge trigger, so this test cannot use a seeded session.
  190 |       const login = new LoginPage(page);
  191 |       await login.goto();
  192 |       await login.loginWithCredentials(env.AUTH_TEST_EMAIL!, env.AUTH_TEST_PASSWORD!);
  193 | 
  194 |       const cart = new CartV2Page(page);
```