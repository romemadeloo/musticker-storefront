import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { appPath } from '../fixtures/env.js';
import { gotoStorefront } from '../fixtures/navigation.js';
import { ko } from '../fixtures/storefront-data.js';

export class CheckoutV2Page {
  readonly page: Page;
  readonly payButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.payButton = page.getByRole('button', { name: ko.payNow });
  }

  async goto(): Promise<void> {
    await gotoStorefront(this.page, appPath('./checkout'));
    await expect(this.page.locator('body')).toContainText(ko.secureCheckout);
  }

  async expectCheckoutFormRenders(): Promise<void> {
    const body = this.page.locator('body');

    await expect(this.page.getByPlaceholder(ko.checkoutEmailPlaceholder).first()).toBeVisible();
    await expect(this.page.getByPlaceholder(ko.checkoutNamePlaceholder).first()).toBeVisible();
    await expect(this.page.getByPlaceholder(ko.checkoutPostalCodePlaceholder).first()).toBeVisible();
    await expect(this.page.getByRole('button', { name: '카카오페이' }).first()).toBeVisible();
    await expect(this.page.getByRole('button', { name: '신용카드' }).first()).toBeVisible();
    await expect(body).toContainText(ko.coupon);
    await expect(this.payButton).toBeVisible();
  }

  // No coupon-code input was found on the anonymous checkout page as of 2026-08-11 (only a
  // static "coupon discount" summary line). This asserts the safer, verified behavior instead:
  // submitting with required shipping/contact fields blank must not create an order or advance
  // past the payment step. Confirmed via network capture that no order/payment-mutating request
  // fires on a blank submit attempt, so that absence is the assertion instead of a specific
  // validation-message locator (the page renders 14 `.error-text` nodes at all times, most
  // hidden, which made a "some error text is visible" check unreliable).
  async expectBlankSubmissionBlocked(): Promise<void> {
    const orderMutationRequests: string[] = [];
    this.page.on('request', (request) => {
      if (request.method() !== 'GET' && /\/sys\/kr\/(?:order|payment|checkout)\//i.test(request.url())) {
        orderMutationRequests.push(`${request.method()} ${request.url()}`);
      }
    });

    await this.payButton.click();
    await this.page.waitForTimeout(1_000);

    await expect(this.page).toHaveURL(/\/kr\/checkout\/?$/);
    await expect(this.payButton).toBeVisible();
    expect(orderMutationRequests, 'blank submission should not create an order or payment').toEqual([]);
  }

  // Filling the guest email immediately fires a verification-email send and opens a full-page
  // `.auth-verification-modal` overlay that blocks every other checkout control (including the
  // payment-method tiles and pay button) until the OTP is entered. Verified live on
  // development-3 on 2026-08-13.
  async fillGuestEmailAndAwaitOtpModal(email: string): Promise<void> {
    // `input[type="email"]` alone can match a second, hidden email input elsewhere on the page
    // (e.g. an inquiry dialog) depending on hydration timing, so scope to the visible checkout
    // field the same way expectCheckoutFormRenders does.
    const emailInput = this.page.getByPlaceholder(ko.checkoutEmailPlaceholder).first();

    // A Vue hydration race (or a delayed guest-session restore) can silently wipe a fill some time
    // after it lands, leaving the input empty with no error. Wait past that window and re-check
    // before trusting the value, retrying the whole fill if it got reset.
    await expect(async () => {
      await emailInput.fill(email);
      await emailInput.blur();
      await this.page.waitForTimeout(3_000);
      await expect(emailInput).toHaveValue(email, { timeout: 2_000 });
    }).toPass({ timeout: 30_000 });

    await expect(this.page.locator('.auth-verification-modal')).toBeVisible({ timeout: 20_000 });
  }

  async submitOtpCode(code: string): Promise<void> {
    const modal = this.page.locator('.auth-verification-modal');
    const inputs = modal.locator('input');
    const digits = code.split('');

    for (let index = 0; index < digits.length; index += 1) {
      await inputs.nth(index).fill(digits[index]);
    }

    await modal.getByRole('button', { name: ko.otpConfirm }).click();
    await expect(modal).toBeHidden({ timeout: 10_000 });
  }

  async fillShippingDetails(details: {
    fullName: string;
    postalCode: string;
    phone: readonly [string, string, string];
    province: string;
    city: string;
    streetAddress: string;
    detailAddress: string;
  }): Promise<void> {
    await this.page.getByPlaceholder(ko.checkoutNamePlaceholder).fill(details.fullName);
    await this.page.getByPlaceholder(ko.checkoutPostalCodePlaceholder).fill(details.postalCode);
    await this.page.locator('input[name="phone-1"]').fill(details.phone[0]);
    await this.page.locator('input[name="phone-2"]').fill(details.phone[1]);
    await this.page.locator('input[name="phone-3"]').fill(details.phone[2]);
    await this.page.getByPlaceholder('시/도를 입력하세요').fill(details.province);
    await this.page.getByPlaceholder('시/군/구를 입력하세요').fill(details.city);
    await this.page.getByPlaceholder('주소를 입력해주세요', { exact: true }).fill(details.streetAddress);
    await this.page.getByPlaceholder('상세 주소를 입력해주세요').fill(details.detailAddress);
  }

  async selectKakaoPay(): Promise<void> {
    await this.page.getByText(ko.kakaoPay, { exact: false }).first().click();
  }

  // The pay button opens the KakaoPay gateway (a real "PayApp — Local Mock" sandbox page on dev
  // environments) in a popup window.
  async submitPaymentAndAwaitPayAppPopup(): Promise<Page> {
    // The pay button carries a real `disabled` attribute, and the order-summary shipping-fee/total
    // rows render as `.ui-skeleton` placeholders, until an async shipping-cost recalculation
    // (triggered by the address fields) finishes. Clicking while that's in flight is a silent
    // no-op (no popup, no error) rather than a rejected click, so wait for both signals to clear
    // first instead of relying on click()'s own actionability retry.
    await expect(this.page.locator('.checkout-summary-line .ui-skeleton')).toHaveCount(0, { timeout: 30_000 });
    await expect(this.payButton).toBeEnabled({ timeout: 30_000 });

    const [popup] = await Promise.all([this.page.waitForEvent('popup', { timeout: 30_000 }), this.payButton.click()]);
    return popup;
  }

  // Clicking the mock's "Complete card payment" button closes the popup itself and fires the
  // payment webhook that redirects the original checkout tab to the order-confirmation page.
  async completePayAppMockCardPayment(popup: Page): Promise<void> {
    await popup.getByRole('button', { name: 'Complete card payment' }).click();
    await popup.waitForEvent('close', { timeout: 15_000 }).catch(() => undefined);
  }
}
