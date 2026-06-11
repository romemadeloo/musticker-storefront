import { test, expect } from '../../fixtures/e2e-test.js';
import { searchQueries } from '../../fixtures/test-data.js';
import { HomePage } from '../../pom/home-page.js';

test.describe('search', { tag: ['@regression', '@discovery'] }, () => {
  test.use({ allowGuestUserMe401: true });

  test('searches for die-cut sticker and opens product page', { tag: ['@search', '@e2e'] }, async ({ page }) => {
    const home = new HomePage(page);

    await home.goto();
    const searchDialog = await home.header.openSearch();
    await searchDialog.expectEmptyRecentState();
    await searchDialog.searchFor(searchQueries.dieCutSticker);
    await searchDialog.expectDieCutStickerResults();
    await searchDialog.chooseDieCutSticker();
  });

  test('search dialog closes with Escape', { tag: ['@search', '@smoke'] }, async ({ page }) => {
    const home = new HomePage(page);

    await home.goto();
    const searchDialog = await home.header.openSearch();
    await searchDialog.closeWithEscape();
    await expect(searchDialog.dialog).toBeHidden();
  });

  test('search dialog closes with the close button', { tag: '@search' }, async ({ page }) => {
    const home = new HomePage(page);

    await home.goto();
    const searchDialog = await home.header.openSearch();
    await searchDialog.closeWithButton();
    await expect(searchDialog.dialog).toBeHidden();
  });
});
