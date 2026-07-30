import type { Page } from '@playwright/test';

import { test, expect } from '../../fixtures/e2e-test.js';
import { dieCutSticker } from '../../fixtures/test-data.js';
import { HomePage } from '../../pom/home-page.js';
import { ProductPage } from '../../pom/product-page.js';

test.describe('mobile critical buyer journey', {
  tag: ['@mobile', '@smoke', '@regression', '@production-safe']
}, () => {
  test.use({ allowGuestUserMe401: true, allowKnownNuxtPayloadFailures: true });

  test('mobile home header and search fit the viewport', async ({ page }) => {
    const home = new HomePage(page);

    await home.goto();
    await home.expectLoaded();
    await home.header.expectVisible();
    await expectNoHorizontalOverflow(page);

    const search = await home.header.openSearch();
    await search.searchFor('musticker-no-result-zzzz');
    await search.expectNoResults();
    await expectNoHorizontalOverflow(page);
    await search.closeWithButton();
  });

  test('mobile product configuration and cart controls remain usable', async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.goto(dieCutSticker.path);
    const configuredProduct = await productPage.configureProduct(dieCutSticker);
    await expectNoHorizontalOverflow(page);

    const uploadModal = await productPage.openUploadModal();
    await expectNoHorizontalOverflow(page);
    const cart = await uploadModal.skipUploadAndAddToCart();

    try {
      await cart.expectLineItem(configuredProduct);
      await expectNoHorizontalOverflow(page);
    } finally {
      await cart.removeAllLineItems();
      await cart.expectEmpty();
    }
  });
});

async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  const dimensions = await page.evaluate(() => ({
    viewportWidth: document.documentElement.clientWidth,
    contentWidth: document.documentElement.scrollWidth
  }));

  expect(dimensions.contentWidth).toBeLessThanOrEqual(dimensions.viewportWidth + 1);
}
