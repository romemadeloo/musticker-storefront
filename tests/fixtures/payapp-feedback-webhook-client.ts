import type { APIRequestContext } from '@playwright/test';

import { env } from './env.js';

type PayappFeedbackInput = {
  orderNumber: string;
  totalAmount: number;
  mulNo: string;
  var1Data: string;
  payUrl: string;
  recvPhone?: string;
};

type PayappFeedbackResult = {
  status: number;
  body: string;
  json?: unknown;
};

type PayappFeedbackPayload = {
  userid: string;
  linkkey: string;
  linkval: string;
  goodname: string;
  price: string;
  recvphone: string;
  reqdate: string;
  pay_date: string | null;
  pay_type: string;
  pay_state: string;
  mul_no: string;
  payurl: string;
  vbank: string;
  vbankno: string;
  depositor: string;
  var1: string;
  var2: string;
  currency: string;
  amount_taxable: string;
  amount_taxfree: string;
  amount_vat: string;
  feedbacktype: string;
};

export async function postPayappFeedbackWebhook(
  request: APIRequestContext,
  input: PayappFeedbackInput
): Promise<PayappFeedbackResult> {
  const payload: PayappFeedbackPayload = {
    userid: env.PAYAPP_FEEDBACK_USERID,
    linkkey: env.PAYAPP_FEEDBACK_LINKKEY,
    linkval: env.PAYAPP_FEEDBACK_LINKVAL,
    goodname: `Order #${input.orderNumber}`,
    price: String(input.totalAmount),
    recvphone: input.recvPhone ?? env.PAYAPP_FEEDBACK_RECVPHONE ?? env.CHECKOUT_PHONE,
    reqdate: env.PAYAPP_FEEDBACK_REQDATE ?? formatPayappDate(new Date()),
    pay_date: null,
    pay_type: env.PAYAPP_FEEDBACK_PAY_TYPE,
    pay_state: env.PAYAPP_FEEDBACK_PAY_STATE,
    mul_no: input.mulNo,
    payurl: input.payUrl,
    vbank: env.PAYAPP_FEEDBACK_VBANK,
    vbankno: env.PAYAPP_FEEDBACK_VBANKNO,
    depositor: env.PAYAPP_FEEDBACK_DEPOSITOR,
    var1: input.var1Data,
    var2: input.orderNumber,
    currency: env.PAYAPP_FEEDBACK_CURRENCY,
    amount_taxable: env.PAYAPP_FEEDBACK_AMOUNT_TAXABLE,
    amount_taxfree: env.PAYAPP_FEEDBACK_AMOUNT_TAXFREE,
    amount_vat: env.PAYAPP_FEEDBACK_AMOUNT_VAT,
    feedbacktype: env.PAYAPP_FEEDBACK_TYPE
  };

  const response = await request.post(env.PAYAPP_FEEDBACK_WEBHOOK_URL, {
    data: payload,
    failOnStatusCode: false,
    headers: {
      'Content-Type': 'application/json',
      'X-E2E-Test': 'true'
    }
  });
  const body = await response.text();

  if (!response.ok()) {
    throw new Error(`PayApp feedback webhook failed with ${response.status()} ${response.url()}: ${body}`);
  }

  const json = parseJson(body);
  if (isFailureResponse(json)) {
    throw new Error(`PayApp feedback webhook returned an unsuccessful response: ${body}`);
  }

  return {
    status: response.status(),
    body,
    json
  };
}

function formatPayappDate(value: Date): string {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');
  const hours = String(value.getHours()).padStart(2, '0');
  const minutes = String(value.getMinutes()).padStart(2, '0');
  const seconds = String(value.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function parseJson(value: string): unknown {
  try {
    return JSON.parse(value) as unknown;
  } catch {
    return undefined;
  }
}

function isFailureResponse(value: unknown): boolean {
  if (!value || typeof value !== 'object' || !('success' in value)) {
    return false;
  }

  return (value as { success?: unknown }).success === false;
}
