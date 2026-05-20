import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { appPath, env } from '../fixtures/env.js';
import type { PaymentProfile } from '../fixtures/types.js';
import { OrderConfirmationPage } from './order-confirmation-page.js';

export class PaymentGatewayPage {
  readonly page: Page;
  private readonly knownOrderId?: string;

  constructor(page: Page, knownOrderId?: string) {
    this.page = page;
    this.knownOrderId = knownOrderId;
  }

  async captureOrderId(): Promise<string> {
    if (this.knownOrderId) {
      return this.knownOrderId;
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

  async gotoOrderDetails(orderId: string): Promise<OrderConfirmationPage> {
    await this.page.goto(appPath(`orders/${orderId}`));
    await this.page.waitForLoadState('domcontentloaded').catch(() => undefined);
    return new OrderConfirmationPage(this.page);
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
}

function extractOrderId(value: string): string | undefined {
  const decoded = decodeURIComponent(value);
  return decoded.match(/[A-Z]{2}-\d{10,}-[A-Za-z0-9-]+/)?.[0];
}
