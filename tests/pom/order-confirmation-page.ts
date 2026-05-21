import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

import type { CheckoutSnapshot, OrderRecord, ProductConfig } from '../fixtures/types.js';

export class OrderConfirmationPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/order|payment|success|complete|confirm/i);
    await expect(this.page.getByText(/주문|결제|완료|확인|Order|Payment|Confirmed/i).first()).toBeVisible({
      timeout: 30_000
    });
  }

  async expectOrderSummary(config: ProductConfig): Promise<void> {
    const bodyText = await this.normalizedBodyText();

    if (bodyText.includes(config.productName)) {
      await expect(this.page.getByText(config.productName).first()).toBeVisible();
    }

    expect(bodyText).toMatch(amountPattern(config.expectedCheckoutTotal));
  }

  async expectMatchesCheckoutSnapshot(snapshot: CheckoutSnapshot): Promise<void> {
    await expect
      .poll(
        async () => {
          const text = await this.normalizedBodyText();
          return snapshot.products.every((product) => text.includes(product.productName));
        },
        {
          message: 'Order confirmation did not render all checkout products.',
          timeout: 45_000
        }
      )
      .toBe(true);

    const bodyText = await this.normalizedBodyText();

    for (const product of snapshot.products) {
      await expect(this.page.getByText(product.productName).first()).toBeVisible();

      if (product.widthMm && product.heightMm) {
        expect(bodyText).toMatch(new RegExp(`${product.widthMm}x\\s*${product.heightMm}mm`));
      }

      if (product.quantity) {
        expect(bodyText).toMatch(new RegExp(`\\b${product.quantity.toLocaleString('en-US')}\\b|${product.quantity}개`));
      }
    }

    if (snapshot.total) {
      expect(bodyText).toMatch(amountPattern(snapshot.total));
    }

    if (snapshot.subtotal) {
      expect(bodyText).toMatch(amountPattern(snapshot.subtotal));
    }

    if (snapshot.shipping) {
      expect(bodyText).toMatch(amountPattern(snapshot.shipping));
    }

    if (snapshot.discount) {
      expect(bodyText).toMatch(amountPattern(snapshot.discount));
    }
  }

  async captureOrderRecord(runMarker: string, config: ProductConfig): Promise<OrderRecord> {
    const bodyText = await this.normalizedBodyText();
    const orderNumber = bodyText.match(/(?:주문번호|Order\s*#?|Order\s*Number)[:\s#-]*([A-Z0-9-]{6,})/i)?.[1];

    return {
      orderNumber,
      runMarker,
      productName: config.productName,
      total: config.expectedCheckoutTotal
    };
  }

  private async normalizedBodyText(): Promise<string> {
    return (await this.page.locator('body').innerText()).replace(/\s+/g, ' ');
  }
}

function amountPattern(amount: string): RegExp {
  const normalized = amount.replace(/\s+/g, '');
  const isNegative = normalized.startsWith('-');
  const digits = normalized.replace(/[^\d]/g, '');
  const withCommas = Number(digits).toLocaleString('en-US');
  const sign = isNegative ? '-?' : '';

  return new RegExp(`${sign}(?:${escapeRegExp(withCommas)}원|₩\\s*${escapeRegExp(withCommas)}|${escapeRegExp(withCommas)})`);
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
