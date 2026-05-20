import type { APIRequestContext } from '@playwright/test';

import { env } from './env.js';

type TossPaymentStatusPayload = {
  eventType: 'PAYMENT_STATUS_CHANGED';
  createdAt: string;
  data: {
    mId: string;
    paymentKey: string;
    orderId: string;
    status: 'DONE';
    totalAmount: number;
  };
};

type TossPaymentStatusInput = {
  orderId: string;
  totalAmount: number;
};

export async function postTossPaymentStatusWebhook(
  request: APIRequestContext,
  input: TossPaymentStatusInput
): Promise<void> {
  const payload: TossPaymentStatusPayload = {
    eventType: 'PAYMENT_STATUS_CHANGED',
    createdAt: webhookTimestamp(),
    data: {
      mId: env.TOSS_PAYMENT_WEBHOOK_MID,
      paymentKey: env.TOSS_PAYMENT_WEBHOOK_PAYMENT_KEY,
      orderId: input.orderId,
      status: 'DONE',
      totalAmount: input.totalAmount
    }
  };

  const response = await request.post(env.TOSS_PAYMENT_STATUS_WEBHOOK_URL, {
    data: payload,
    failOnStatusCode: false,
    headers: {
      'Content-Type': 'application/json',
      'X-E2E-Test': 'true'
    }
  });

  if (!response.ok()) {
    throw new Error(
      `Toss payment-status webhook failed with ${response.status()} ${response.url()}: ${await response.text()}`
    );
  }
}

export function checkoutAmountToNumber(amount: string | undefined): number {
  if (!amount) {
    throw new Error('Checkout total is required for the Toss payment-status webhook totalAmount.');
  }

  const value = Number(amount.replace(/[^\d-]/g, ''));

  if (!Number.isFinite(value)) {
    throw new Error(`Could not parse checkout amount "${amount}" for Toss payment-status webhook.`);
  }

  return value;
}

function webhookTimestamp(): string {
  return new Date().toISOString().replace('Z', '000');
}
