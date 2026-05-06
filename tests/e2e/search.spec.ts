import { test } from '../fixtures/e2e-test';
import { searchQueries } from '../fixtures/test-data';
import { HomePage } from '../pom/home-page';

test.describe('search', { tag: '@regression' }, () => {
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
  });
});
