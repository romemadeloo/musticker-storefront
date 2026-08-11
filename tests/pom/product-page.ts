import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { appPath } from '../fixtures/env.js';
import { ko } from '../fixtures/storefront-data.js';

const wonAmountPattern = /[\d,]+\uc6d0/u;

export class ProductV2Page {
  readonly page: Page;
  readonly optionsPanel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.optionsPanel = page
      .getByTestId('product-category-options')
      .or(page.getByRole('complementary').filter({ hasText: /\uc0ac\uc774\uc988|\uc218\ub7c9|Size|Quantity/i }))
      .first();
  }

  async goto(path: string, heading: string): Promise<void> {
    await this.page.goto(appPath(path));
    await expect(this.page.getByRole('heading', { name: heading, exact: true }).first()).toBeVisible();
    await expect(this.optionsPanel).toBeVisible();
  }

  async expectCatalogEntryRenders(path: string): Promise<void> {
    await this.page.goto(appPath(path));
    await expect(this.page).toHaveURL(new RegExp(`${escapeRegExp(path.replace(/^\.\//, ''))}/?$`));
    await expect(this.page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    await expect(this.optionsPanel).toBeVisible();
  }

  async addToCart(): Promise<void> {
    await this.nextStepButton().click();

    const addToCartButton = this.page.getByRole('dialog').getByRole('button', { name: ko.addToCart });
    await expect(addToCartButton).toBeVisible();
    await addToCartButton.click();
  }

  async selectSize(sizeName: string): Promise<void> {
    await this.optionsPanel.getByRole('button', { name: new RegExp(escapeRegExp(sizeName)) }).first().click();
  }

  async selectMaterial(materialName: string): Promise<void> {
    await this.optionsPanel.getByRole('button', { name: materialName }).click();
  }

  async selectSheetSize(sizeName: string): Promise<void> {
    await this.optionsPanel.getByRole('button', { name: new RegExp(`^${escapeRegExp(sizeName)}`) }).first().click();
  }

  async selectQuantity(quantity: number): Promise<void> {
    const quantityLabel = new RegExp(`^${quantity.toLocaleString('en-US')}\\s*(?:\\S+)?\\s*${wonAmountPattern.source}`, 'u');
    await this.optionsPanel.getByRole('button', { name: quantityLabel }).first().click();
  }

  async expectVisiblePrice(): Promise<void> {
    await expect(this.optionsPanel.getByText(wonAmountPattern).last()).toBeVisible();
  }

  async expectNextStepEnabled(): Promise<void> {
    await expect(this.nextStepButton()).toBeEnabled();
  }

  async clickNextStepAndExpectProgression(): Promise<void> {
    await this.nextStepButton().click();
    await expect(
      this.page
        .getByRole('dialog')
        .or(this.page.getByText(/\uc5c5\ub85c\ub4dc|\ub514\uc790\uc778|\uc7a5\ubc14\uad6c\ub2c8|Upload|Cart/i))
        .first()
    ).toBeVisible();
  }

  async expectProductionPromises(): Promise<void> {
    await expect(this.page.locator('body')).toContainText('5\ub9cc\uc6d0 \uc774\uc0c1 \ubb34\ub8cc\ubc30\uc1a1');
    await expect(this.page.locator('body')).toContainText('3\uc2dc \uc774\uc804 \uc2dc\uc548 \ud655\uc815 \uc2dc \ub2f9\uc77c\ubc30\uc1a1');
    await expect(this.page.locator('body')).toContainText(/\ub3c4\ucc29 \uc608\uc815\uc77c|CJ \ub300\ud55c\ud1b5\uc6b4/);
    await expect(this.page.locator('body')).toContainText('\uc624\ub298\uc81c\uc791, \ub0b4\uc77c\ubc1c\uc1a1');
    await expect(this.page.locator('body')).toContainText('\ube60\ub978 \uc2dc\uc548 \ud53c\ub4dc\ubc31');
    await expect(this.page.locator('body')).toContainText('\ub6f0\uc5b4\ub09c \ub0b4\uad6c\uc131\uacfc \ub0b4\uc218\uc131');
  }

  async expectReviewCarouselUsable(): Promise<void> {
    const body = this.page.locator('body');
    await expect(body).toContainText(ko.reviews225);

    const nextButton = this.page.getByRole('button', { name: /\ub2e4\uc74c \ub9ac\ubdf0/ }).first();
    const previousButton = this.page.getByRole('button', { name: /\uc774\uc804 \ub9ac\ubdf0/ }).first();

    await expect(nextButton).toBeVisible();
    await nextButton.click();
    await expect(previousButton).toBeVisible();
    await previousButton.click();
    await expect(body).toContainText(ko.reviews225);
  }

  async expectCustomControlsOpen(): Promise<void> {
    const customSizeButton = this.optionsPanel.getByRole('button', { name: ko.customSize }).first();
    await expect(customSizeButton).toBeVisible();
    await customSizeButton.click();
    await expect(this.page.getByRole('dialog').or(this.optionsPanel.getByRole('spinbutton')).first()).toBeVisible();
    await this.closeTransientDialog();

    const customQuantityButton = this.optionsPanel.getByRole('button', { name: ko.customQuantity }).first();
    await expect(customQuantityButton).toBeVisible();
    await customQuantityButton.click();
    await expect(this.page.getByRole('dialog').or(this.optionsPanel.getByRole('spinbutton')).first()).toBeVisible();
    await this.closeTransientDialog();
  }

  async expectSheetTemplateControls(): Promise<void> {
    await expect(this.page.locator('body')).toContainText(/\uc2dc\ud2b8 \uc2a4\ud2f0\ucee4 \ud15c\ud50c\ub9bf \ub2e4\uc6b4\ub85c\ub4dc/);
    await expect(this.page.locator('body')).toContainText(/\ubc30\uce58 \uac00\uc774\ub4dc \ubcf4\uae30/);
  }

  private nextStepButton(): Locator {
    return this.optionsPanel.getByRole('button', { name: ko.nextStep });
  }

  private async closeTransientDialog(): Promise<void> {
    const cancelButton = this.page.getByRole('button', { name: ko.cancel }).last();
    if (await cancelButton.isVisible().catch(() => false)) {
      await cancelButton.click();
      return;
    }

    await this.page.keyboard.press('Escape').catch(() => undefined);
  }
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

