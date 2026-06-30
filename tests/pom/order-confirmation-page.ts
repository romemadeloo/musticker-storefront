import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

import type { CheckoutSnapshot, OrderRecord, ProductConfig } from '../fixtures/types.js';

type CheckoutSnapshotExpectationOptions = {
  allowServerRepricedTotal?: boolean;
};

export class OrderConfirmationPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectLoaded(): Promise<void> {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      if (await this.hasLoadedMarker()) {
        return;
      }

      if (await this.isTransientServerErrorPage()) {
        await this.page.reload({ waitUntil: 'domcontentloaded' }).catch(() => undefined);
        await retryDelay(1_000);
      }
    }

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

  async expectMatchesCheckoutSnapshot(
    snapshot: CheckoutSnapshot,
    options: CheckoutSnapshotExpectationOptions = {}
  ): Promise<void> {
    await expect
      .poll(
        async () => {
          const text = await this.normalizedBodyText();
          return Math.max(await this.confirmedProductImageCount(), countConfirmedProductOptions(text));
        },
        {
          message: 'Order confirmation did not render enough checkout item rows.',
          timeout: 45_000
        }
      )
      .toBeGreaterThanOrEqual(snapshot.products.length);

    const bodyText = await this.normalizedBodyText();
    const presentProductNames = [
      ...new Set(snapshot.products.map((product) => product.productName).filter((productName) => bodyText.includes(productName)))
    ];

    for (const productName of presentProductNames) {
      await expect(this.page.getByText(productName).first()).toBeVisible();
    }

    for (const product of snapshot.products) {
      if (product.widthMm && product.heightMm) {
        expect(bodyText).toMatch(new RegExp(`${product.widthMm}x\\s*${product.heightMm}mm`));
      }

      if (product.quantity) {
        expect(bodyText).toMatch(new RegExp(`\\b${product.quantity.toLocaleString('en-US')}\\b|${product.quantity}개`));
      }
    }

    if (options.allowServerRepricedTotal) {
      expectMonetarySummaryIsConsistent(bodyText, snapshot.products.length);
      return;
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

  private async confirmedProductImageCount(): Promise<number> {
    return this.page.locator('img[alt^="product.items."]').count().catch(() => 0);
  }

  private async hasLoadedMarker(): Promise<boolean> {
    const hasExpectedUrl = /order|payment|success|complete|confirm/i.test(this.page.url());
    const hasMarker = await this.page
      .getByText(/\uc8fc\ubb38|\uacb0\uc81c|\uc644\ub8cc|\ud655\uc778|Order|Payment|Confirmed/i)
      .first()
      .waitFor({ state: 'visible', timeout: 5_000 })
      .then(() => true)
      .catch(() => false);

    return hasExpectedUrl && hasMarker;
  }

  private async isTransientServerErrorPage(): Promise<boolean> {
    const bodyText = await this.normalizedBodyText().catch(() => '');

    return /500|Internal Server Error|Failed to fetch|navigation\/categories/i.test(bodyText);
  }
}

async function retryDelay(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

function amountPattern(amount: string): RegExp {
  const normalized = amount.replace(/\s+/g, '');
  const isNegative = normalized.startsWith('-');
  const digits = normalized.replace(/[^\d]/g, '');
  const withCommas = Number(digits).toLocaleString('en-US');
  const sign = isNegative ? '-?' : '';

  return new RegExp(`${sign}(?:${escapeRegExp(withCommas)}원|₩\\s*${escapeRegExp(withCommas)}|${escapeRegExp(withCommas)})`);
}

function countConfirmedProductOptions(text: string): number {
  return [...text.matchAll(/\b\d+(?:\.\d+)?x\s*\d+(?:\.\d+)?mm\s*\/\s*\d+\b/gi)].length;
}

function expectMonetarySummaryIsConsistent(bodyText: string, productCount: number): void {
  const amounts = [...bodyText.matchAll(/-?[\d,]+\uc6d0/g)].map((match) => amountToNumber(match[0]));
  const itemAmounts = amounts.slice(0, productCount);
  const subtotal = extractLastLabeledAmountNumber(bodyText, /\uc18c\uacc4|Subtotal/i);
  const shipping = extractLastLabeledAmountNumber(bodyText, /\ubc30\uc1a1\ube44|Shipping/i) ?? 0;
  const discount = extractLastLabeledAmountNumber(bodyText, /\ud560\uc778 \uae08\uc561|Discount/i) ?? 0;
  const total = extractLastLabeledAmountNumber(bodyText, /\ud569\uacc4|Total/i);

  expect(itemAmounts, 'confirmation should expose one price per ordered item').toHaveLength(productCount);
  expect(subtotal, 'confirmation should expose a subtotal').toBeDefined();
  expect(total, 'confirmation should expose a total').toBeDefined();

  if (subtotal !== undefined) {
    expect(itemAmounts.reduce((sum, amount) => sum + amount, 0), 'confirmation subtotal should equal item prices').toBe(
      subtotal
    );
  }

  if (subtotal !== undefined && total !== undefined) {
    expect(total, 'confirmation total should equal subtotal plus shipping and discount').toBe(subtotal + shipping + discount);
  }
}

function extractLastLabeledAmountNumber(text: string, label: RegExp): number | undefined {
  const normalized = text.replace(/\s+/g, ' ');
  const matches = [
    ...normalized.matchAll(
      new RegExp(`(?:${label.source})\\s*(-?[\\d,]+\uc6d0)`, label.flags.includes('g') ? label.flags : `${label.flags}g`)
    )
  ];
  const amount = matches.at(-1)?.[1];

  return amount ? amountToNumber(amount) : undefined;
}

function amountToNumber(amount: string): number {
  return Number(amount.replace(/[^\d-]/g, ''));
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
