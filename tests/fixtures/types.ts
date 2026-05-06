export type SeededUser = {
  email: string;
  password: string;
  displayName?: string;
};

export type ProductConfig = {
  path: string;
  productName: string;
  localizedName: string;
  sizeLabel: string;
  widthMm: number;
  heightMm: number;
  quantity: number;
  expectedUnitPrice: string;
  expectedCheckoutTotal: string;
};

export type CheckoutProfile = {
  email: string;
  fullName: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  postalCode: string;
  phone: string;
};

export type PaymentProfile = {
  method: string;
  cardNumber?: string;
  expiry?: string;
  cvc?: string;
  password?: string;
  birthDate?: string;
  selectors: {
    cardNumber?: string;
    expiry?: string;
    cvc?: string;
    password?: string;
    birthDate?: string;
    confirm?: string;
  };
};

export type OrderRecord = {
  orderNumber?: string;
  runMarker: string;
  productName: string;
  total: string;
};

export type ApiTestUser = {
  id?: string;
  email: string;
  password: string;
  fullName: string;
  runMarker: string;
};
