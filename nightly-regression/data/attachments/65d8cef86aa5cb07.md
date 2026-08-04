# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: discovery/search.spec.ts >> search >> search dialog closes with Escape
- Location: tests/e2e/discovery/search.spec.ts:19:3

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: Unexpected browser console errors or warnings

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 15

- Array []
+ Array [
+   "[error] Failed to load resource: the server responded with a status of 500 ()",
+   "[error] [nuxt] error caught during app initialization Ec: API Response Contract Violation: Expected ApiResponse structure.
+     at x_ (https://www.musticker.com/_nuxt/dAyZ8cRt.js:4:79257)
+     at f0 (https://www.musticker.com/_nuxt/dAyZ8cRt.js:4:82056)
+     at onResponse (https://www.musticker.com/_nuxt/dAyZ8cRt.js:10:296836)
+     at ai (https://www.musticker.com/_nuxt/dAyZ8cRt.js:4:66669)
+     at o (https://www.musticker.com/_nuxt/dAyZ8cRt.js:4:69552)
+     at async s (https://www.musticker.com/_nuxt/dAyZ8cRt.js:4:69776)
+     at async Gw (https://www.musticker.com/_nuxt/dAyZ8cRt.js:10:297950)
+     at async Xw (https://www.musticker.com/_nuxt/dAyZ8cRt.js:10:298160)
+     at async https://www.musticker.com/_nuxt/dAyZ8cRt.js:10:298360
+     at async y_ (https://www.musticker.com/_nuxt/dAyZ8cRt.js:4:76878)",
+   "[error] Hydration completed but contains mismatches.",
+ ]
```

```
Error: Unexpected failed HTTP responses

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "500 https://api.musticker.com/index.php/sys/kr/navigation/categories",
+ ]
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('app-header-search-button')

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - heading "500" [level=1] [ref=e5]
  - 'heading "API Response Contract Violation: Expected ApiResponse structure." [level=2] [ref=e6]'
  - paragraph [ref=e7]: "API Response Contract Violation: Expected ApiResponse structure."
```

# Test source

```ts
  1   | import type { Locator, Page } from '@playwright/test';
  2   | import { expect } from '@playwright/test';
  3   | 
  4   | import { CartDrawer } from './cart-drawer.js';
  5   | import { SearchDialog } from './search-dialog.js';
  6   | 
  7   | export class HeaderComponent {
  8   |   readonly page: Page;
  9   |   readonly root: Locator;
  10  |   readonly logo: Locator;
  11  |   readonly searchButton: Locator;
  12  |   readonly cartButton: Locator;
  13  |   readonly accountButton: Locator;
  14  | 
  15  |   constructor(page: Page) {
  16  |     this.page = page;
  17  |     this.root = page.getByRole('banner');
  18  |     this.logo = this.root.getByRole('link', { name: 'Musticker' });
  19  |     this.searchButton = page.getByTestId('app-header-search-button');
  20  |     this.cartButton = page.getByTestId('app-header-cart-button');
  21  |     this.accountButton = page.getByTestId('app-header-account-toggle-button');
  22  |   }
  23  | 
  24  |   async expectVisible(): Promise<void> {
  25  |     await expect(this.root).toBeVisible();
  26  |     await expect(this.logo).toBeVisible();
  27  |     await expect(this.searchButton).toBeVisible();
  28  |     await expect(this.cartButton).toBeVisible();
  29  |     await expect(this.accountButton).toBeVisible();
  30  |   }
  31  | 
  32  |   async goHome(): Promise<void> {
  33  |     await this.logo.click();
  34  |     await expect(this.page).toHaveURL(/\/kr\/?$/);
  35  |   }
  36  | 
  37  |   async goToStickers(): Promise<void> {
  38  |     await this.root.getByRole('link', { name: '스티커', exact: true }).click();
  39  |     await expect(this.page).toHaveURL(/\/kr\/stickers\/?$/);
  40  |   }
  41  | 
  42  |   async goToRollStickers(): Promise<void> {
  43  |     await this.root.getByRole('link', { name: '롤스티커', exact: true }).click();
  44  |     await expect(this.page).toHaveURL(/\/kr\/roll-stickers\/?$/);
  45  |   }
  46  | 
  47  |   async goToSheetStickers(): Promise<void> {
  48  |     await this.root.getByRole('link', { name: '시트 스티커', exact: true }).click();
  49  |     await expect(this.page).toHaveURL(/\/kr\/sheet-stickers\/?$/);
  50  |   }
  51  | 
  52  |   async openSearch(): Promise<SearchDialog> {
  53  |     const dialog = new SearchDialog(this.page);
  54  | 
  55  |     for (let attempt = 0; attempt < 3; attempt += 1) {
> 56  |       await this.searchButton.click();
      |                               ^ Error: locator.click: Test timeout of 60000ms exceeded.
  57  | 
  58  |       if (await dialog.isVisible({ timeout: 3_000 })) {
  59  |         await dialog.expectVisible();
  60  |         return dialog;
  61  |       }
  62  | 
  63  |       await this.page.waitForTimeout(500);
  64  |     }
  65  | 
  66  |     await dialog.expectVisible();
  67  |     return dialog;
  68  |   }
  69  | 
  70  |   async openCart(): Promise<CartDrawer> {
  71  |     const cart = new CartDrawer(this.page);
  72  | 
  73  |     for (let attempt = 0; attempt < 3; attempt += 1) {
  74  |       await this.cartButton.click({ force: attempt > 0 });
  75  | 
  76  |       if (await cart.isVisible({ timeout: 3_000 })) {
  77  |         await cart.expectVisible();
  78  |         return cart;
  79  |       }
  80  | 
  81  |       await this.page.waitForTimeout(500);
  82  |     }
  83  | 
  84  |     await cart.expectVisible();
  85  |     return cart;
  86  |   }
  87  | 
  88  |   async openAccountMenu(): Promise<void> {
  89  |     const accountMenu = this.accountMenu();
  90  | 
  91  |     await this.page.waitForLoadState('load').catch(() => undefined);
  92  |     // Production can render the header before Nuxt has bound the account-menu click handler.
  93  |     await this.page.waitForTimeout(1_000);
  94  | 
  95  |     for (let attempt = 0; attempt < 5; attempt += 1) {
  96  |       if (await this.isAccountMenuVisible(accountMenu)) {
  97  |         await expect(accountMenu).toBeVisible();
  98  |         return;
  99  |       }
  100 | 
  101 |       await expect(this.accountButton).toBeEnabled();
  102 |       await this.accountButton.click({ force: attempt > 0 });
  103 | 
  104 |       const opened = await accountMenu
  105 |         .waitFor({ state: 'visible', timeout: 2_000 })
  106 |         .then(() => true)
  107 |         .catch(() => false);
  108 | 
  109 |       if (opened) {
  110 |         await expect(accountMenu).toBeVisible();
  111 |         return;
  112 |       }
  113 | 
  114 |       if ((await this.accountButton.getAttribute('aria-expanded').catch(() => null)) === 'true') {
  115 |         await this.page.keyboard.press('Escape').catch(() => undefined);
  116 |         await accountMenu.waitFor({ state: 'hidden', timeout: 1_000 }).catch(() => undefined);
  117 |       }
  118 | 
  119 |       await this.page.waitForTimeout(500);
  120 |     }
  121 | 
  122 |     await expect(accountMenu).toBeVisible();
  123 |   }
  124 | 
  125 |   async chooseLoginFromAccountMenu(): Promise<void> {
  126 |     await this.openAccountMenu();
  127 |     await this.page.getByTestId('app-header-account-login').click();
  128 |     await expect(this.page).toHaveURL(/\/kr\/auth\/login/);
  129 |   }
  130 | 
  131 |   async expectMemberMenu(): Promise<void> {
  132 |     await this.openAccountMenu();
  133 |     await expect(this.page.getByTestId('app-header-account-dropdown-member')).toBeVisible();
  134 |     await expect(this.page.getByTestId('app-header-account-logout-button')).toBeVisible();
  135 |   }
  136 | 
  137 |   async logout(): Promise<void> {
  138 |     await this.openAccountMenu();
  139 |     await this.page.getByTestId('app-header-account-logout-button').click();
  140 |     await expect(this.page.getByTestId('app-header-account-dropdown-member')).toBeHidden();
  141 | 
  142 |     await this.openAccountMenu();
  143 |     await expect(this.page.getByTestId('app-header-account-dropdown-guest')).toBeVisible();
  144 |   }
  145 | 
  146 |   private accountMenu(): Locator {
  147 |     return this.page
  148 |       .getByTestId('app-header-account-dropdown-guest')
  149 |       .or(this.page.getByTestId('app-header-account-dropdown-member'))
  150 |       .or(this.page.getByRole('menu', { name: '계정 메뉴' }))
  151 |       .first();
  152 |   }
  153 | 
  154 |   private async isAccountMenuVisible(accountMenu: Locator): Promise<boolean> {
  155 |     return accountMenu.isVisible().catch(() => false);
  156 |   }
```