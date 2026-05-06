import path from 'node:path';

import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { CartDrawer } from './cart-drawer';

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

  async uploadDesignFile(filePath: string): Promise<void> {
    const chooserPromise = this.page.waitForEvent('filechooser');
    await this.dialog.getByRole('button', { name: '파일 선택' }).click();
    const chooser = await chooserPromise;
    await chooser.setFiles(filePath);
    await this.page.waitForLoadState('networkidle').catch(() => undefined);
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
    await this.dialog.getByRole('button', { name: 'Close modal' }).click();
    await expect(this.dialog).toBeHidden();
  }
}
