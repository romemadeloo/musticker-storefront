import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { appPath } from '../fixtures/env.js';
import { gotoStorefront } from '../fixtures/navigation.js';
import { ko } from '../fixtures/storefront-data.js';
import { enterCartDialogCustomSize } from './cart-size-dialog.js';

const sizeChangeDialogTitle = /사이즈 변경/;

export class CartV2Page {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await gotoStorefront(this.page, appPath('./cart'));
    await expect(this.page.getByRole('heading', { name: '내 장바구니' })).toBeVisible();
  }

  row(productName: string): Locator {
    return this.page.getByTestId('cart-page-row').filter({ hasText: productName }).first();
  }

  async expectRowContainsText(productName: string, ...patterns: Array<string | RegExp>): Promise<void> {
    const row = this.row(productName);
    await expect(row).toBeVisible();

    for (const pattern of patterns) {
      await expect(row).toContainText(pattern);
    }
  }

  async expectImageLinkVisible(productName: string): Promise<void> {
    await expect(this.row(productName).getByText(/이미지 추가|이미지 변경/)).toBeVisible();
  }

  async expectAddImageLinkVisible(productName: string): Promise<void> {
    await expect(this.row(productName).getByText('이미지 추가')).toBeVisible();
  }

  async expectChangeImageLinkVisible(productName: string): Promise<void> {
    await expect(this.row(productName).getByText('이미지 변경')).toBeVisible();
  }

  async changeMaterialViaSizeChangeDialog(productName: string, materialName: string): Promise<void> {
    const totalBefore = await this.captureTotal();
    await this.row(productName).getByText('사이즈 변경').click();

    const dialog = this.page.getByRole('dialog').filter({ hasText: sizeChangeDialogTitle }).last();
    await expect(dialog).toBeVisible();
    // The full cart page's edit dialog intentionally exposes material + individual size only;
    // quantity lives in the row-level select (see changeQuantityViaRowSelect), unlike the cart
    // preview drawer's combined "사이즈 및 수량 수정" dialog.
    await expect(dialog.getByText('수량', { exact: true })).toHaveCount(0);

    await dialog.getByRole('button', { name: materialName }).click();
    await dialog.getByRole('button', { name: /업데이트|Update/i }).click();
    await expect(dialog).toBeHidden({ timeout: 10_000 });
    await expect.poll(() => this.captureTotal(), { timeout: 15_000 }).not.toBe(totalBefore);
  }

  async changeQuantityViaRowSelect(productName: string, quantityLabel: string): Promise<void> {
    const totalBefore = await this.captureTotal();
    await this.row(productName).locator('button.cart-qty-select-trigger').click();

    const listbox = this.page.getByRole('listbox').last();
    await expect(listbox).toBeVisible();
    await listbox.getByText(new RegExp(`^${escapeRegExp(quantityLabel)}`)).first().click();

    await expect.poll(() => this.captureTotal(), { timeout: 15_000 }).not.toBe(totalBefore);
  }

  // The full cart page's 사이즈 변경 dialog enforces the same minimum-two-per-sheet rule as the
  // product page, but through a ui-select listbox (`맞춤 사이즈`) rather than a visible pill, and it
  // gates 업데이트 instead of 다음 단계.
  async expectCustomSizeRejectedInSizeChangeDialog(
    productName: string,
    widthMm: number,
    heightMm: number
  ): Promise<void> {
    await this.row(productName).getByText(ko.sizeChangeAction).click();

    const dialog = this.page.getByRole('dialog').filter({ hasText: sizeChangeDialogTitle }).last();
    await expect(dialog).toBeVisible();
    await enterCartDialogCustomSize(this.page, dialog, widthMm, heightMm);

    await expect(dialog.getByText(ko.minimumTwoPerSheetError)).toBeVisible();
    await expect(dialog.getByRole('button', { name: new RegExp(`${ko.cartUpdate}|Update`, 'i') })).toBeDisabled();
  }

  async captureTotal(): Promise<string> {
    const summary = this.page.getByTestId('cart-page-summary');
    await expect(summary).toBeVisible();
    return extractWonAmount(await summary.innerText()) ?? '';
  }
}

function extractWonAmount(value: string): string | undefined {
  return [...value.matchAll(/[\d,]+원/g)].at(-1)?.[0];
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
