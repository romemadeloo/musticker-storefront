import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { ProductConfig } from './types.js';

const fixturesDir = path.dirname(fileURLToPath(import.meta.url));

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
  validDesign: path.resolve(fixturesDir, '..', 'assets', 'musticker-sample.pdf'),
  invalidDesign: path.resolve(fixturesDir, '..', 'assets', 'invalid-upload.txt')
};
