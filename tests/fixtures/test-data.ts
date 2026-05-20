import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { ProductConfig, RegressionProductCandidate } from './types.js';

const fixturesDir = path.dirname(fileURLToPath(import.meta.url));

export const dieCutSticker: ProductConfig = {
  path: './stickers/die-cut-sticker',
  productName: 'Die Cut Sticker',
  localizedName: '자유형 스티커',
  sizeLabel: 'Medium (75x75)',
  widthMm: 75,
  heightMm: 75,
  quantity: 10,
  expectedUnitPrice: '6,600원',
  expectedCheckoutTotal: '9,600원'
};

export const searchQueries = {
  dieCutSticker: '자유형'
};

export const uploadAssets = {
  validDesign: path.resolve(fixturesDir, '..', 'assets', 'musticker-sample.pdf'),
  invalidDesign: path.resolve(fixturesDir, '..', 'assets', 'invalid-upload.txt'),
  numberedDesigns: Array.from({ length: 10 }, (_, index) =>
    path.resolve(fixturesDir, '..', 'assets', `800x800px - test${index + 1}.png`)
  )
};

export const memberPurchaseCategories: Array<{
  categoryName: string;
  products: RegressionProductCandidate[];
}> = [
  {
    categoryName: 'stickers',
    products: [
      {
        path: './stickers/die-cut-sticker',
        productName: 'Die Cut Sticker',
        categoryName: 'stickers',
        widthMm: 75,
        heightMm: 75,
        quantity: 10
      }
    ]
  },
  {
    categoryName: 'roll stickers',
    products: [
      {
        path: './roll-stickers/die-cut-roll',
        productName: 'Die Cut Roll',
        categoryName: 'roll stickers',
        widthMm: 75,
        heightMm: 75,
        quantity: 10
      }
    ]
  },
  {
    categoryName: 'sheet stickers',
    products: [
      {
        path: './stickers/sticker-sheet',
        productName: 'Sticker Sheet',
        categoryName: 'sheet stickers',
        widthMm: 75,
        heightMm: 75,
        quantity: 10
      }
    ]
  },
  {
    categoryName: 'hologram',
    products: [
      {
        path: './stickers/hologram-sticker',
        productName: 'Hologram Sticker',
        categoryName: 'hologram',
        widthMm: 75,
        heightMm: 75,
        quantity: 10
      }
    ]
  },
  {
    categoryName: 'lettering',
    products: [
      {
        path: './stickers/vinyl-lettering',
        productName: 'Vinyl Lettering',
        categoryName: 'lettering',
        widthMm: 75,
        heightMm: 75,
        quantity: 10,
        letteringText: 'E2E'
      }
    ]
  }
];
