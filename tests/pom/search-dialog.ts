import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class SearchDialog {
  readonly page: Page;
  readonly dialog: Locator;
  readonly input: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dialog = page.getByRole('dialog', { name: '상품 검색' });
    this.input = page.getByTestId('app-header-search-input');
  }

  async expectVisible(): Promise<void> {
    await expect(this.dialog).toBeVisible();
    await expect(this.input).toBeFocused();
  }

  async isVisible(options?: { timeout?: number }): Promise<boolean> {
    await this.dialog.waitFor({ state: 'visible', timeout: options?.timeout ?? 10_000 }).catch(() => undefined);
    return this.dialog.isVisible().catch(() => false);
  }

  async expectEmptyRecentState(): Promise<void> {
    await expect(this.dialog.getByText('최근 검색 내역이 없습니다')).toBeVisible();
  }

  async searchFor(query: string): Promise<void> {
    await this.input.fill(query);
  }

  async expectDieCutStickerResults(): Promise<void> {
    await expect(this.dialog.getByRole('heading', { name: '스티커', exact: true })).toBeVisible();
    await expect(this.dialog.getByRole('button', { name: /자유형 스티커/ }).first()).toBeVisible();
    await expect(this.dialog.getByRole('button', { name: /자유형 시트 스티커/ }).first()).toBeVisible();
    await expect(this.dialog.getByRole('button', { name: /다이컷 롤 스티커/ }).first()).toBeVisible();
  }

  async chooseDieCutSticker(): Promise<void> {
    const resultByTestId = this.page.getByTestId('app-header-search-result-stickers:die-cut-sticker-button');
    if (await resultByTestId.count()) {
      await resultByTestId.click();
    } else {
      await this.dialog.getByRole('button', { name: /자유형 스티커/ }).first().click();
    }

    await expect(this.page).toHaveURL(/\/kr\/stickers\/die-cut-sticker\/?$/);
  }

  async closeWithEscape(): Promise<void> {
    await this.page.keyboard.press('Escape');
    await expect(this.dialog).toBeHidden();
  }

  async closeWithButton(): Promise<void> {
    await this.dialog.getByRole('button', { name: '닫기' }).click();
    await expect(this.dialog).toBeHidden();
  }
}
