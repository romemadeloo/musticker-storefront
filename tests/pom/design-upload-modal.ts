import path from 'node:path';

import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { CartDrawer } from './cart-drawer.js';

export class DesignUploadModal {
  readonly page: Page;
  readonly dialog: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dialog = page.getByRole('dialog', { name: '디자인 파일 업로드' });
  }

  async expectVisible(): Promise<void> {
    await expect(this.dialog).toBeVisible();
    await expect(this.dialog.getByText('지원 파일 형식')).toBeVisible();
    await expect(this.dialog.getByRole('textbox', { name: '여기에 상세 주문 요청 사항을 입력해 주세요' })).toBeVisible();
  }

  async uploadDesignFile(filePath: string, options: { waitForAddToCart?: boolean } = {}): Promise<void> {
    const chooserPromise = this.page.waitForEvent('filechooser');
    await this.dialog.getByRole('button', { name: '파일 선택' }).click();
    const chooser = await chooserPromise;
    await chooser.setFiles(filePath);

    if (options.waitForAddToCart === false) {
      return;
    }

    await expect(this.addToCartButton()).toBeEnabled({ timeout: 15_000 });
  }

  async expectSelectedFile(filePath: string): Promise<void> {
    const fileName = path.basename(filePath);
    const matchingText = this.dialog.getByText(fileName);

    if (await matchingText.count()) {
      await expect(matchingText.first()).toBeVisible();
    }
  }

  async fillSpecialRequest(request: string): Promise<void> {
    await this.dialog.getByRole('textbox', { name: '여기에 상세 주문 요청 사항을 입력해 주세요' }).fill(request);
  }

  async expectInvalidFileValidation(): Promise<void> {
    await expect(this.dialog).toBeVisible();
    await expect(this.dialog.getByText(/지원 파일 형식|허용|지원되지|형식/i).first()).toBeVisible();
  }

  async skipUploadAndAddToCart(): Promise<CartDrawer> {
    const skipByTestId = this.page.getByTestId('product-category-upload-skip-button');
    if (await skipByTestId.count()) {
      await skipByTestId.click();
    } else {
      await this.dialog.getByRole('button', { name: '건너뛰고 나중에 업로드하기' }).click();
    }

    const cart = new CartDrawer(this.page);
    await cart.expectVisible();
    return cart;
  }

  async addToCart(): Promise<CartDrawer> {
    const addButton = this.addToCartButton();
    await expect(addButton).toBeEnabled({ timeout: 30_000 });

    const addByTestId = this.page.getByTestId('product-category-upload-add-to-cart-button');
    if (await addByTestId.count()) {
      await addByTestId.click();
    } else {
      await this.dialog.getByRole('button', { name: '장바구니 담기' }).click();
    }

    const cart = new CartDrawer(this.page);
    await cart.expectVisible();
    return cart;
  }

  async close(): Promise<void> {
    await this.dialog.getByRole('button', { name: /Close modal|모달 닫기|닫기/i }).click();
    await expect(this.dialog).toBeHidden();
  }

  private addToCartButton(): Locator {
    return this.page
      .getByTestId('product-category-upload-add-to-cart-button')
      .or(this.dialog.getByRole('button', { name: /\uc7a5\ubc14\uad6c\ub2c8\s*\ub2f4\uae30|Add to cart/i }))
      .first();
  }
}
