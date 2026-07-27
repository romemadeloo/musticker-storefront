import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import type { CartLineItem, CheckoutProfile, CheckoutSnapshot, ProductConfig } from '../fixtures/types.js';
import { PaymentGatewayPage, type PaymentOrderReference } from './payment-gateway-page.js';

const provinceLabel = /\uc2dc\/\ub3c4|Province|State/i;
const couponLabel = /\ucfe0\ud3f0|coupon/i;
const fullNameLabel = /\uc131\ud568|Full name|Name/i;

export class CheckoutPage {
  readonly page: Page;
  readonly main: Locator;

  constructor(page: Page) {
    this.page = page;
    this.main = page.getByTestId('checkout-member-page').or(page.getByRole('main').first()).first();
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/kr\/checkout\/?$/);
    await expect(this.summary()).toBeVisible();
  }

  async fillContactAndShipping(profile: CheckoutProfile): Promise<void> {
    const fullNameInput = this.textbox(fullNameLabel);
    const hasEditableShippingForm = await fullNameInput
      .waitFor({ state: 'visible', timeout: 2_000 })
      .then(() => true)
      .catch(() => false);

    if (!hasEditableShippingForm) {
      return;
    }

    await this.fillOptionalTextbox(/\uc774\uba54\uc77c|Email/i, profile.email);
    if (!(await this.fillTextboxLocatorIfVisible(fullNameInput, profile.fullName))) {
      return;
    }

    if (profile.company) {
      await this.fillOptionalTextbox(/\ud68c\uc0ac|Company/i, profile.company);
    }

    await this.selectProvince(profile.province);
    if (!(await this.fillTextboxIfVisible(/\uc2dc\/\uad70\/\uad6c|City|District/i, profile.city ?? '\uac15\ub0a8\uad6c'))) {
      return;
    }

    if (!(await this.fillTextboxIfVisible(/\ub3c4\ub85c\uba85|\uc8fc\uc18c \ub77c\uc778 1|Address line 1|Address/i, profile.addressLine1))) {
      return;
    }

    if (profile.addressLine2) {
      await this.fillOptionalTextbox(/\uc8fc\uc18c2|\uc8fc\uc18c \ub77c\uc778 2|Address line 2|Apartment/i, profile.addressLine2);
    }

    if (!(await this.fillTextboxIfVisible(/\uc6b0\ud3b8\ubc88\ud638|Postal|ZIP/i, profile.postalCode))) {
      return;
    }

    await this.fillTextboxIfVisible(/\uc5f0\ub77d\ucc98|\ud734\ub300\ud3f0|\uc804\ud654\ubc88\ud638|Phone/i, profile.phone);
  }

  async selectStandardShipping(): Promise<void> {
    const standardShipping = this.main.getByRole('button', { name: /Standard Shipping/ }).first();
    if (await standardShipping.isVisible().catch(() => false)) {
      await standardShipping.click();
    }
  }

  async selectPaymentMethod(method: string): Promise<void> {
    const button = this.main.getByRole('button', { name: new RegExp(method, 'i') }).first();

    await expect(button).toBeVisible();
    await button.scrollIntoViewIfNeeded();
    await button.click();
  }

  async selectBankTransfer(): Promise<void> {
    await this.selectPaymentMethod('Bank Transfer|무통장|가상계좌|계좌이체');
  }

  async applyPointsAndCouponsIfAvailable(): Promise<string> {
    const notes = [await this.applyPointsIfAvailable(), await this.applyCouponIfAvailable()].filter(
      (note): note is string => Boolean(note)
    );

    return notes.length ? notes.join('; ') : 'No points/coupons available';
  }

  async expectOrderSummary(config: ProductConfig): Promise<void> {
    const summary = this.summary();

    await expect(summary).toContainText(config.productName);
    await expect(summary).toContainText(`${config.widthMm}x ${config.heightMm}mm ${config.quantity}\uac1c`);
    await expect(summary).toContainText(config.expectedUnitPrice);
    await expect(summary).toContainText(config.expectedCheckoutTotal);
  }

  async expectCartItems(products: CartLineItem[]): Promise<void> {
    const summary = this.summary();
    const summaryText = await summary.innerText();

    for (const product of products) {
      await expect(summary).toContainText(product.productName);

      if (product.widthMm && product.heightMm && product.quantity) {
        expect(summaryText.replace(/\s+/g, ' ')).toMatch(
          new RegExp(
            `${escapeRegExp(String(product.widthMm))}\\s*(?:x|×)\\s*${escapeRegExp(String(product.heightMm))}mm[\\s\\S]*${product.quantity}(?:\\s*\\S+)?`
          )
        );
      }
    }
  }

  async captureSnapshot(products: CartLineItem[], pointsAndCouponsNote: string): Promise<CheckoutSnapshot> {
    const summaryText = await this.summary().innerText();
    const pageText = await this.main.innerText();

    return {
      products,
      summaryText,
      subtotal: extractLabeledAmount(summaryText, /\uc18c\uacc4|Subtotal/i),
      shipping: extractLabeledAmount(summaryText, /\ubc30\uc1a1\ube44|Shipping/i),
      discount: extractLabeledAmount(summaryText, /\ud560\uc778 \uae08\uc561|Discount/i),
      total: extractLastLabeledAmount(summaryText, /\ud569\uacc4|Total/i),
      shippingDate: pageText.match(/\uc608\uc0c1 \ubc30\uc1a1\uc77c:\s*([^\n]+)/)?.[1]?.trim(),
      pointsAndCouponsNote
    };
  }

  async placeOrder(): Promise<PaymentGatewayPage> {
    const popupPromise = this.page.waitForEvent('popup', { timeout: 5_000 }).catch(() => null);
    const orderResponsePromise = this.page
      .waitForResponse(
        (response) =>
          response.request().method() === 'POST' &&
          /\/sys\/kr\/orders\/checkout\b/i.test(response.url()) &&
          response.status() < 500,
        { timeout: 15_000 }
      )
      .catch(() => null);

    const submitButton = this
      .summary()
      .locator('button.checkout-summary-submit')
      .or(this.summary().getByRole('button', { name: /\uacb0\uc81c \uc644\ub8cc|\uacb0\uc81c\ud558\uae30|\uc8fc\ubb38\ud558\uae30|Place order|Order|Pay/i }))
      .first();

    await expect(submitButton).toBeVisible();
    await submitButton.click();

    const [popup, orderResponse] = await Promise.all([popupPromise, orderResponsePromise]);
    const orderResponseText = await orderResponse?.text().catch(() => undefined);
    const paymentPage = popup ?? this.page;
    await paymentPage.waitForLoadState('domcontentloaded').catch(() => undefined);

    return new PaymentGatewayPage(paymentPage, extractPaymentOrderReference(orderResponseText));
  }

  private summary(): Locator {
    return this.page.getByRole('complementary').filter({ hasText: /\uc8fc\ubb38 \uc694\uc57d|Order Summary/ });
  }

  private async fillTextboxIfVisible(name: RegExp, value: string): Promise<boolean> {
    return this.fillTextboxLocatorIfVisible(this.textbox(name), value);
  }

  private async fillOptionalTextbox(name: RegExp, value: string): Promise<boolean> {
    return this.fillTextboxLocatorIfVisible(this.textbox(name), value, 5_000);
  }

  private async fillTextboxLocatorIfVisible(input: Locator, value: string, fillTimeout = 15_000): Promise<boolean> {
    const visible = await input
      .waitFor({ state: 'visible', timeout: 2_000 })
      .then(() => true)
      .catch(() => false);

    if (!visible) {
      return false;
    }

    try {
      if (await input.isEditable().catch(() => false)) {
        await input.fill(value, { timeout: fillTimeout });
      } else if (!(await this.fillChildInputs(input, value, fillTimeout))) {
        return false;
      }
    } catch (error) {
      if (isOptionalFillInterruption(error)) {
        return false;
      }

      throw error;
    }

    return true;
  }

  private async fillChildInputs(container: Locator, value: string, fillTimeout: number): Promise<boolean> {
    const inputs = container.locator('input, textarea, [contenteditable="true"]');
    const inputCount = await inputs.count();

    if (inputCount === 0) {
      return false;
    }

    const phoneParts = phoneNumberParts(value, inputCount);
    if (phoneParts) {
      for (let index = 0; index < phoneParts.length; index += 1) {
        await inputs.nth(index).fill(phoneParts[index] ?? '', { timeout: fillTimeout });
      }

      return true;
    }

    await inputs.first().fill(value, { timeout: fillTimeout });
    return true;
  }

  private textbox(name: RegExp): Locator {
    return this.main.getByRole('textbox', { name }).or(this.main.getByPlaceholder(name)).first();
  }

  private async selectProvince(province = '\uc11c\uc6b8\ud2b9\ubcc4\uc2dc'): Promise<void> {
    const provinceTextbox = this.textbox(provinceLabel);
    if (await provinceTextbox.isVisible().catch(() => false)) {
      await provinceTextbox.fill(province);
      return;
    }

    const button = this.main.getByRole('button', { name: provinceLabel }).first();

    if (!(await button.isVisible().catch(() => false))) {
      return;
    }

    if ((await button.innerText().catch(() => '')).includes(province)) {
      return;
    }

    await button.click();

    const listbox = this.page.getByRole('listbox').last();
    const opened = await listbox
      .waitFor({ state: 'visible', timeout: 5_000 })
      .then(() => true)
      .catch(() => false);

    if (!opened) {
      const option = this.page.getByRole('option', { name: new RegExp(escapeRegExp(province)) }).first();
      await expect(option).toBeVisible();
      await option.click();
      return;
    }

    await this.clickSelectOption(listbox, province);
    await expect(listbox).toBeHidden({ timeout: 5_000 }).catch(() => undefined);
  }

  private async clickSelectOption(container: Locator, preferredValue: string): Promise<void> {
    const preferredButton = container.getByRole('button', { name: new RegExp(escapeRegExp(preferredValue)) }).first();

    if (await preferredButton.isVisible().catch(() => false)) {
      await preferredButton.click();
      return;
    }

    const preferredText = container.getByText(preferredValue, { exact: false }).first();
    if (await preferredText.isVisible().catch(() => false)) {
      await preferredText.click();
      return;
    }

    const buttons = container.getByRole('button');
    const buttonCount = await buttons.count();
    for (let index = 0; index < buttonCount; index += 1) {
      const button = buttons.nth(index);

      if ((await button.isVisible().catch(() => false)) && (await button.isEnabled().catch(() => false))) {
        await button.click();
        return;
      }
    }

    const option = container.locator('[role="option"], li, [data-radix-collection-item]').filter({ hasText: /\S/ }).first();
    await expect(option).toBeVisible();
    await option.click();
  }

  private async applyPointsIfAvailable(): Promise<string | undefined> {
    const hasPointArea = await this.main
      .getByText(/\ud3ec\uc778\ud2b8|point/i)
      .first()
      .isVisible()
      .catch(() => false);

    if (!hasPointArea) {
      return undefined;
    }

    const buttons = this.main.getByRole('button', {
      name: /\ud3ec\uc778\ud2b8|point|\uc804\uc561|\uc804\uccb4|\ubaa8\ub450|\uc801\uc6a9|\uc0ac\uc6a9|Apply|Use/i
    });
    const count = await buttons.count();

    for (let index = 0; index < count; index += 1) {
      const button = buttons.nth(index);
      const label = (await button.innerText().catch(() => '')).trim();

      if (this.isCheckoutOrCouponButton(label)) {
        continue;
      }

      if ((await button.isVisible().catch(() => false)) && (await button.isEnabled().catch(() => false))) {
        await button.click();
        return `Points control used: ${label || `points-button-${index + 1}`}`;
      }
    }

    return 'No points available';
  }

  private async applyCouponIfAvailable(): Promise<string | undefined> {
    const selectControl = this.main.getByText(/^Select$/i).first();

    if ((await selectControl.isVisible().catch(() => false)) && (await selectControl.isEnabled().catch(() => false))) {
      await selectControl.click();
      const dialogResult = await this.handleCouponDialog('Select');

      if (dialogResult) {
        return dialogResult;
      }
    }

    const buttons = this.main.getByRole('button', { name: couponLabel });
    const count = await buttons.count();

    for (let index = 0; index < count; index += 1) {
      const button = buttons.nth(index);
      const label = (await button.innerText().catch(() => '')).trim();

      if ((await button.isVisible().catch(() => false)) && (await button.isEnabled().catch(() => false))) {
        await button.click();
        return (await this.handleCouponDialog(label)) ?? `Coupon control used: ${label || `coupon-button-${index + 1}`}`;
      }
    }

    return 'No coupons available';
  }

  private async handleCouponDialog(label: string): Promise<string | undefined> {
    const dialog = this.page.getByRole('dialog').filter({ hasText: couponLabel }).first();
    const opened = await dialog
      .waitFor({ state: 'visible', timeout: 1_500 })
      .then(() => true)
      .catch(() => false);

    if (!opened) {
      return undefined;
    }

    const actionLabel = await this.clickFirstCouponAction(dialog);

    if (actionLabel) {
      return `Coupon selected: ${actionLabel}`;
    }

    await this.closeDialog(dialog);
    return `${label} opened coupon modal; no coupons available`;
  }

  private async clickFirstCouponAction(dialog: Locator): Promise<string | undefined> {
    const buttons = dialog.getByRole('button', { name: /\uc801\uc6a9|\uc0ac\uc6a9|\uc120\ud0dd|Apply|Use|Select/i });
    const count = await buttons.count();

    for (let index = 0; index < count; index += 1) {
      const button = buttons.nth(index);
      const label = (await button.innerText().catch(() => '')).trim();

      if (/\ucde8\uc18c|\ub2eb\uae30|Cancel|Close/i.test(label)) {
        continue;
      }

      if ((await button.isVisible().catch(() => false)) && (await button.isEnabled().catch(() => false))) {
        await button.click();
        await dialog.waitFor({ state: 'hidden', timeout: 5_000 }).catch(() => undefined);
        return label || `coupon-action-${index + 1}`;
      }
    }

    return undefined;
  }

  private async closeDialog(dialog: Locator): Promise<void> {
    const closeButtons = dialog.getByRole('button', { name: /\ub2eb\uae30|\ucde8\uc18c|Close|Cancel|\u00d7/i });
    const count = await closeButtons.count();

    for (let index = 0; index < count; index += 1) {
      const button = closeButtons.nth(index);

      if ((await button.isVisible().catch(() => false)) && (await button.isEnabled().catch(() => false))) {
        await button.click();
        await dialog.waitFor({ state: 'hidden', timeout: 5_000 }).catch(() => undefined);
        return;
      }
    }

    await this.page.keyboard.press('Escape').catch(() => undefined);
  }

  private isCheckoutOrCouponButton(label: string): boolean {
    return /\ucfe0\ud3f0|coupon|\uacb0\uc81c|checkout|order|pay|\ubc30\uc1a1|shipping/i.test(label);
  }
}

function extractLabeledAmount(text: string, label: RegExp): string | undefined {
  const normalized = text.replace(/\s+/g, ' ');
  const match = normalized.match(new RegExp(`(?:${label.source})\\s*(-?[\\d,]+\\uc6d0)`, label.flags));
  return match?.[1];
}

function extractLastLabeledAmount(text: string, label: RegExp): string | undefined {
  const normalized = text.replace(/\s+/g, ' ');
  const matches = [
    ...normalized.matchAll(
      new RegExp(`(?:${label.source})\\s*(-?[\\d,]+\\uc6d0)`, label.flags.includes('g') ? label.flags : `${label.flags}g`)
    )
  ];
  return matches.at(-1)?.[1];
}

function extractOrderId(value: string | undefined): string | undefined {
  return value?.match(/[A-Z]{2}-\d{10,}-[A-Za-z0-9-]+/)?.[0];
}

function extractPaymentOrderReference(value: string | undefined): PaymentOrderReference {
  const parsed = parseCheckoutResponse(value);
  const order = parsed?.data?.order;
  const paymentInformation = parsed?.data?.payment_information;
  const paymentFrom = paymentInformation?.from;

  return {
    orderNumber: typeof order?.order_number === 'string' ? order.order_number : extractOrderId(value),
    confirmationOrderId:
      typeof order?.id === 'number' || typeof order?.id === 'string' ? String(order.id) : extractConfirmationOrderId(value),
    paymentFrom: typeof paymentFrom === 'string' ? paymentFrom : undefined,
    redirectUrl: typeof paymentInformation?.redirect_url === 'string' ? paymentInformation.redirect_url : undefined,
    mulNo: typeof paymentInformation?.mul_no === 'string' ? paymentInformation.mul_no : undefined,
    var1Data: typeof paymentInformation?.var1_data === 'string' ? paymentInformation.var1_data : undefined
  };
}

function parseCheckoutResponse(
  value: string | undefined
): {
  data?: {
    order?: { id?: number | string; order_number?: string };
    payment_information?: { from?: string; redirect_url?: string; mul_no?: string; var1_data?: string };
  };
} | undefined {
  if (!value) {
    return undefined;
  }

  try {
    return JSON.parse(value) as {
      data?: {
        order?: { id?: number | string; order_number?: string };
        payment_information?: { from?: string; redirect_url?: string; mul_no?: string; var1_data?: string };
      };
    };
  } catch {
    return undefined;
  }
}

function phoneNumberParts(value: string, expectedParts: number): string[] | undefined {
  const digits = value.replace(/\D/g, '');

  if (expectedParts < 2 || !digits) {
    return undefined;
  }

  if (expectedParts === 3 && digits.length >= 10) {
    const middleLength = digits.length === 10 ? 3 : 4;
    return [digits.slice(0, 3), digits.slice(3, 3 + middleLength), digits.slice(3 + middleLength)];
  }

  return undefined;
}

function extractConfirmationOrderId(value: string | undefined): string | undefined {
  return value?.match(/"id"\s*:\s*(\d+)/)?.[1];
}

function isOptionalFillInterruption(error: unknown): boolean {
  return (
    error instanceof Error &&
    /Timeout|detached from the DOM|not visible|not enabled|not editable|Target page, context or browser has been closed/i.test(
      error.message
    )
  );
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
