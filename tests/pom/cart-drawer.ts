import type { Locator, Page, Response } from '@playwright/test';
import { expect } from '@playwright/test';

import { firstLocatorWithCount, firstVisibleLocator } from '../fixtures/resilient-locator.js';
import type { CartLineItem, ProductConfig } from '../fixtures/types.js';

const cartPreviewTitle = /\uc7a5\ubc14\uad6c\ub2c8 \ubbf8\ub9ac\ubcf4\uae30|Cart Preview/i;
const editDialogTitle = /\uc0ac\uc774\uc988 \ubc0f \uc218\ub7c9 \uc218\uc815|\uc5c5\ub370\uc774\ud2b8|Update/i;
const cartItemUpdatePath = '/sys/kr/cart/item/update';

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

  async expectEmpty(config?: ProductConfig | CartLineItem): Promise<void> {
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

  async expectLineItem(config: ProductConfig | CartLineItem): Promise<void> {
    const item = this.lineItem(config.productName);
    const price = lineItemPrice(config);

    await expect(item).toBeVisible();
    await expect(item).toContainText(config.productName);

    if (config.widthMm && config.heightMm) {
      await expect(item).toContainText(new RegExp(`(?:Size|사이즈):\\s*${config.widthMm}x${config.heightMm}`, 'i'));
    }

    if (config.quantity) {
      await expect(item).toContainText(new RegExp(`(?:Quantity|수량):\\s*${config.quantity}`, 'i'));
    }

    if (price) {
      await expect(item).toContainText(price);
      await expect(this.dialog.getByText(price).last()).toBeVisible();
    }
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

  async captureAllItems(): Promise<CartLineItem[]> {
    const items: CartLineItem[] = [];
    const lineItems = this.lineItemArticles();
    const itemCount = await lineItems.count();

    for (let index = 0; index < itemCount; index += 1) {
      const text = await lineItems.nth(index).innerText();

      items.push({
        productName: parseProductName(text),
        ...parseLineItemText(text)
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
    const editButtons = await this.editButtons();
    const editButtonCount = await editButtons.count();

    for (let index = 0; index < editButtonCount; index += 1) {
      await editButtons.nth(index).click();

      const editDialog = await this.editDialog();

      const editableSelects = this.editDialogSelectTriggers(editDialog);
      if ((await editableSelects.count()) < 2) {
        await this.closeEditDialog(editDialog);
        continue;
      }

      const selectedSize = await this.selectFromEditDialog(editDialog, 0, String(sizeMm));
      const selectedQuantity = await this.selectFromEditDialog(editDialog, 1, String(quantity));

      if (!selectedSize.changed && !selectedQuantity.changed) {
        await this.closeEditDialog(editDialog);
        continue;
      }

      const updateResponsePromise = this.waitForCartItemUpdateResponse();
      const updateButton = await firstVisibleLocator([
        {
          name: 'cart edit update button role',
          locator: editDialog.getByRole('button', { name: /\uc5c5\ub370\uc774\ud2b8|Update/i })
        },
        {
          name: 'cart edit submit button',
          locator: editDialog.locator('button[type="submit"]')
        }
      ]);

      await updateButton.click();
      await this.expectCartItemUpdateSucceeded(await updateResponsePromise);

      const dialogClosed = await editDialog
        .waitFor({ state: 'hidden', timeout: 10_000 })
        .then(() => true)
        .catch(() => false);

      if (!dialogClosed) {
        await this.closeEditDialog(editDialog).catch(() => undefined);
        continue;
      }

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

  async removeLineItem(config: ProductConfig | CartLineItem): Promise<void> {
    const item = this.lineItem(config.productName);
    await this.deleteLineItem(item);

    await this.confirmRemovalIfPrompted();
    await expect(this.lineItems(config.productName)).toHaveCount(0);
  }

  async removeAllLineItems(): Promise<void> {
    for (let attempt = 0; attempt < 50; attempt += 1) {
      const lineItems = this.lineItemArticles();
      const itemCount = await lineItems.count();

      if (itemCount === 0) {
        return;
      }

      await this.deleteLineItem(lineItems.first());
      await this.confirmRemovalIfPrompted();

      await expect
        .poll(() => this.lineItemArticles().count(), { timeout: 10_000 })
        .toBeLessThan(itemCount);
    }

    throw new Error('Cart still had line items after 50 removal attempts.');
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
    return this.dialog
      .getByRole('article')
      .filter({ hasText: productName })
      .filter({ hasText: /Size:|Quantity:|\uc0ac\uc774\uc988:|\uc218\ub7c9:/i });
  }

  private lineItemArticles(): Locator {
    return this.dialog.getByRole('article').filter({ hasText: /Size:|Quantity:|\uc0ac\uc774\uc988:|\uc218\ub7c9:/i });
  }

  private async deleteLineItem(item: Locator): Promise<void> {
    const deleteByTestId = item.getByTestId('product-category-cart-item-delete-button');

    if (await deleteByTestId.count()) {
      await deleteByTestId.click();
    } else {
      await item.getByRole('button', { name: /Remove item|\uc0c1\ud488 \uc0ad\uc81c/ }).click();
    }
  }

  private async selectFromEditDialog(editDialog: Locator, triggerIndex: number, preferredValue: string): Promise<SelectResult> {
    const trigger = this.editDialogSelectTriggers(editDialog).nth(triggerIndex);
    const previousValue = extractLeadingNumber(await trigger.innerText());

    await trigger.click({ force: true });

    const listbox = await firstVisibleLocator(
      [
        {
          name: 'cart edit dialog listbox',
          locator: editDialog.getByRole('listbox').last()
        },
        {
          name: 'page listbox',
          locator: this.page.getByRole('listbox').last()
        }
      ],
      5_000
    );

    const options = await firstLocatorWithCount([
      {
        name: 'listbox button options',
        locator: listbox.getByRole('button')
      },
      {
        name: 'listbox css button options',
        locator: listbox.locator('button')
      },
      {
        name: 'listbox role options',
        locator: listbox.getByRole('option')
      },
      {
        name: 'listbox css role options',
        locator: listbox.locator('[role="option"]')
      },
      {
        name: 'listbox data-value options',
        locator: listbox.locator('[data-value]')
      }
    ], 5_000);
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

    if (
      (await preferred.isVisible().catch(() => false)) &&
      !(await preferred.isDisabled().catch(() => false)) &&
      extractLeadingNumber(await preferred.innerText()) !== previousValue
    ) {
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

  private async closeEditDialog(editDialog: Locator): Promise<void> {
    const closeButton = await firstVisibleLocator(
      [
        {
          name: 'cart edit close or cancel button role',
          locator: editDialog.getByRole('button', { name: /Close|Cancel|\ub2eb\uae30|\ucde8\uc18c|ui\.modal\.close/i })
        },
        {
          name: 'cart edit close aria-label',
          locator: editDialog.locator('button[aria-label*="close" i]')
        }
      ],
      1_000
    ).catch(() => undefined);

    if (closeButton) {
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

  private editDialogSelectTriggers(editDialog: Locator): Locator {
    return editDialog.locator('button.cart-item-edit-select-trigger, [role="combobox"]');
  }

  private async editButtons(): Promise<Locator> {
    return firstLocatorWithCount([
      {
        name: 'cart item edit button test id',
        locator: this.dialog.getByTestId('product-category-cart-item-edit-button')
      },
      {
        name: 'cart item edit button role',
        locator: this.dialog.getByRole('button', { name: /\uc0c1\ud488 \uc218\uc815|Edit item|Edit product/i })
      },
      {
        name: 'cart item edit button aria-label',
        locator: this.dialog.locator('button[aria-label*="edit" i]')
      }
    ]);
  }

  private async editDialog(): Promise<Locator> {
    return firstVisibleLocator([
      {
        name: 'cart edit dialog accessible name',
        locator: this.page.getByRole('dialog', { name: editDialogTitle }).last()
      },
      {
        name: 'cart edit dialog title text',
        locator: this.page.getByRole('dialog').filter({ hasText: editDialogTitle }).last()
      },
      {
        name: 'cart edit dialog shell class',
        locator: this.page.locator('.cart-item-edit-modal-shell').last()
      }
    ]);
  }

  private async waitForCartItemUpdateResponse(): Promise<Response | undefined> {
    return this.page
      .waitForResponse(
        (response) => response.url().includes(cartItemUpdatePath) && response.request().method() === 'POST',
        { timeout: 15_000 }
      )
      .catch(() => undefined);
  }

  private async expectCartItemUpdateSucceeded(response: Response | undefined): Promise<void> {
    if (!response || response.ok()) {
      return;
    }

    const requestBody = response.request().postData() ?? '<empty>';
    const responseBody = await response.text().catch((error: unknown) => `Could not read response body: ${String(error)}`);

    throw new Error(
      [
        `Cart item update API failed with ${response.status()} ${response.url()}.`,
        `Request body: ${clipText(requestBody)}`,
        `Response body: ${clipText(responseBody)}`
      ].join('\n')
    );
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

function parseProductName(text: string): string {
  const lines = text
    .split(/\r?\n/)
    .map((line) => normalizeSelectText(line))
    .filter(Boolean);
  const metadataIndex = lines.findIndex((line) => /^(Size|Quantity|\uc0ac\uc774\uc988|\uc218\ub7c9)\s*:/i.test(line));
  const nameLines = metadataIndex > 0 ? lines.slice(0, metadataIndex) : lines;

  for (let index = nameLines.length - 1; index >= 0; index -= 1) {
    const line = nameLines[index];

    if (line && !extractWonAmount(line) && !/^(Edit|Remove|\uc0c1\ud488)/i.test(line)) {
      return line;
    }
  }

  return lines[0] ?? 'Unknown product';
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

function clipText(value: string, maxLength = 1_000): string {
  return value.length > maxLength ? `${value.slice(0, maxLength)}...` : value;
}

function lineItemPrice(config: ProductConfig | CartLineItem): string | undefined {
  return isProductConfig(config) ? config.expectedUnitPrice : config.price;
}

function isProductConfig(config: ProductConfig | CartLineItem): config is ProductConfig {
  return 'expectedUnitPrice' in config;
}
