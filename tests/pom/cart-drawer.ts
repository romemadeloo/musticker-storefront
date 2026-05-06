import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import type { ProductConfig } from '../fixtures/types';

export class CartDrawer {
  readonly page: Page;
  readonly dialog: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dialog = page.getByRole('dialog').filter({ hasText: '장바구니 미리보기' });
  }

  async expectVisible(): Promise<void> {
    await expect(this.dialog).toBeVisible();
  }

  async expectEmpty(config?: ProductConfig): Promise<void> {
    if (!(await this.dialog.isVisible().catch(() => false))) {
      await expect(this.page.getByTestId('app-header-cart-button')).toBeVisible();
      return;
    }

    if (config) {
      await expect(this.lineItems(config.productName)).toHaveCount(0);
    }

    const emptyMessage = this.dialog.getByText('현재 장바구니가 비어 있습니다.');
    if (await emptyMessage.count()) {
      await expect(emptyMessage).toBeVisible();
      return;
    }

    await expect(this.dialog.getByRole('heading', { name: '장바구니 미리보기' })).toBeVisible();
  }

  async expectLineItem(config: ProductConfig): Promise<void> {
    const item = this.lineItem(config.productName);

    await expect(item).toBeVisible();
    await expect(item).toContainText(config.productName);
    await expect(item).toContainText(`Size: ${config.widthMm}x${config.heightMm}`);
    await expect(item).toContainText(`Quantity: ${config.quantity}`);
    await expect(item).toContainText(config.expectedUnitPrice);
    await expect(this.dialog.getByText(config.expectedUnitPrice).last()).toBeVisible();
  }

  async expectRecommendedProductsVisible(): Promise<void> {
    await expect(this.dialog.getByRole('heading', { name: '추천 상품' })).toBeVisible();
    await expect(this.dialog.getByRole('button', { name: '맞춤 제작' }).first()).toBeVisible();
  }

  async removeLineItem(config: ProductConfig): Promise<void> {
    await this.lineItem(config.productName).getByRole('button', { name: 'Remove item' }).click();
    await this.confirmRemovalIfPrompted();
    await expect(this.lineItems(config.productName)).toHaveCount(0);
  }

  async checkout(): Promise<void> {
    const checkoutByTestId = this.page.getByTestId('product-category-cart-checkout-button');
    if (await checkoutByTestId.count()) {
      await checkoutByTestId.click();
    } else {
      await this.dialog.getByRole('button', { name: '결제 진행' }).click();
    }

    await expect(this.page).toHaveURL(/\/kr\/checkout\/?$/);
  }

  async continueShopping(): Promise<void> {
    await this.dialog.getByRole('button', { name: '쇼핑 계속하기' }).click();
    await expect(this.dialog).toBeHidden();
  }

  private lineItem(productName: string): Locator {
    return this.lineItems(productName).first();
  }

  private lineItems(productName: string): Locator {
    return this.dialog.getByRole('article').filter({ hasText: productName }).filter({ hasText: 'Size:' });
  }

  private async confirmRemovalIfPrompted(): Promise<void> {
    const deleteButton = this.page.getByRole('dialog').getByRole('button', { name: '삭제' }).last();

    if (await deleteButton.isVisible().catch(() => false)) {
      await deleteButton.click();
      await expect(deleteButton).toBeHidden();
    }
  }
}
