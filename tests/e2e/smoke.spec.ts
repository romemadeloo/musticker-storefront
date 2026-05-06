import { test, expect } from '../fixtures/e2e-test';
import { HomePage } from '../pom/home-page';

test.describe('smoke and navigation', { tag: '@smoke' }, () => {
  test.use({ allowGuestUserMe401: true });

  test('home page loads with core storefront content', { tag: '@navigation' }, async ({ page }) => {
    const home = new HomePage(page);

    await home.goto();
    await home.expectLoaded();
    await home.expectReviewCarouselMoves();
  });

  test('header navigation routes to product listing categories', { tag: '@navigation' }, async ({ page }) => {
    const home = new HomePage(page);

    await home.goto();
    await home.header.expectVisible();
    await home.header.goToStickers();
    await expect(page.locator('body')).toContainText('스티커');

    await home.header.goToRollStickers();
    await expect(page.locator('body')).toContainText('롤');

    await home.header.goToSheetStickers();
    await expect(page.locator('body')).toContainText('시트');
  });
});
