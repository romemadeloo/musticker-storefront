import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import type { CartLineItem } from '../fixtures/types.js';

const changeSizeButtonName = /\uc0ac\uc774\uc988 (?:\ubcc0\uacbd|\uc218\uc815)|Change size|Edit size/i;
const sizeEditDialogTitle = /\uc0ac\uc774\uc988 \uc218\uc815|\uc5c5\ub370\uc774\ud2b8|Update/i;

type SelectResult = {
  changed: boolean;
  text: string;
  value: string;
};

export class CartPage {
  readonly page: Page;
  readonly main: Locator;

  constructor(page: Page) {
    this.page = page;
    this.main = page.getByTestId('cart-page');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/kr\/cart\/?$/);
    await expect(this.main).toBeVisible();
    await expect(this.page.getByTestId('cart-page-summary')).toBeVisible();
  }

  async captureItems(productNames: string[]): Promise<CartLineItem[]> {
    const items: CartLineItem[] = [];

    for (const productName of productNames) {
      const row = this.row(productName);
      await expect(row).toBeVisible();

      items.push({
        productName,
        ...parseCartRow(await row.innerText(), await this.rowQuantity(row))
      });
    }

    return items;
  }

  async captureTotal(): Promise<string> {
    const summary = this.page.getByTestId('cart-page-summary');
    await expect(summary).toBeVisible();
    return extractWonAmount(await summary.innerText()) ?? '';
  }

  async editFirstItemSizeAndQuantity(sizeMm: number, quantity: number): Promise<void> {
    const totalBefore = await this.captureTotal();
    const rows = this.rows();
    const rowCount = await rows.count();

    for (let index = 0; index < rowCount; index += 1) {
      const row = rows.nth(index);
      const sizeButton = row.getByRole('button', { name: changeSizeButtonName });
      const quantityButton = this.rowQuantityButton(row);

      if (
        !(await sizeButton.isVisible().catch(() => false)) ||
        !(await quantityButton.isVisible().catch(() => false))
      ) {
        continue;
      }

      await sizeButton.click();
      const sizeDialog = this.page.getByRole('dialog').filter({ hasText: sizeEditDialogTitle }).last();
      await expect(sizeDialog).toBeVisible();
      const selectedSize = await this.selectModalValue(sizeDialog, String(sizeMm));

      if (!selectedSize.changed) {
        await this.closeEditDialog(sizeDialog);
        continue;
      }

      await sizeDialog.getByRole('button', { name: /\uc5c5\ub370\uc774\ud2b8|Update/i }).click();
      const sizeDialogClosed = await sizeDialog
        .waitFor({ state: 'hidden', timeout: 10_000 })
        .then(() => true)
        .catch(() => false);

      if (!sizeDialogClosed) {
        await this.closeEditDialog(sizeDialog);
        continue;
      }

      const quantityBefore = await this.rowQuantity(row);
      await quantityButton.click({ force: true });
      const selectedQuantity = await this.selectOpenListboxValue(String(quantity), quantityBefore?.toString() ?? '');

      if (selectedSize.value) {
        await expect(row)
          .toContainText(new RegExp(`(Size:|\\uc0ac\\uc774\\uc988:)\\s*${selectedSize.value}x${selectedSize.value}(mm)?`, 'i'), {
            timeout: 5_000
          })
          .catch(() => undefined);
      }

      const quantityChanged = selectedQuantity.value
        ? await expect
            .poll(() => this.rowQuantity(row), { timeout: 10_000 })
            .toBe(Number(selectedQuantity.value))
            .then(() => true)
            .catch(() => false)
        : false;

      const totalChanged = await expect
        .poll(() => this.captureTotal(), { timeout: 15_000 })
        .not.toBe(totalBefore)
        .then(() => true)
        .catch(() => false);

      if (totalChanged || selectedSize.changed || quantityChanged) {
        return;
      }
    }

    throw new Error('No cart page row exposed both size and quantity edit controls.');
  }

  async proceedToCheckout(): Promise<void> {
    await this.page.getByRole('button', { name: /\uc8fc\ubb38\ud558\uae30|Checkout/i }).click();
    await expect(this.page).toHaveURL(/\/kr\/checkout\/?$/);
  }

  private row(productName: string): Locator {
    return this.rows().filter({ hasText: productName }).first();
  }

  private rows(): Locator {
    return this.page.getByTestId('cart-page-row').or(this.main.getByRole('article'));
  }

  private async rowQuantity(row: Locator): Promise<number | undefined> {
    const trigger = this.rowQuantityButton(row);
    if (!(await trigger.count())) {
      return undefined;
    }

    const value = Number((await trigger.first().innerText()).trim().replace(/[^\d]/g, ''));
    return Number.isFinite(value) ? value : undefined;
  }

  private async selectModalValue(dialog: Locator, preferredValue: string): Promise<SelectResult> {
    const trigger = this.editDialogSelectTriggers(dialog).first();
    const previousValue = extractLeadingNumber(await trigger.innerText());

    await trigger.click({ force: true });
    return this.selectOpenListboxValue(preferredValue, previousValue);
  }

  private rowQuantityButton(row: Locator): Locator {
    return row.locator('button.cart-qty-select-trigger').or(row.getByRole('button', { name: /^\d[\d,]*$/ })).first();
  }

  private editDialogSelectTriggers(dialog: Locator): Locator {
    return dialog.locator('button.cart-item-edit-select-trigger, [role="combobox"]');
  }

  private async selectOpenListboxValue(preferredValue: string, previousValue: string): Promise<SelectResult> {
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
    const preferredNumber = selectNumber(preferredValue);
    const previousNumber = selectNumber(previousValue);

    if ((await preferred.isVisible().catch(() => false)) && extractLeadingNumber(await preferred.innerText()) !== previousValue) {
      return preferred;
    }

    const optionCount = await options.count();
    let higherFallback: Locator | undefined;
    let changedFallback: Locator | undefined;

    for (let index = 0; index < optionCount; index += 1) {
      const option = options.nth(index);
      const optionValue = extractLeadingNumber(await option.innerText());

      if (optionValue && optionValue !== previousValue && !(await option.isDisabled().catch(() => false))) {
        const optionNumber = selectNumber(optionValue);

        if (optionNumber !== undefined && preferredNumber !== undefined && optionNumber >= preferredNumber) {
          return option;
        }

        if (
          !higherFallback &&
          optionNumber !== undefined &&
          previousNumber !== undefined &&
          optionNumber > previousNumber
        ) {
          higherFallback = option;
        }

        changedFallback ??= option;
      }
    }

    if (higherFallback) {
      return higherFallback;
    }

    if (await preferred.isVisible().catch(() => false)) {
      return preferred;
    }

    if (previousValue) {
      const current = options.filter({ hasText: new RegExp(`^\\s*${escapeRegExp(previousValue)}\\b`) }).first();
      if (await current.isVisible().catch(() => false)) {
        return current;
      }
    }

    if (previousNumber === undefined && changedFallback) {
      return changedFallback;
    }

    return options.first();
  }

  private async closeEditDialog(dialog: Locator): Promise<void> {
    const closeButton = dialog
      .getByRole('button', { name: /Close|Cancel|\ub2eb\uae30|\ucde8\uc18c|ui\.modal\.close/i })
      .first();

    if (await closeButton.isVisible().catch(() => false)) {
      await closeButton.click();
    } else {
      await this.page.keyboard.press('Escape');
    }

    await expect(dialog).toBeHidden({ timeout: 10_000 }).catch(() => undefined);
  }
}

function parseCartRow(text: string, selectedQuantity: number | undefined): Omit<CartLineItem, 'productName'> {
  const normalized = text.replace(/\s+/g, ' ');
  const size = normalized.match(/(?:Size:|\uc0ac\uc774\uc988:)\s*(\d+)x(\d+)(?:mm)?/i);

  return {
    widthMm: size ? Number(size[1]) : undefined,
    heightMm: size ? Number(size[2]) : undefined,
    quantity: selectedQuantity,
    price: extractWonAmount(normalized)
  };
}

function extractWonAmount(value: string): string | undefined {
  return value.match(/[\d,]+\uc6d0/)?.[0];
}

function extractLeadingNumber(value: string): string {
  return normalizeSelectText(value).match(/^\d[\d,]*/)?.[0].replace(/,/g, '') ?? '';
}

function selectNumber(value: string): number | undefined {
  const parsed = Number(value.replace(/,/g, ''));
  return Number.isFinite(parsed) ? parsed : undefined;
}

function normalizeSelectText(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
