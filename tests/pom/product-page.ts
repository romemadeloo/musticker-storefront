import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { appPath } from '../fixtures/env';
import type { ProductConfig } from '../fixtures/types';
import { DesignUploadModal } from './design-upload-modal';

export class ProductPage {
  readonly page: Page;
  readonly optionsPanel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.optionsPanel = page.getByRole('complementary').first();
  }

  async goto(path = './stickers/die-cut-sticker'): Promise<void> {
    await this.page.goto(appPath(path));
  }

  async expectLoaded(productName = '자유형 스티커'): Promise<void> {
    await expect(this.page).toHaveTitle('머스티커 - 커스텀 스티커');
    await expect(this.page.getByRole('heading', { name: productName })).toBeVisible();
    await expect(this.optionsPanel.getByRole('heading', { name: '사이즈를 선택하세요' })).toBeVisible();
    await expect(this.optionsPanel.getByRole('heading', { name: '수량을 선택하세요' })).toBeVisible();
  }

  async selectSize(sizeLabel: string): Promise<void> {
    await this.optionsPanel.getByRole('button', { name: sizeLabel, exact: true }).click();
  }

  async selectQuantity(quantity: number): Promise<void> {
    const quantityLabel = new RegExp(`^${quantity.toLocaleString('en-US')}\\s`);
    await this.optionsPanel.getByRole('button', { name: quantityLabel }).click();
  }

  async configureProduct(config: ProductConfig): Promise<void> {
    await this.selectSizeAndWaitForPrice(config);
    await this.selectQuantityWithPrice(config.quantity, config.expectedUnitPrice);
    await this.expectPrice(config.expectedUnitPrice);
  }

  async expectPrice(price: string): Promise<void> {
    await expect(this.optionsPanel.getByText(price).last()).toBeVisible();
  }

  async openCustomSizeFields(): Promise<void> {
    await this.optionsPanel.getByRole('button', { name: '직접 입력' }).first().click();
    await expect(this.optionsPanel.getByPlaceholder('Width')).toBeVisible();
    await expect(this.optionsPanel.getByPlaceholder('Height')).toBeVisible();
  }

  async fillCustomSize(widthMm: number, heightMm: number): Promise<void> {
    await this.optionsPanel.getByPlaceholder('Width').fill(String(widthMm));
    await this.optionsPanel.getByPlaceholder('Height').fill(String(heightMm));
  }

  async openCustomQuantityField(): Promise<void> {
    await this.optionsPanel.getByRole('button', { name: '직접 입력' }).last().click();
    await expect(this.optionsPanel.getByRole('spinbutton').last()).toBeVisible();
  }

  async fillCustomQuantity(quantity: number): Promise<void> {
    await this.optionsPanel.getByRole('spinbutton').last().fill(String(quantity));
  }

  async expectNextStepDisabled(): Promise<void> {
    await expect(this.nextStepButton()).toBeDisabled();
  }

  async expectNextStepEnabled(): Promise<void> {
    await expect(this.nextStepButton()).toBeEnabled();
  }

  async openUploadModal(): Promise<DesignUploadModal> {
    await this.nextStepButton().click();
    const uploadModal = new DesignUploadModal(this.page);
    await uploadModal.expectVisible();
    return uploadModal;
  }

  private nextStepButton(): Locator {
    return this.optionsPanel.getByRole('button', { name: '다음 단계' });
  }

  private async selectQuantityWithPrice(quantity: number, price: string): Promise<void> {
    await this.quantityButtonWithPrice(quantity, price).click();
  }

  private async selectSizeAndWaitForPrice(config: ProductConfig): Promise<void> {
    const expectedQuantityButton = this.quantityButtonWithPrice(config.quantity, config.expectedUnitPrice);
    let lastError: unknown;

    for (let attempt = 0; attempt < 3; attempt += 1) {
      await this.selectSize(config.sizeLabel);

      try {
        await expect(expectedQuantityButton).toBeVisible({ timeout: 5_000 });
        return;
      } catch (error) {
        lastError = error;
        await this.page.waitForTimeout(500);
      }
    }

    throw lastError;
  }

  private quantityButtonWithPrice(quantity: number, price: string): Locator {
    const quantityText = quantity.toLocaleString('en-US');
    const label = new RegExp(`^${escapeRegExp(quantityText)}\\s+${escapeRegExp(price)}`);

    return this.optionsPanel.getByRole('button', { name: label });
  }
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
