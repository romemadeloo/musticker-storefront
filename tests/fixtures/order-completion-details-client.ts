import type { APIRequestContext } from '@playwright/test';
import { expect } from '@playwright/test';

import { env } from './env.js';
import type { CheckoutSnapshot } from './types.js';

type OrderPaymentSummary = {
  subtotal_cost?: number | string;
  shipping_cost?: number | string;
  points_discount?: number | string;
  coupon_discount?: number | string;
  total_cost?: number | string;
  payment_method_name?: string;
};

type OrderProductionDetail = {
  min_delivery_date?: string;
  max_delivery_date?: string;
};

type OrderCompletionCartItem = {
  product?: string;
  width?: string;
  height?: string;
  quantity?: number | string;
  cost?: number | string;
};

type OrderCompletionItem = {
  cart_item?: OrderCompletionCartItem;
};

export type OrderCompletionDetails = {
  id?: number | string;
  order_number?: string;
  items_count?: number | string;
  payment_summary?: OrderPaymentSummary;
  order_production_detail?: OrderProductionDetail;
  order_items?: OrderCompletionItem[];
};

type OrderCompletionResponse = {
  success?: boolean;
  data?: OrderCompletionDetails;
};

type WaitForOrderCompletionDetailsOptions = {
  orderNumber?: string;
  totalAmount?: number;
  minItemCount?: number;
  productNames?: string[];
  timeoutMs?: number;
  intervalMs?: number;
};

export async function waitForOrderCompletionDetails(
  request: APIRequestContext,
  orderId: string,
  options: WaitForOrderCompletionDetailsOptions = {}
): Promise<OrderCompletionDetails> {
  const timeoutMs = options.timeoutMs ?? 60_000;
  const intervalMs = options.intervalMs ?? 2_000;
  const deadline = Date.now() + timeoutMs;
  const url = orderCompletionDetailsUrl(orderId);
  let lastResponse: string | undefined;

  do {
    const requestTimeout = Math.max(1_000, Math.min(10_000, deadline - Date.now()));
    const response = await request.get(url, {
      failOnStatusCode: false,
      headers: completionDetailsHeaders(),
      timeout: requestTimeout
    });
    const body = await response.text();

    if (response.ok()) {
      const parsed = parseCompletionResponse(body);
      const data = parsed?.data;
      const readinessGap = describeReadinessGap(data, orderId, options);

      if (parsed?.success !== false && !readinessGap && data) {
        return data;
      }

      lastResponse = `HTTP ${response.status()} ${readinessGap ?? 'unsuccessful response'}: ${truncate(body)}`;
    } else {
      lastResponse = `HTTP ${response.status()}: ${truncate(body)}`;
    }

    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  } while (Date.now() < deadline);

  throw new Error(
    `Order completion details did not become ready for order_id=${orderId}. Last response: ${lastResponse ?? 'none'}`
  );
}

export function expectOrderCompletionDetailsToMatchCheckout(
  details: OrderCompletionDetails,
  snapshot: CheckoutSnapshot
): void {
  const summary = details.payment_summary;

  if (!summary) {
    throw new Error('Order completion details response did not include payment_summary.');
  }

  const productNames = completionProductNames(details);
  for (const product of snapshot.products) {
    expect(productNames, `completion details should include ${product.productName}`).toContain(product.productName);
  }

  expectAmount(summary.subtotal_cost, snapshot.subtotal, 'subtotal_cost');
  expectAmount(summary.shipping_cost, snapshot.shipping, 'shipping_cost');
  expectAmount(summary.total_cost, snapshot.total, 'total_cost');

  if (snapshot.discount) {
    const discount = amountToNumber(snapshot.discount);
    const completionDiscount =
      amountFieldToNumber(summary.points_discount) + amountFieldToNumber(summary.coupon_discount);

    expect(completionDiscount, 'completion details discount should match checkout discount').toBe(Math.abs(discount));
  }

  if (snapshot.shippingDate) {
    const deliveryDates = [
      details.order_production_detail?.min_delivery_date,
      details.order_production_detail?.max_delivery_date
    ].filter((date): date is string => Boolean(date));

    if (deliveryDates.length) {
      expect(
        deliveryDates.some((deliveryDate) => dateTextIncludes(snapshot.shippingDate ?? '', deliveryDate)),
        `checkout shipping date "${snapshot.shippingDate}" should match completion delivery dates ${deliveryDates.join(', ')}`
      ).toBe(true);
    }
  }
}

export function summarizeOrderCompletionDetails(details: OrderCompletionDetails): Record<string, unknown> {
  return {
    id: details.id,
    orderNumber: details.order_number,
    itemsCount: details.items_count,
    paymentSummary: details.payment_summary,
    productionDetail: details.order_production_detail,
    products: completionProductNames(details)
  };
}

function orderCompletionDetailsUrl(orderId: string): string {
  if (env.ORDER_COMPLETION_DETAILS_ENDPOINT.includes('{orderId}')) {
    return env.ORDER_COMPLETION_DETAILS_ENDPOINT.replaceAll('{orderId}', encodeURIComponent(orderId));
  }

  return `${env.ORDER_COMPLETION_DETAILS_ENDPOINT.replace(/\/$/, '')}/${encodeURIComponent(orderId)}`;
}

function completionDetailsHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'X-E2E-Test': 'true'
  };

  if (env.API_TOKEN) {
    headers.Authorization = `Bearer ${env.API_TOKEN}`;
  }

  return headers;
}

function parseCompletionResponse(value: string): OrderCompletionResponse | undefined {
  try {
    return JSON.parse(value) as OrderCompletionResponse;
  } catch {
    return undefined;
  }
}

function describeReadinessGap(
  details: OrderCompletionDetails | undefined,
  orderId: string,
  options: WaitForOrderCompletionDetailsOptions
): string | undefined {
  if (!details) {
    return 'missing data';
  }

  if (details.id !== undefined && String(details.id) !== orderId) {
    return `expected numeric order id ${orderId}, received ${details.id}`;
  }

  if (options.orderNumber && details.order_number !== options.orderNumber) {
    return `expected order number ${options.orderNumber}, received ${details.order_number ?? 'missing'}`;
  }

  if (!details.payment_summary) {
    return 'missing payment_summary';
  }

  if (
    options.totalAmount !== undefined &&
    amountFieldToNumber(details.payment_summary.total_cost) !== options.totalAmount
  ) {
    return `expected total_cost ${options.totalAmount}, received ${details.payment_summary.total_cost ?? 'missing'}`;
  }

  const actualItemCount = Number(details.items_count ?? details.order_items?.length ?? 0);
  if (options.minItemCount !== undefined && actualItemCount < options.minItemCount) {
    return `expected at least ${options.minItemCount} order items, received ${actualItemCount}`;
  }

  const missingProducts =
    options.productNames?.filter((productName) => !completionProductNames(details).includes(productName)) ?? [];
  if (missingProducts.length) {
    return `missing products: ${missingProducts.join(', ')}`;
  }

  return undefined;
}

function completionProductNames(details: OrderCompletionDetails): string[] {
  return (
    details.order_items
      ?.map((item) => item.cart_item?.product)
      .filter((productName): productName is string => Boolean(productName)) ?? []
  );
}

function expectAmount(actual: number | string | undefined, expected: string | undefined, label: string): void {
  if (!expected) {
    return;
  }

  expect(amountFieldToNumber(actual), `completion details ${label} should match checkout`).toBe(amountToNumber(expected));
}

function amountToNumber(value: string): number {
  const amount = Number(value.replace(/[^\d-]/g, ''));

  if (!Number.isFinite(amount)) {
    throw new Error(`Could not parse checkout amount "${value}".`);
  }

  return amount;
}

function amountFieldToNumber(value: number | string | undefined): number {
  if (typeof value === 'number') {
    return value;
  }

  if (typeof value === 'string') {
    return amountToNumber(value);
  }

  return 0;
}

function dateTextIncludes(text: string, isoDate: string): boolean {
  const [year, month, day] = isoDate.split('-');

  if (!year || !month || !day) {
    return text.includes(isoDate);
  }

  const compactText = text.replace(/\D/g, '');
  const numericMonth = String(Number(month));
  const numericDay = String(Number(day));

  return (
    text.includes(isoDate) ||
    compactText.includes(`${year}${month}${day}`) ||
    compactText.includes(`${month}${day}${year}`) ||
    compactText.includes(`${numericMonth}${numericDay}${year}`) ||
    compactText.includes(`${year}${numericMonth}${numericDay}`)
  );
}

function truncate(value: string): string {
  return value.length > 1_000 ? `${value.slice(0, 1_000)}...` : value;
}
