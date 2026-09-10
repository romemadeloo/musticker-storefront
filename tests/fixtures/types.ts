export type ProductConfig = {
  productName: string;
  widthMm?: number;
  heightMm?: number;
  quantity?: number;
  expectedUnitPrice?: string;
};

export type CartLineItem = {
  productName: string;
  widthMm?: number;
  heightMm?: number;
  quantity?: number;
  price?: string;
};

