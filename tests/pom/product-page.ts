import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { appPath } from '../fixtures/env.js';
import type { CartLineItem, ProductConfig, RegressionProductCandidate } from '../fixtures/types.js';
import { CartDrawer } from './cart-drawer.js';
import { DesignUploadModal } from './design-upload-modal.js';

const customOptionLabel = /\uCEE4\uC2A4\uD140|\uC9C1\uC811|Custom|Direct/i;

export class ProductPage {
  readonly page: Page;
  readonly optionsPanel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.optionsPanel = page.getByTestId('product-category-options');
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

  async configureRegressionProduct(candidate: RegressionProductCandidate): Promise<CartLineItem> {
    await expect(this.optionsPanel).toBeVisible();
    await this.configureLetteringText(candidate);
    await this.selectRegressionSize(candidate);

    const quantityButton = await this.quantityButtonWithAnyPrice(candidate.quantity);
    const price = extractWonAmount(await quantityButton.innerText());
    await quantityButton.click({ force: true });
    await this.expectNextStepEnabled();

    return {
      productName: candidate.productName,
      widthMm: candidate.widthMm,
      heightMm: candidate.heightMm,
      quantity: candidate.quantity,
      price
    };
  }

  async expectPrice(price: string): Promise<void> {
    await expect(this.optionsPanel.getByText(price).last()).toBeVisible();
  }

  async openCustomSizeFields(): Promise<void> {
    const customSizeButton = this.customOptionButtons().first();

    await expect(customSizeButton).toBeVisible({ timeout: 10_000 });
    await customSizeButton.click();
    await expect(this.customSizeInputs().first()).toBeVisible();
  }

  async fillCustomSize(widthMm: number, heightMm: number): Promise<void> {
    const inputs = this.customSizeInputs();

    await inputs.nth(0).fill(String(widthMm));
    await inputs.nth(1).fill(String(heightMm));
  }

  async openCustomQuantityField(): Promise<void> {
    const customQuantityButton = this.customOptionButtons().last();

    await expect(customQuantityButton).toBeVisible({ timeout: 10_000 });
    await customQuantityButton.click();
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

  async openUploadModalIfPresent(): Promise<DesignUploadModal | undefined> {
    await this.nextStepButton().click();
    const uploadModal = new DesignUploadModal(this.page);
    const opened = await uploadModal.dialog
      .waitFor({ state: 'visible', timeout: 5_000 })
      .then(() => true)
      .catch(() => false);

    return opened ? uploadModal : undefined;
  }

  async openCartDrawer(): Promise<CartDrawer> {
    await this.page.getByTestId('app-header-cart-button').click();
    const cart = new CartDrawer(this.page);
    await cart.expectVisible();
    return cart;
  }

  async currentOrOpenCartDrawer(): Promise<CartDrawer> {
    const cart = new CartDrawer(this.page);

    if (!(await cart.dialog.isVisible().catch(() => false))) {
      await this.page.getByTestId('app-header-cart-button').click();
    }

    await cart.expectVisible();
    return cart;
  }

  private nextStepButton(): Locator {
    return this.optionsPanel.getByRole('button', { name: '다음 단계' });
  }

  private async selectQuantityWithPrice(quantity: number, price: string): Promise<void> {
    await this.quantityButtonWithPrice(quantity, price).click();
  }

  private customSizeInputs(): Locator {
    return this.optionsPanel.getByPlaceholder('Width').or(this.optionsPanel.getByRole('spinbutton'));
  }

  private customOptionButtons(): Locator {
    return this.optionsPanel.getByRole('button', { name: customOptionLabel });
  }

  private async configureLetteringText(candidate: RegressionProductCandidate): Promise<void> {
    const editor = this.page
      .getByTestId('product-category-vinyl-designer-textarea')
      .locator('[contenteditable="true"]')
      .or(this.page.locator('[contenteditable="true"]'))
      .first();
    const editorTimeout = candidate.letteringText ? 10_000 : 1_000;
    const hasEditor = await editor
      .waitFor({ state: 'visible', timeout: editorTimeout })
      .then(() => true)
      .catch(() => false);

    if (!hasEditor) {
      return;
    }

    const text = candidate.letteringText ?? `E2E ${candidate.categoryName}`;
    await editor.click();
    await this.page.keyboard.press('Control+A');
    await this.page.keyboard.press('Backspace');
    await this.page.keyboard.type(text);
    await expect(editor).toContainText(text);
  }

  private async selectRegressionSize(candidate: RegressionProductCandidate): Promise<void> {
    const presetSize = this.optionsPanel
      .getByRole('button', { name: new RegExp(`\\(${candidate.widthMm}x${candidate.heightMm}\\)`) })
      .first();
    const hasPresetSize = await presetSize
      .waitFor({ state: 'visible', timeout: 5_000 })
      .then(() => true)
      .catch(() => false);

    if (hasPresetSize) {
      await presetSize.click();
      await expect(await this.quantityButtonWithAnyPrice(candidate.quantity)).toBeVisible();
      return;
    }

    const vinylSizeInputs = this.page.getByTestId('product-category-vinyl-size-input').locator('input');
    if ((await vinylSizeInputs.count()) >= 2) {
      await vinylSizeInputs.nth(0).fill(String(candidate.widthMm));
      await vinylSizeInputs.nth(1).fill(String(candidate.heightMm));
      await expect(await this.quantityButtonWithAnyPrice(candidate.quantity)).toBeVisible();
      return;
    }

    await this.openCustomSizeFields();
    await this.fillCustomSize(candidate.widthMm, candidate.heightMm);
    await expect(await this.quantityButtonWithAnyPrice(candidate.quantity)).toBeVisible();
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

  private async quantityButtonWithAnyPrice(quantity: number): Promise<Locator> {
    const quantityText = quantity.toLocaleString('en-US');
    const button = this.optionsPanel
      .getByRole('button', { name: new RegExp(`^${escapeRegExp(quantityText)}\\s+[\\d,]+원`) })
      .first();

    await expect(button).toBeVisible({ timeout: 15_000 });
    return button;
  }
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function extractWonAmount(value: string): string | undefined {
  return value.match(/[\d,]+원/)?.[0];
}
