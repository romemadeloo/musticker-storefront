import { test } from '../fixtures/e2e-test.js';
import { dieCutSticker, uploadAssets } from '../fixtures/test-data.js';
import { ProductPage } from '../pom/product-page.js';

test.describe('upload and cart', { tag: '@regression' }, () => {
  test.use({ allowGuestUserMe401: true });

  test('adds configured product to cart with upload-later path and removes it', { tag: ['@cart', '@e2e'] }, async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.goto(dieCutSticker.path);
    await productPage.configureProduct(dieCutSticker);

    const uploadModal = await productPage.openUploadModal();
    const cart = await uploadModal.skipUploadAndAddToCart();

    await cart.expectLineItem(dieCutSticker);
    await cart.expectRecommendedProductsVisible();
    await cart.removeLineItem(dieCutSticker);
    await cart.expectEmpty(dieCutSticker);
  });

  test('accepts a supported design file and adds the product to cart', { tag: '@cart' }, async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.goto(dieCutSticker.path);
    await productPage.configureProduct(dieCutSticker);

    const uploadModal = await productPage.openUploadModal();
    await uploadModal.uploadDesignFile(uploadAssets.validDesign);
    await uploadModal.expectSelectedFile(uploadAssets.validDesign);
    await uploadModal.fillSpecialRequest('E2E upload fixture: keep colors as submitted.');

    const cart = await uploadModal.addToCart();
    await cart.expectLineItem(dieCutSticker);
  });

  test('keeps unsupported upload formats inside the upload modal', { tag: '@cart' }, async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.goto(dieCutSticker.path);
    await productPage.configureProduct(dieCutSticker);

    const uploadModal = await productPage.openUploadModal();
    await uploadModal.uploadDesignFile(uploadAssets.invalidDesign);
    await uploadModal.expectInvalidFileValidation();
  });
});
