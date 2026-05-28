import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { appPath, env } from '../fixtures/env.js';
import type { PaymentProfile } from '../fixtures/types.js';
import { OrderConfirmationPage } from './order-confirmation-page.js';

export type PaymentOrderReference = {
  orderNumber?: string;
  confirmationOrderId?: string;
  paymentFrom?: string;
};

export class PaymentGatewayPage {
  readonly page: Page;
  private readonly knownOrder?: PaymentOrderReference;

  constructor(page: Page, knownOrder?: string | PaymentOrderReference) {
    this.page = page;
    this.knownOrder = typeof knownOrder === 'string' ? { orderNumber: knownOrder } : knownOrder;
  }

  async captureOrderId(): Promise<string> {
    if (this.knownOrder?.orderNumber) {
      return this.knownOrder.orderNumber;
    }

    const urlOrderId = extractOrderId(this.page.url());
    if (urlOrderId) {
      return urlOrderId;
    }

    const bodyText = await this.page.locator('body').innerText({ timeout: 5_000 }).catch(() => '');
    const bodyOrderId = extractOrderId(bodyText);
    if (bodyOrderId) {
      return bodyOrderId;
    }

    throw new Error(`Could not capture orderId from payment page URL or body. Current URL: ${this.page.url()}`);
  }

  async captureConfirmationOrderId(): Promise<string> {
    if (this.knownOrder?.confirmationOrderId) {
      return this.knownOrder.confirmationOrderId;
    }

    const urlConfirmationOrderId = extractConfirmationOrderId(this.page.url());
    if (urlConfirmationOrderId) {
      return urlConfirmationOrderId;
    }

    const bodyText = await this.page.locator('body').innerText({ timeout: 5_000 }).catch(() => '');
    const bodyConfirmationOrderId = extractConfirmationOrderId(bodyText);
    if (bodyConfirmationOrderId) {
      return bodyConfirmationOrderId;
    }

    throw new Error(`Could not capture numeric confirmation order_id. Current URL: ${this.page.url()}`);
  }

  paymentProvider(): string | undefined {
    return this.knownOrder?.paymentFrom;
  }

  async gotoOrderConfirmation(orderId?: string): Promise<OrderConfirmationPage> {
    const confirmationOrderId = orderId ?? (await this.captureConfirmationOrderId());
    const confirmationUrl = appPath(`checkout/confirmation?order_id=${confirmationOrderId}`);
    const confirmationPage = await this.gotoConfirmationUrl(confirmationUrl);

    return new OrderConfirmationPage(confirmationPage);
  }

  async completeSandboxPayment(profile: PaymentProfile): Promise<OrderConfirmationPage> {
    await this.page.waitForLoadState('domcontentloaded').catch(() => undefined);

    await this.fillWhenConfigured(profile.selectors.cardNumber, profile.cardNumber);
    await this.fillWhenConfigured(profile.selectors.expiry, profile.expiry);
    await this.fillWhenConfigured(profile.selectors.cvc, profile.cvc);
    await this.fillWhenConfigured(profile.selectors.password, profile.password);
    await this.fillWhenConfigured(profile.selectors.birthDate, profile.birthDate);

    if (profile.selectors.confirm) {
      await this.page.locator(profile.selectors.confirm).click();
    } else {
      await this.clickFirstVisible([
        this.page.getByRole('button', { name: /결제|확인|완료|동의|Pay|Confirm|Submit/i }),
        this.page.getByText(/결제|확인|완료|Pay|Confirm/i)
      ]);
    }

    return new OrderConfirmationPage(this.page);
  }

  async completeTossBankTransfer(password = env.TOSS_BANK_TRANSFER_PASSWORD): Promise<OrderConfirmationPage> {
    await this.page.waitForLoadState('domcontentloaded').catch(() => undefined);

    for (const digit of password) {
      const digitButton = this.page.getByRole('button', { name: digit, exact: true }).first();

      if (await digitButton.isVisible().catch(() => false)) {
        await digitButton.click();
      } else {
        await this.page.keyboard.press(digit);
      }
    }

    await this.clickFirstVisible([
      this.page.getByRole('button', { name: /확인|완료|결제|다음|Pay|Confirm|Submit|Next/i }),
      this.page.getByText(/확인|완료|결제|Pay|Confirm/i)
    ]);

    await this.page.waitForLoadState('domcontentloaded').catch(() => undefined);
    return new OrderConfirmationPage(this.page);
  }

  private async fillWhenConfigured(selector: string | undefined, value: string | undefined): Promise<void> {
    if (!selector || !value) {
      return;
    }

    const field = this.page.locator(selector).first();
    await expect(field).toBeVisible();
    await field.fill(value);
  }

  private async clickFirstVisible(candidates: Locator[]): Promise<void> {
    for (const candidate of candidates) {
      const count = await candidate.count();
      for (let index = 0; index < count; index += 1) {
        const item = candidate.nth(index);
        if (await item.isVisible().catch(() => false)) {
          await item.click();
          return;
        }
      }
    }

    throw new Error('No visible sandbox payment confirmation control was found.');
  }

  private async gotoConfirmationUrl(url: string): Promise<Page> {
    try {
      await this.page.goto(url, { waitUntil: 'domcontentloaded' });
      return this.page;
    } catch (error) {
      if (!isNavigationAbort(error)) {
        throw error;
      }
    }

    const page = await this.page.context().newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    return page;
  }
}

function extractOrderId(value: string): string | undefined {
  const decoded = decodeURIComponent(value);
  return decoded.match(/[A-Z]{2}-\d{10,}-[A-Za-z0-9-]+/)?.[0];
}

function extractConfirmationOrderId(value: string): string | undefined {
  const decoded = decodeURIComponent(value);
  return decoded.match(/(?:order_id["'=:\s]+|\/orders\/)(\d{1,})/i)?.[1];
}

function isNavigationAbort(error: unknown): boolean {
  return error instanceof Error && /ERR_ABORTED|frame was detached|Target page, context or browser has been closed/i.test(error.message);
}
