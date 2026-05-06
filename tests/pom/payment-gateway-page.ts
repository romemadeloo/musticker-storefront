import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import type { PaymentProfile } from '../fixtures/types';
import { OrderConfirmationPage } from './order-confirmation-page';

export class PaymentGatewayPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
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

    await this.page.waitForLoadState('networkidle').catch(() => undefined);
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
