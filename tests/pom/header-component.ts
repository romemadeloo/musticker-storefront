import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { CartDrawer } from './cart-drawer.js';
import { SearchDialog } from './search-dialog.js';

export class HeaderComponent {
  readonly page: Page;
  readonly root: Locator;
  readonly logo: Locator;
  readonly searchButton: Locator;
  readonly cartButton: Locator;
  readonly accountButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.getByRole('banner');
    this.logo = this.root.getByRole('link', { name: 'Musticker' });
    this.searchButton = page.getByTestId('app-header-search-button');
    this.cartButton = page.getByTestId('app-header-cart-button');
    this.accountButton = page.getByTestId('app-header-account-toggle-button');
  }

  async expectVisible(): Promise<void> {
    await expect(this.root).toBeVisible();
    await expect(this.logo).toBeVisible();
    await expect(this.searchButton).toBeVisible();
    await expect(this.cartButton).toBeVisible();
    await expect(this.accountButton).toBeVisible();
  }

  async goHome(): Promise<void> {
    await this.logo.click();
    await expect(this.page).toHaveURL(/\/kr\/?$/);
  }

  async goToStickers(): Promise<void> {
    await this.root.getByRole('link', { name: '스티커', exact: true }).click();
    await expect(this.page).toHaveURL(/\/kr\/stickers\/?$/);
  }

  async goToRollStickers(): Promise<void> {
    await this.root.getByRole('link', { name: '롤스티커', exact: true }).click();
    await expect(this.page).toHaveURL(/\/kr\/roll-stickers\/?$/);
  }

  async goToSheetStickers(): Promise<void> {
    await this.root.getByRole('link', { name: '시트 스티커', exact: true }).click();
    await expect(this.page).toHaveURL(/\/kr\/sheet-stickers\/?$/);
  }

  async openSearch(): Promise<SearchDialog> {
    const dialog = new SearchDialog(this.page);

    for (let attempt = 0; attempt < 3; attempt += 1) {
      await this.searchButton.click();

      if (await dialog.isVisible({ timeout: 3_000 })) {
        await dialog.expectVisible();
        return dialog;
      }

      await this.page.waitForTimeout(500);
    }

    await dialog.expectVisible();
    return dialog;
  }

  async openCart(): Promise<CartDrawer> {
    const cart = new CartDrawer(this.page);

    for (let attempt = 0; attempt < 3; attempt += 1) {
      await this.cartButton.click({ force: attempt > 0 });

      if (await cart.isVisible({ timeout: 3_000 })) {
        await cart.expectVisible();
        return cart;
      }

      await this.page.waitForTimeout(500);
    }

    await cart.expectVisible();
    return cart;
  }

  async openAccountMenu(): Promise<void> {
    const accountMenu = this.accountMenu();

    await this.page.waitForLoadState('load').catch(() => undefined);
    // Production can render the header before Nuxt has bound the account-menu click handler.
    await this.page.waitForTimeout(1_000);

    for (let attempt = 0; attempt < 5; attempt += 1) {
      if (await this.isAccountMenuVisible(accountMenu)) {
        await expect(accountMenu).toBeVisible();
        return;
      }

      await expect(this.accountButton).toBeEnabled();
      await this.accountButton.click({ force: attempt > 0 });

      const opened = await accountMenu
        .waitFor({ state: 'visible', timeout: 2_000 })
        .then(() => true)
        .catch(() => false);

      if (opened) {
        await expect(accountMenu).toBeVisible();
        return;
      }

      if ((await this.accountButton.getAttribute('aria-expanded').catch(() => null)) === 'true') {
        await this.page.keyboard.press('Escape').catch(() => undefined);
        await accountMenu.waitFor({ state: 'hidden', timeout: 1_000 }).catch(() => undefined);
      }

      await this.page.waitForTimeout(500);
    }

    await expect(accountMenu).toBeVisible();
  }

  async chooseLoginFromAccountMenu(): Promise<void> {
    await this.openAccountMenu();
    await this.page.getByTestId('app-header-account-login').click();
    await expect(this.page).toHaveURL(/\/kr\/auth\/login/);
  }

  async expectMemberMenu(): Promise<void> {
    await this.openAccountMenu();
    await expect(this.page.getByTestId('app-header-account-dropdown-member')).toBeVisible();
    await expect(this.page.getByTestId('app-header-account-logout-button')).toBeVisible();
  }

  async logout(): Promise<void> {
    await this.openAccountMenu();
    await this.page.getByTestId('app-header-account-logout-button').click();
    await expect(this.page.getByTestId('app-header-account-dropdown-member')).toBeHidden();

    await this.openAccountMenu();
    await expect(this.page.getByTestId('app-header-account-dropdown-guest')).toBeVisible();
  }

  private accountMenu(): Locator {
    return this.page
      .getByTestId('app-header-account-dropdown-guest')
      .or(this.page.getByTestId('app-header-account-dropdown-member'))
      .or(this.page.getByRole('menu', { name: '계정 메뉴' }))
      .first();
  }

  private async isAccountMenuVisible(accountMenu: Locator): Promise<boolean> {
    return accountMenu.isVisible().catch(() => false);
  }
}
