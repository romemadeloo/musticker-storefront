import path from 'node:path';

import type { ProductConfig } from './types';

export const dieCutSticker: ProductConfig = {
  path: './stickers/die-cut-sticker',
  productName: 'Die Cut Sticker',
  localizedName: '자유형 스티커',
  sizeLabel: 'Medium (75x75)',
  widthMm: 75,
  heightMm: 75,
  quantity: 10,
  expectedUnitPrice: '7,300원',
  expectedCheckoutTotal: '10,300원'
};

export const searchQueries = {
  dieCutSticker: '자유형'
};

export const uploadAssets = {
  validDesign: path.resolve(__dirname, '..', 'assets', 'musticker-sample.pdf'),
  invalidDesign: path.resolve(__dirname, '..', 'assets', 'invalid-upload.txt')
};
