import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

import type { OrderRecord, ProductConfig } from '../fixtures/types';

export class OrderConfirmationPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/order|checkout|payment|success|complete|confirm/i);
    await expect(this.page.getByText(/주문|결제|완료|확인|Order|Payment|Confirmed/i).first()).toBeVisible({
      timeout: 30_000
    });
  }

  async expectOrderSummary(config: ProductConfig): Promise<void> {
    await expect(this.page.getByText(config.productName).first()).toBeVisible();
    await expect(this.page.getByText(config.expectedCheckoutTotal).first()).toBeVisible();
  }

  async captureOrderRecord(runMarker: string, config: ProductConfig): Promise<OrderRecord> {
    const bodyText = (await this.page.locator('body').innerText()).replace(/\s+/g, ' ');
    const orderNumber = bodyText.match(/(?:주문번호|Order\s*#?|Order\s*Number)[:\s#-]*([A-Z0-9-]{6,})/i)?.[1];

    return {
      orderNumber,
      runMarker,
      productName: config.productName,
      total: config.expectedCheckoutTotal
    };
  }
}
