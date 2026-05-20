import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { CheckoutProfile, PaymentProfile, SeededUser } from './types.js';

const fixturesDir = path.dirname(fileURLToPath(import.meta.url));

export const projectRoot = path.resolve(fixturesDir, '..', '..');
export const AUTH_STORAGE_STATE = path.join(projectRoot, '.auth', 'seeded-user.json');

export const env = {
  BASE_URL: process.env.BASE_URL ?? 'https://dev.musticker.com/kr',
  API_BASE_URL: process.env.API_BASE_URL,
  API_TOKEN: process.env.API_TOKEN,
  TEST_DATA_USER_ENDPOINT: process.env.TEST_DATA_USER_ENDPOINT,
  TEST_DATA_USER_DELETE_ENDPOINT: process.env.TEST_DATA_USER_DELETE_ENDPOINT,
  REGISTRATION_OTP_ENDPOINT:
    process.env.REGISTRATION_OTP_ENDPOINT ??
    'https://dev-api.musticker.com/index.php/sys/kr/tester/get-otp',
  REGISTRATION_OTP_METHOD: process.env.REGISTRATION_OTP_METHOD ?? 'GET',
  REGISTRATION_OTP_REQUEST_FROM: process.env.REGISTRATION_OTP_REQUEST_FROM ?? 'glophics-dev',
  TEST_USER_EMAIL: process.env.TEST_USER_EMAIL,
  TEST_USER_PASSWORD: process.env.TEST_USER_PASSWORD,
  RUN_PAYMENT_E2E: process.env.RUN_PAYMENT_E2E,
  CHECKOUT_EMAIL: process.env.CHECKOUT_EMAIL,
  CHECKOUT_FULL_NAME: process.env.CHECKOUT_FULL_NAME ?? 'Musticker E2E',
  CHECKOUT_COMPANY: process.env.CHECKOUT_COMPANY ?? 'Musticker QA',
  CHECKOUT_PROVINCE: process.env.CHECKOUT_PROVINCE ?? '\uc11c\uc6b8\ud2b9\ubcc4\uc2dc',
  CHECKOUT_CITY: process.env.CHECKOUT_CITY ?? '\uac15\ub0a8\uad6c',
  CHECKOUT_ADDRESS1: process.env.CHECKOUT_ADDRESS1 ?? '서울특별시 강남구 테헤란로 123',
  CHECKOUT_ADDRESS2: process.env.CHECKOUT_ADDRESS2 ?? '10층 E2E 테스트',
  CHECKOUT_POSTAL_CODE: process.env.CHECKOUT_POSTAL_CODE ?? '06234',
  CHECKOUT_PHONE: process.env.CHECKOUT_PHONE ?? '01012345678',
  PAYMENT_METHOD: process.env.PAYMENT_METHOD ?? 'Credit Card',
  PAYMENT_CARD_NUMBER: process.env.PAYMENT_CARD_NUMBER,
  PAYMENT_CARD_EXPIRY: process.env.PAYMENT_CARD_EXPIRY,
  PAYMENT_CARD_CVC: process.env.PAYMENT_CARD_CVC,
  PAYMENT_CARD_PASSWORD: process.env.PAYMENT_CARD_PASSWORD,
  PAYMENT_BIRTH_DATE: process.env.PAYMENT_BIRTH_DATE,
  PAYMENT_GATEWAY_CARD_NUMBER_SELECTOR: process.env.PAYMENT_GATEWAY_CARD_NUMBER_SELECTOR,
  PAYMENT_GATEWAY_EXPIRY_SELECTOR: process.env.PAYMENT_GATEWAY_EXPIRY_SELECTOR,
  PAYMENT_GATEWAY_CVC_SELECTOR: process.env.PAYMENT_GATEWAY_CVC_SELECTOR,
  PAYMENT_GATEWAY_PASSWORD_SELECTOR: process.env.PAYMENT_GATEWAY_PASSWORD_SELECTOR,
  PAYMENT_GATEWAY_BIRTH_DATE_SELECTOR: process.env.PAYMENT_GATEWAY_BIRTH_DATE_SELECTOR,
  PAYMENT_GATEWAY_CONFIRM_SELECTOR: process.env.PAYMENT_GATEWAY_CONFIRM_SELECTOR,
  TOSS_BANK_TRANSFER_PASSWORD: process.env.TOSS_BANK_TRANSFER_PASSWORD ?? '000000',
  TOSS_PAYMENT_STATUS_WEBHOOK_URL:
    process.env.TOSS_PAYMENT_STATUS_WEBHOOK_URL ??
    'https://dev-api.musticker.com/index.php/sys/kr/payments/webhook/toss/payment-status',
  TOSS_PAYMENT_WEBHOOK_PAYMENT_KEY: process.env.TOSS_PAYMENT_WEBHOOK_PAYMENT_KEY ?? 'test_payment_key',
  TOSS_PAYMENT_WEBHOOK_MID: process.env.TOSS_PAYMENT_WEBHOOK_MID ?? 'tosspayments'
};

export function normalizeBaseURL(baseURL: string): string {
  return baseURL.endsWith('/') ? baseURL : `${baseURL}/`;
}

export function appPath(relativePath = ''): string {
  const base = new URL(env.BASE_URL);
  const basePath = base.pathname.replace(/\/$/, '');
  const cleanPath = relativePath.replace(/^\.\//, '').replace(/^\//, '');

  return cleanPath ? `${basePath}/${cleanPath}` : basePath;
}

export function hasSeededUser(): boolean {
  return Boolean(env.TEST_USER_EMAIL && env.TEST_USER_PASSWORD);
}

export function seededUser(): SeededUser {
  if (!env.TEST_USER_EMAIL || !env.TEST_USER_PASSWORD) {
    throw new Error('TEST_USER_EMAIL and TEST_USER_PASSWORD are required for seeded-user tests.');
  }

  return {
    email: env.TEST_USER_EMAIL,
    password: env.TEST_USER_PASSWORD
  };
}

export function checkoutProfile(): CheckoutProfile {
  const userEmail = env.CHECKOUT_EMAIL ?? env.TEST_USER_EMAIL ?? 'musticker-e2e@example.com';

  return {
    email: userEmail,
    fullName: env.CHECKOUT_FULL_NAME,
    company: env.CHECKOUT_COMPANY,
    province: env.CHECKOUT_PROVINCE,
    city: env.CHECKOUT_CITY,
    addressLine1: env.CHECKOUT_ADDRESS1,
    addressLine2: env.CHECKOUT_ADDRESS2,
    postalCode: env.CHECKOUT_POSTAL_CODE,
    phone: env.CHECKOUT_PHONE
  };
}

export function paymentProfile(): PaymentProfile {
  return {
    method: env.PAYMENT_METHOD,
    cardNumber: env.PAYMENT_CARD_NUMBER,
    expiry: env.PAYMENT_CARD_EXPIRY,
    cvc: env.PAYMENT_CARD_CVC,
    password: env.PAYMENT_CARD_PASSWORD,
    birthDate: env.PAYMENT_BIRTH_DATE,
    selectors: {
      cardNumber: env.PAYMENT_GATEWAY_CARD_NUMBER_SELECTOR,
      expiry: env.PAYMENT_GATEWAY_EXPIRY_SELECTOR,
      cvc: env.PAYMENT_GATEWAY_CVC_SELECTOR,
      password: env.PAYMENT_GATEWAY_PASSWORD_SELECTOR,
      birthDate: env.PAYMENT_GATEWAY_BIRTH_DATE_SELECTOR,
      confirm: env.PAYMENT_GATEWAY_CONFIRM_SELECTOR
    }
  };
}

export function canRunPaymentE2E(): boolean {
  return env.RUN_PAYMENT_E2E === 'true' && hasSeededUser();
}

export function canFetchRegistrationOtp(): boolean {
  return Boolean(env.REGISTRATION_OTP_ENDPOINT);
}

export function canRunMemberPurchaseRegression(): boolean {
  return env.RUN_PAYMENT_E2E === 'true' && canFetchRegistrationOtp();
}

export function canRunApiSetup(): boolean {
  return Boolean(env.API_BASE_URL && env.API_TOKEN && env.TEST_DATA_USER_ENDPOINT);
}

export function makeRunMarker(workerIndex: number): string {
  return `e2e-${new Date().toISOString().replace(/[:.]/g, '-')}-${workerIndex}`;
}
