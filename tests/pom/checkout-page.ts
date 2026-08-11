import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { appPath } from '../fixtures/env.js';
import { ko } from '../fixtures/storefront-data.js';

export class CheckoutV2Page {
  readonly page: Page;
  readonly payButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.payButton = page.getByRole('button', { name: ko.payNow });
  }

  async goto(): Promise<void> {
    await this.page.goto(appPath('./checkout'));
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
}
