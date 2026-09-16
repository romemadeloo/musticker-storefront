import { test } from '../../fixtures/e2e-test.js';
import { categoryLinks, ko } from '../../fixtures/storefront-data.js';
import { CategoryV2Page } from '../../pom/category-page.js';

test.describe('storefront v2 category discovery', { tag: ['@regression', '@production', '@discovery'] }, () => {
  test.use({ allowGuestUserMe401: true, allowKnownNuxtPayloadFailures: true });

  test('MS-V2-006 sticker category lists expected product links', async ({ page }) => {
    const category = new CategoryV2Page(page);

    await category.goto('./stickers', ko.stickers);
    await category.expectProductLinks(categoryLinks.stickers);
    await category.openProduct(categoryLinks.stickers[0], /\/kr\/stickers\/die-cut-sticker\/?$/);
  });

  test('MS-V2-007 roll sticker category lists expected product links', async ({ page }) => {
    const category = new CategoryV2Page(page);

    await category.goto('./roll-stickers', ko.rollStickers);
    await category.expectProductLinks(categoryLinks.rollStickers);
    await category.openProduct(categoryLinks.rollStickers[0], /\/kr\/roll-stickers\/die-cut-roll\/?$/);
  });

  test('MS-V2-008 sheet sticker category lists expected product links', async ({ page }) => {
    const category = new CategoryV2Page(page);

    await category.goto('./sheet-stickers', ko.sheetStickers);
    await category.expectProductLinks(categoryLinks.sheetStickers);
    await category.openProduct(categoryLinks.sheetStickers[0], /\/kr\/sheet-stickers\/die-cut-sheet\/?$/);
  });
});

