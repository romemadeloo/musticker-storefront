import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { appPath } from '../fixtures/env.js';
import type { CartLineItem, ProductConfig, RegressionProductCandidate } from '../fixtures/types.js';
import { CartDrawer } from './cart-drawer.js';
import { DesignUploadModal } from './design-upload-modal.js';

const customOptionLabel = /\uCEE4\uC2A4\uD140|\uC9C1\uC811|Custom|Direct/i;
const sizeLabelPattern = /\d+\s*(?:x|×)\s*\d+|Small|Medium|Large|\uC18C\uD615|\uC911\uD615|\uB300\uD615/i;
const storefrontTitlePattern = /(?=.*머스티커)(?=.*스티커)/;
const wonAmountPattern = /[\d,]+\uC6D0/u;

type SelectedSize = {
  widthMm?: number;
  heightMm?: number;
};

type SelectedQuantity = {
  quantity: number;
  price?: string;
};

export class ProductPage {
  readonly page: Page;
  readonly optionsPanel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.optionsPanel = page
      .getByTestId('product-category-options')
      .or(page.getByRole('complementary').filter({ hasText: /사이즈|수량|Quantity|Size/i }))
      .first();
  }

  async goto(path = './stickers/die-cut-sticker'): Promise<void> {
    await this.page.goto(appPath(path));
  }

  async expectLoaded(productName = '자유형 스티커'): Promise<void> {
    await expect(this.page).toHaveTitle(storefrontTitlePattern);
    await expect(this.page.getByRole('heading', { name: productName })).toBeVisible();
    await expect(this.optionsPanel).toBeVisible();
    await expect(this.optionsPanel.getByRole('heading', { name: /사이즈.*선택|Size/i })).toBeVisible();
    await expect(this.optionsPanel.getByRole('heading', { name: /수량.*선택|Quantity/i })).toBeVisible();
  }

  async selectSize(sizeLabel: string): Promise<void> {
    await this.optionsPanel.getByRole('button', { name: sizeLabel, exact: true }).click();
  }

  async selectQuantity(quantity: number): Promise<void> {
    const quantityLabel = new RegExp(`^${quantity.toLocaleString('en-US')}\\s`);
    await this.optionsPanel.getByRole('button', { name: quantityLabel }).click();
  }

  async configureProduct(config: ProductConfig): Promise<CartLineItem> {
    await expect(this.optionsPanel).toBeVisible();
    const selectedSize = await this.selectConfiguredSize(config);
    const selectedQuantity = await this.selectPreferredQuantity(config.quantity);
    await this.expectNextStepEnabled();

    return {
      productName: config.localizedName,
      widthMm: selectedSize.widthMm ?? config.widthMm,
      heightMm: selectedSize.heightMm ?? config.heightMm,
      quantity: selectedQuantity.quantity,
      price: selectedQuantity.price ?? config.expectedUnitPrice
    };
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

  async configureOrderAllProduct(candidate: RegressionProductCandidate): Promise<CartLineItem> {
    await expect(this.optionsPanel).toBeVisible();
    await this.configureLetteringText(candidate);

    const selectedSize = await this.selectPreferredSize(candidate);
    const selectedQuantity = await this.selectPreferredQuantity(candidate.quantity);
    await this.expectNextStepEnabled();

    return {
      productName: candidate.productName,
      widthMm: selectedSize.widthMm ?? candidate.widthMm,
      heightMm: selectedSize.heightMm ?? candidate.heightMm,
      quantity: selectedQuantity.quantity,
      price: selectedQuantity.price
    };
  }

  async expectPrice(price: string): Promise<void> {
    await expect(this.optionsPanel.getByText(price).last()).toBeVisible();
  }

  async expectVisiblePrice(): Promise<void> {
    await expect(this.optionsPanel.getByText(wonAmountPattern).last()).toBeVisible();
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

  private async selectPreferredSize(candidate: RegressionProductCandidate): Promise<SelectedSize> {
    const presetSize = this.optionsPanel
      .getByRole('button', { name: new RegExp(`\\(${candidate.widthMm}x${candidate.heightMm}\\)`) })
      .first();
    const hasPresetSize = await presetSize
      .waitFor({ state: 'visible', timeout: 5_000 })
      .then(() => true)
      .catch(() => false);

    if (hasPresetSize) {
      await presetSize.click();
      await this.waitForAnyQuantityButton();
      return {
        widthMm: candidate.widthMm,
        heightMm: candidate.heightMm
      };
    }

    const vinylSizeInputs = this.page.getByTestId('product-category-vinyl-size-input').locator('input');
    if ((await vinylSizeInputs.count()) >= 2) {
      await vinylSizeInputs.nth(0).fill(String(candidate.widthMm));
      await vinylSizeInputs.nth(1).fill(String(candidate.heightMm));
      await this.waitForAnyQuantityButton();
      return {
        widthMm: candidate.widthMm,
        heightMm: candidate.heightMm
      };
    }

    const customSizeButton = this.customOptionButtons().first();
    if (await customSizeButton.isVisible().catch(() => false)) {
      await customSizeButton.click();

      const inputs = this.customSizeInputs();
      if ((await inputs.count()) >= 2) {
        await inputs.nth(0).fill(String(candidate.widthMm));
        await inputs.nth(1).fill(String(candidate.heightMm));
        await this.waitForAnyQuantityButton();
        return {
          widthMm: candidate.widthMm,
          heightMm: candidate.heightMm
        };
      }
    }

    const fallbackSize = await this.firstVisibleSizeButton();
    if (!fallbackSize) {
      await this.waitForAnyQuantityButton();
      return {};
    }

    const sizeText = await fallbackSize.innerText();
    await fallbackSize.click({ force: true });
    await this.waitForAnyQuantityButton();

    return parseSize(sizeText) ?? {};
  }

  private async selectPreferredQuantity(preferredQuantity: number): Promise<SelectedQuantity> {
    const preferredButton = await this.quantityButtonWithAnyPrice(preferredQuantity).catch(() => undefined);

    if (preferredButton && (await preferredButton.isVisible().catch(() => false))) {
      return this.clickQuantityButton(preferredButton, preferredQuantity);
    }

    const quantityButtons = this.quantityButtonsWithAnyPrice();
    const quantityButtonCount = await quantityButtons.count();

    for (let index = 0; index < quantityButtonCount; index += 1) {
      const button = quantityButtons.nth(index);
      if (!(await button.isVisible().catch(() => false)) || !(await button.isEnabled().catch(() => false))) {
        continue;
      }

      return this.clickQuantityButton(button, preferredQuantity);
    }

    await this.openCustomQuantityField().catch(() => undefined);
    await this.fillCustomQuantity(preferredQuantity).catch(() => undefined);

    const customQuantityButton = await this.quantityButtonWithAnyPrice(preferredQuantity).catch(() => undefined);
    if (customQuantityButton && (await customQuantityButton.isVisible().catch(() => false))) {
      return this.clickQuantityButton(customQuantityButton, preferredQuantity);
    }

    throw new Error(`No selectable quantity option was found for preferred quantity ${preferredQuantity}.`);
  }

  private async clickQuantityButton(button: Locator, fallbackQuantity: number): Promise<SelectedQuantity> {
    const text = await button.innerText();
    const quantity = extractLeadingNumber(text) ?? fallbackQuantity;
    const price = extractWonAmount(text);

    await button.click({ force: true });

    return {
      quantity,
      price
    };
  }

  private async firstVisibleSizeButton(): Promise<Locator | undefined> {
    const buttons = this.optionsPanel.getByRole('button');
    const buttonCount = await buttons.count();

    for (let index = 0; index < buttonCount; index += 1) {
      const button = buttons.nth(index);
      const text = normalizeText(await button.innerText().catch(() => ''));

      if (
        sizeLabelPattern.test(text) &&
        !wonAmountPattern.test(text) &&
        (await button.isVisible().catch(() => false)) &&
        (await button.isEnabled().catch(() => false))
      ) {
        return button;
      }
    }

    return undefined;
  }

  private async waitForAnyQuantityButton(): Promise<void> {
    await this.quantityButtonsWithAnyPrice().first().waitFor({ state: 'visible', timeout: 15_000 }).catch(() => undefined);
  }

  private async quantityButtonWithAnyPrice(quantity: number): Promise<Locator> {
    const quantityText = quantity.toLocaleString('en-US');
    const button = this.optionsPanel
      .getByRole('button', { name: new RegExp(`^${escapeRegExp(quantityText)}(?:\\s*개)?\\s+[\\d,]+원`) })
      .first();

    await expect(button).toBeVisible({ timeout: 15_000 });
    return button;
  }

  private async selectConfiguredSize(config: ProductConfig): Promise<SelectedSize> {
    const configuredSize = this.optionsPanel.getByRole('button', { name: config.sizeLabel, exact: true }).first();
    const hasConfiguredSize = await configuredSize
      .waitFor({ state: 'visible', timeout: 3_000 })
      .then(() => true)
      .catch(() => false);

    if (hasConfiguredSize) {
      await configuredSize.click();
      await this.waitForAnyQuantityButton();
      return {
        widthMm: config.widthMm,
        heightMm: config.heightMm
      };
    }

    return this.selectPreferredSize({
      path: config.path,
      productName: config.productName,
      categoryName: 'stickers',
      widthMm: config.widthMm,
      heightMm: config.heightMm,
      quantity: config.quantity
    });
  }

  private quantityButtonsWithAnyPrice(): Locator {
    return this.optionsPanel.getByRole('button', { name: /^\d[\d,]*(?:\s*개)?\s+[\d,]+\uC6D0/u });
  }
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function parseSize(value: string): SelectedSize | undefined {
  const match = normalizeText(value).match(/(\d+)\s*(?:x|×)\s*(\d+)/i);

  if (!match?.[1] || !match[2]) {
    return undefined;
  }

  return {
    widthMm: Number(match[1]),
    heightMm: Number(match[2])
  };
}

function extractLeadingNumber(value: string): number | undefined {
  const match = normalizeText(value).match(/^(\d[\d,]*)/);

  if (!match?.[1]) {
    return undefined;
  }

  const parsed = Number(match[1].replace(/,/g, ''));

  return Number.isFinite(parsed) ? parsed : undefined;
}

function normalizeText(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function extractWonAmount(value: string): string | undefined {
  return value.match(/[\d,]+원/)?.[0];
}
