import fs from 'node:fs/promises';
import path from 'node:path';

import { checkoutProfile, env, hasSeededUser, projectRoot, seededUser } from './env.js';
import type { CheckoutProfile, RegressionProductCandidate, SeededUser } from './types.js';

type RawObject = Record<string, unknown>;

export type OrderAllProductsConfig = {
  checkout: CheckoutProfile;
  credentials?: SeededUser;
  payloadProvided: boolean;
  products?: RegressionProductCandidate[];
  runLabel?: string;
};

type SkipCheck = {
  canRun: boolean;
  reason?: string;
};

const defaultWidthMm = 75;
const defaultHeightMm = 75;
const defaultQuantity = 10;

export async function loadOrderAllProductsConfig(): Promise<OrderAllProductsConfig> {
  const payload = await loadPayload();
  const credentials = normalizeCredentials(payload?.credentials) ?? normalizeCredentials(payload?.user) ?? envCredentials();

  return {
    checkout: normalizeCheckout(payload?.checkout, credentials?.email),
    credentials,
    payloadProvided: Boolean(payload),
    products: normalizeProducts(payload?.products),
    runLabel: stringValue(payload?.runLabel) ?? stringValue(payload?.run_label)
  };
}

export function canRunOrderAllProducts(config: OrderAllProductsConfig): SkipCheck {
  if (env.RUN_ORDER_ALL_PRODUCTS_E2E !== 'true') {
    return {
      canRun: false,
      reason: 'Set RUN_ORDER_ALL_PRODUCTS_E2E=true to run the dedicated order-all-products test.'
    };
  }

  if (env.RUN_PAYMENT_E2E !== 'true') {
    return {
      canRun: false,
      reason: 'Set RUN_PAYMENT_E2E=true because this test places a checkout order.'
    };
  }

  if (!config.credentials) {
    return {
      canRun: false,
      reason:
        'Provide credentials through ORDER_ALL_PRODUCTS_PAYLOAD, ORDER_ALL_PRODUCTS_PAYLOAD_FILE, or TEST_USER_EMAIL/TEST_USER_PASSWORD.'
    };
  }

  return { canRun: true };
}

export function hasOrderAllProductsCredentialInput(): boolean {
  return Boolean(
    (env.TEST_USER_EMAIL && env.TEST_USER_PASSWORD) ||
      env.ORDER_ALL_PRODUCTS_PAYLOAD ||
      env.ORDER_ALL_PRODUCTS_PAYLOAD_FILE
  );
}

function envCredentials(): SeededUser | undefined {
  return hasSeededUser() ? seededUser() : undefined;
}

async function loadPayload(): Promise<RawObject | undefined> {
  const inlinePayload = env.ORDER_ALL_PRODUCTS_PAYLOAD?.trim();
  const payloadFile = env.ORDER_ALL_PRODUCTS_PAYLOAD_FILE?.trim();

  if (inlinePayload && payloadFile) {
    throw new Error('Use either ORDER_ALL_PRODUCTS_PAYLOAD or ORDER_ALL_PRODUCTS_PAYLOAD_FILE, not both.');
  }

  if (inlinePayload) {
    return parsePayload(inlinePayload, 'ORDER_ALL_PRODUCTS_PAYLOAD');
  }

  if (!payloadFile) {
    return undefined;
  }

  const resolvedPath = path.isAbsolute(payloadFile) ? payloadFile : path.resolve(projectRoot, payloadFile);
  const fileContents = await fs.readFile(resolvedPath, 'utf8');

  return parsePayload(fileContents, `ORDER_ALL_PRODUCTS_PAYLOAD_FILE (${resolvedPath})`);
}

function parsePayload(value: string, source: string): RawObject {
  let parsed: unknown;

  try {
    parsed = JSON.parse(value) as unknown;
  } catch (error) {
    throw new Error(`${source} must be valid JSON: ${String(error)}`, { cause: error });
  }

  if (!isObject(parsed)) {
    throw new Error(`${source} must be a JSON object.`);
  }

  return parsed;
}

function normalizeCredentials(value: unknown): SeededUser | undefined {
  if (!isObject(value)) {
    return undefined;
  }

  const email = stringValue(value.email);
  const password = stringValue(value.password, { trim: false });

  if (!email && !password) {
    return undefined;
  }

  if (!email || !password) {
    throw new Error('Payload credentials require both "email" and "password".');
  }

  return {
    email,
    password,
    displayName: stringValue(value.displayName)
  };
}

function normalizeCheckout(value: unknown, email?: string): CheckoutProfile {
  const base = checkoutProfile();
  const input = isObject(value) ? value : {};

  return {
    email: stringValue(input.email) ?? email ?? base.email,
    fullName: stringValue(input.fullName) ?? stringValue(input.full_name) ?? base.fullName,
    company: stringValue(input.company) ?? base.company,
    province: stringValue(input.province) ?? base.province,
    city: stringValue(input.city) ?? base.city,
    addressLine1: stringValue(input.addressLine1) ?? stringValue(input.address_line_1) ?? base.addressLine1,
    addressLine2: stringValue(input.addressLine2) ?? stringValue(input.address_line_2) ?? base.addressLine2,
    postalCode: stringValue(input.postalCode) ?? stringValue(input.postal_code) ?? base.postalCode,
    phone: stringValue(input.phone) ?? base.phone
  };
}

function normalizeProducts(value: unknown): RegressionProductCandidate[] | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (!Array.isArray(value)) {
    throw new Error('Payload "products" must be an array when provided.');
  }

  return value.map((rawProduct, index) => normalizeProduct(rawProduct, index));
}

function normalizeProduct(value: unknown, index: number): RegressionProductCandidate {
  if (!isObject(value)) {
    throw new Error(`Payload products[${index}] must be an object.`);
  }

  const productPath = stringValue(value.path);
  if (!productPath) {
    throw new Error(`Payload products[${index}].path is required.`);
  }

  const normalizedPath = normalizeProductPath(productPath);

  return {
    path: normalizedPath,
    productName: stringValue(value.productName) ?? stringValue(value.product_name) ?? productNameFromPath(normalizedPath),
    categoryName: stringValue(value.categoryName) ?? stringValue(value.category_name) ?? categoryNameFromPath(normalizedPath),
    widthMm: numberValue(value.widthMm) ?? numberValue(value.width_mm) ?? defaultWidthMm,
    heightMm: numberValue(value.heightMm) ?? numberValue(value.height_mm) ?? defaultHeightMm,
    quantity: numberValue(value.quantity) ?? defaultQuantity,
    letteringText: stringValue(value.letteringText) ?? stringValue(value.lettering_text)
  };
}

export function normalizeProductPath(value: string): string {
  const trimmed = value.trim();
  const withoutQuery = trimmed.split(/[?#]/)[0] ?? trimmed;

  if (/^https?:\/\//i.test(withoutQuery)) {
    const url = new URL(withoutQuery);
    return normalizeProductPath(url.pathname);
  }

  const segments = withoutQuery
    .replace(/\\/g, '/')
    .replace(/^\.\//, '')
    .replace(/^\/+/, '')
    .split('/')
    .filter(Boolean);
  const krIndex = segments.indexOf('kr');
  const routeSegments = krIndex >= 0 ? segments.slice(krIndex + 1) : segments;

  if (routeSegments.length < 2) {
    throw new Error(`Product path "${value}" must include a category and product slug.`);
  }

  return `./${routeSegments.slice(0, 2).join('/')}`;
}

export function productNameFromPath(productPath: string): string {
  const slug = productPath.split('/').filter(Boolean).at(-1) ?? 'product';

  return titleFromSlug(slug);
}

function categoryNameFromPath(productPath: string): string {
  const category = productPath.replace(/^\.\//, '').split('/')[0] ?? 'products';

  return titleFromSlug(category).toLowerCase();
}

function titleFromSlug(value: string): string {
  return value
    .split('-')
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ');
}

function numberValue(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value !== 'string' || !value.trim()) {
    return undefined;
  }

  const parsed = Number(value.replace(/,/g, '').trim());

  return Number.isFinite(parsed) ? parsed : undefined;
}

function stringValue(value: unknown, options: { trim?: boolean } = {}): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trim = options.trim ?? true;
  const normalized = trim ? value.trim() : value;

  return normalized.length ? normalized : undefined;
}

function isObject(value: unknown): value is RawObject {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}
