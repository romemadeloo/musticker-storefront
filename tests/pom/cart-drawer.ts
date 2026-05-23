import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import type { CartLineItem, ProductConfig } from '../fixtures/types.js';

const cartPreviewTitle = /\uc7a5\ubc14\uad6c\ub2c8 \ubbf8\ub9ac\ubcf4\uae30|Cart Preview/i;
const editDialogTitle = /\uc0ac\uc774\uc988 \ubc0f \uc218\ub7c9 \uc218\uc815|\uc5c5\ub370\uc774\ud2b8|Update/i;

type SelectResult = {
  changed: boolean;
  text: string;
  value: string;
};

export class CartDrawer {
  readonly page: Page;
  readonly dialog: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dialog = page.getByRole('dialog').filter({ hasText: cartPreviewTitle });
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

    const emptyMessage = this.dialog.getByText('\ud604\uc7ac \uc7a5\ubc14\uad6c\ub2c8\uac00 \ube44\uc5b4 \uc788\uc2b5\ub2c8\ub2e4.');
    if (await emptyMessage.count()) {
      await expect(emptyMessage).toBeVisible();
      return;
    }

    await expect(this.dialog.getByRole('heading', { name: cartPreviewTitle })).toBeVisible();
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

  async expectLineItems(productNames: string[]): Promise<void> {
    for (const productName of productNames) {
      await expect(this.lineItem(productName)).toBeVisible();
    }
  }

  async captureItems(productNames: string[]): Promise<CartLineItem[]> {
    const items: CartLineItem[] = [];

    for (const productName of productNames) {
      const item = this.lineItem(productName);
      await expect(item).toBeVisible();

      items.push({
        productName,
        ...parseLineItemText(await item.innerText())
      });
    }

    return items;
  }

  async captureTotal(): Promise<string> {
    const total = this.dialog.getByTestId('product-category-cart-total-row');
    await expect(total).toBeVisible();
    return extractWonAmount(await total.innerText()) ?? '';
  }

  async editFirstItemSizeAndQuantity(sizeMm: number, quantity: number): Promise<void> {
    const totalBefore = await this.captureTotal();
    const editButtons = this.dialog.getByTestId('product-category-cart-item-edit-button');
    const editButtonCount = await editButtons.count();

    for (let index = 0; index < editButtonCount; index += 1) {
      await editButtons.nth(index).click();

      const editDialog = this.page.getByRole('dialog').filter({ hasText: editDialogTitle }).last();
      await expect(editDialog).toBeVisible();

      const editableSelects = editDialog.locator('button.cart-item-edit-select-trigger');
      if ((await editableSelects.count()) < 2) {
        await this.closeEditDialog(editDialog);
        continue;
      }

      const selectedSize = await this.selectFromEditDialog(editDialog, 0, String(sizeMm));
      const selectedQuantity = await this.selectFromEditDialog(editDialog, 1, String(quantity));
      await editDialog.getByRole('button', { name: /\uc5c5\ub370\uc774\ud2b8|Update/i }).click();
      await expect(editDialog).toBeHidden();

      if (selectedSize.value) {
        await expect(this.dialog.getByText(new RegExp(`Size:\\s*${selectedSize.value}x${selectedSize.value}`, 'i')).first())
          .toBeVisible({ timeout: 5_000 })
          .catch(() => undefined);
      }

      if (selectedQuantity.value) {
        await expect(this.dialog.getByText(new RegExp(`Quantity:\\s*${selectedQuantity.value}`, 'i')).first())
          .toBeVisible({
            timeout: 5_000
          })
          .catch(() => undefined);
      }

      const totalChanged = await expect
        .poll(() => this.captureTotal(), { timeout: 15_000 })
        .not.toBe(totalBefore)
        .then(() => true)
        .catch(() => false);

      if (totalChanged || selectedSize.changed || selectedQuantity.changed) {
        return;
      }
    }

    throw new Error('No cart preview item exposed both size and quantity edit controls.');
  }

  async expectRecommendedProductsVisible(): Promise<void> {
    await expect(this.dialog.getByRole('heading', { name: '\ucd94\ucc9c \uc0c1\ud488' })).toBeVisible();
    await expect(this.dialog.getByRole('button', { name: '\ub9de\ucda4 \uc81c\uc791' }).first()).toBeVisible();
  }

  async removeLineItem(config: ProductConfig): Promise<void> {
    const item = this.lineItem(config.productName);
    const deleteByTestId = item.getByTestId('product-category-cart-item-delete-button');

    if (await deleteByTestId.count()) {
      await deleteByTestId.click();
    } else {
      await item.getByRole('button', { name: /Remove item|\uc0c1\ud488 \uc0ad\uc81c/ }).click();
    }

    await this.confirmRemovalIfPrompted();
    await expect(this.lineItems(config.productName)).toHaveCount(0);
  }

  async checkout(): Promise<void> {
    const checkoutByTestId = this.page.getByTestId('product-category-cart-checkout-button');
    if (await checkoutByTestId.count()) {
      await checkoutByTestId.click();
    } else {
      await this.dialog.getByRole('button', { name: '\uacb0\uc81c \uc9c4\ud589' }).click();
    }

    await expect(this.page).toHaveURL(/\/kr\/checkout\/?$/);
  }

  async continueShopping(): Promise<void> {
    await this.dialog.getByRole('button', { name: '\uc1fc\ud551 \uacc4\uc18d\ud558\uae30' }).click();
    await expect(this.dialog).toBeHidden();
  }

  async viewCart(): Promise<void> {
    await this.dialog.getByTestId('product-category-cart-view-button').click();
    await expect(this.page).toHaveURL(/\/kr\/cart\/?$/);
  }

  private lineItem(productName: string): Locator {
    return this.lineItems(productName).first();
  }

  private lineItems(productName: string): Locator {
    return this.dialog.getByRole('article').filter({ hasText: productName }).filter({ hasText: /Size:|Quantity:/i });
  }

  private async selectFromEditDialog(editDialog: Locator, triggerIndex: number, preferredValue: string): Promise<SelectResult> {
    const trigger = editDialog.locator('button.cart-item-edit-select-trigger').nth(triggerIndex);
    const previousValue = extractLeadingNumber(await trigger.innerText());

    await trigger.click({ force: true });

    const listbox = this.page.getByRole('listbox').last();
    await expect(listbox).toBeVisible({ timeout: 5_000 });

    const options = listbox.getByRole('button');
    const option = await this.optionForValue(options, preferredValue, previousValue);
    const selectedText = await option.innerText();
    const selectedValue = extractLeadingNumber(selectedText);

    await option.click({ force: true });
    await expect(listbox).toBeHidden({ timeout: 5_000 }).catch(() => undefined);

    return {
      changed: Boolean(selectedValue && selectedValue !== previousValue),
      text: normalizeSelectText(selectedText),
      value: selectedValue
    };
  }

  private async optionForValue(options: Locator, preferredValue: string, previousValue: string): Promise<Locator> {
    const preferred = options.filter({ hasText: new RegExp(`^\\s*${escapeRegExp(preferredValue)}\\b`) }).first();

    if ((await preferred.isVisible().catch(() => false)) && extractLeadingNumber(await preferred.innerText()) !== previousValue) {
      return preferred;
    }

    const optionCount = await options.count();
    for (let index = 0; index < optionCount; index += 1) {
      const option = options.nth(index);
      const optionValue = extractLeadingNumber(await option.innerText());

      if (optionValue && optionValue !== previousValue && !(await option.isDisabled().catch(() => false))) {
        return option;
      }
    }

    if (await preferred.isVisible().catch(() => false)) {
      return preferred;
    }

    return options.first();
  }

  private async closeEditDialog(editDialog: Locator): Promise<void> {
    const closeButton = editDialog
      .getByRole('button', { name: /Close|Cancel|\ub2eb\uae30|\ucde8\uc18c|ui\.modal\.close/i })
      .first();

    if (await closeButton.isVisible().catch(() => false)) {
      await closeButton.click();
    } else {
      await this.page.keyboard.press('Escape');
    }

    await expect(editDialog).toBeHidden();
  }

  private async confirmRemovalIfPrompted(): Promise<void> {
    const deleteButton = this.page.getByRole('dialog').getByRole('button', { name: '\uc0ad\uc81c' }).last();

    if (await deleteButton.isVisible().catch(() => false)) {
      await deleteButton.click();
      await expect(deleteButton).toBeHidden();
    }
  }
}

function parseLineItemText(text: string): Omit<CartLineItem, 'productName'> {
  const normalized = text.replace(/\s+/g, ' ');
  const size = normalized.match(/Size:\s*(\d+)x(\d+)/i);
  const quantity = normalized.match(/Quantity:\s*(\d+)/i);

  return {
    widthMm: size ? Number(size[1]) : undefined,
    heightMm: size ? Number(size[2]) : undefined,
    quantity: quantity ? Number(quantity[1]) : undefined,
    price: extractWonAmount(normalized)
  };
}

function extractWonAmount(value: string): string | undefined {
  return value.match(/[\d,]+\uc6d0/)?.[0];
}

function extractLeadingNumber(value: string): string {
  return normalizeSelectText(value).match(/^\d[\d,]*/)?.[0].replace(/,/g, '') ?? '';
}

function normalizeSelectText(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
