import { test } from '../../fixtures/e2e-test.js';
import { dieCutSticker } from '../../fixtures/test-data.js';
import { ProductPage } from '../../pom/product-page.js';

test.describe('product configuration', { tag: ['@regression', '@purchasing'] }, () => {
  test.use({ allowGuestUserMe401: true });

  test('configures die-cut sticker size and quantity then opens upload modal', { tag: ['@product', '@e2e'] }, async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.goto(dieCutSticker.path);
    await productPage.expectLoaded(dieCutSticker.localizedName);
    await productPage.configureProduct(dieCutSticker);

    const uploadModal = await productPage.openUploadModal();
    await uploadModal.expectVisible();
    await uploadModal.close();
  });

});
