import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import type { CheckoutProfile, ProductConfig } from '../fixtures/types.js';
import { PaymentGatewayPage } from './payment-gateway-page.js';

export class CheckoutPage {
  readonly page: Page;
  readonly main: Locator;

  constructor(page: Page) {
    this.page = page;
    this.main = page.getByRole('main');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/kr\/checkout\/?$/);
    await expect(this.main.getByRole('heading', { name: '연락처 정보' })).toBeVisible();
    await expect(this.main.getByRole('heading', { name: '결제 수단' })).toBeVisible();
    await expect(this.page.getByRole('complementary').filter({ hasText: 'Order Summary' })).toBeVisible();
  }

  async fillContactAndShipping(profile: CheckoutProfile): Promise<void> {
    await this.fillTextbox('이메일 주소를 입력해 주세요.', profile.email);
    await this.fillTextbox('성함', profile.fullName);
    if (profile.company) {
      await this.fillTextbox('회사명 (선택사항)', profile.company);
    }
    await this.fillTextbox('도로명 주소', profile.addressLine1);
    if (profile.addressLine2) {
      await this.fillTextbox('주소2를 입력해 주세요', profile.addressLine2);
    }
    await this.fillTextbox('우편번호', profile.postalCode);
    await this.fillTextbox('연락처', profile.phone);
  }

  async selectStandardShipping(): Promise<void> {
    await this.main.getByRole('button', { name: /Standard Shipping/ }).click();
  }

  async selectPaymentMethod(method: string): Promise<void> {
    await this.main.getByRole('button', { name: new RegExp(method, 'i') }).click();
  }

  async expectOrderSummary(config: ProductConfig): Promise<void> {
    const summary = this.page.getByRole('complementary').filter({ hasText: 'Order Summary' });

    await expect(summary).toContainText(config.productName);
    await expect(summary).toContainText(`${config.widthMm}x ${config.heightMm}mm ${config.quantity}개`);
    await expect(summary).toContainText(config.expectedUnitPrice);
    await expect(summary).toContainText(config.expectedCheckoutTotal);
  }

  async placeOrder(): Promise<PaymentGatewayPage> {
    const popupPromise = this.page.waitForEvent('popup', { timeout: 5_000 }).catch(() => null);

    await this.page.getByRole('button', { name: '결제 완료' }).click();

    const popup = await popupPromise;
    const paymentPage = popup ?? this.page;
    await paymentPage.waitForLoadState('domcontentloaded').catch(() => undefined);

    return new PaymentGatewayPage(paymentPage);
  }

  private async fillTextbox(name: string, value: string): Promise<void> {
    const input = this.main.getByRole('textbox', { name }).first();
    await expect(input).toBeVisible();
    await input.fill(value);
  }
}
