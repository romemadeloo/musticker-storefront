import { test } from '../../fixtures/e2e-test.js';
import { dieCutSticker } from '../../fixtures/test-data.js';
import { createTraceableUploadPng } from '../../fixtures/traceable-upload-image.js';
import { ProductPage } from '../../pom/product-page.js';

test.describe('upload and cart', { tag: ['@regression', '@purchasing'] }, () => {
  test.use({ allowGuestUserMe401: true, allowKnownNuxtPayloadFailures: true });

  test('adds configured product to cart with upload-later path and removes it', { tag: ['@cart', '@e2e'] }, async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.goto(dieCutSticker.path);
    const configuredProduct = await productPage.configureProduct(dieCutSticker);

    const uploadModal = await productPage.openUploadModal();
    const cart = await uploadModal.skipUploadAndAddToCart();

    await cart.expectLineItem(configuredProduct);
    await cart.expectRecommendedProductsVisible();
    await cart.removeLineItem(configuredProduct);
    await cart.expectEmpty(configuredProduct);
  });

  test('accepts a supported design file and adds the product to cart', { tag: '@cart' }, async ({ page }, testInfo) => {
    const designFile = await createTraceableUploadPng(page, testInfo, {
      purpose: 'ARTWORK UPLOAD',
      subject: dieCutSticker.productName,
      categoryName: 'cart',
      sequence: 1,
      runMarker: `cart-${testInfo.workerIndex}`
    });
    const productPage = new ProductPage(page);

    await productPage.goto(dieCutSticker.path);
    const configuredProduct = await productPage.configureProduct(dieCutSticker);

    const uploadModal = await productPage.openUploadModal();
    await uploadModal.uploadDesignFile(designFile);
    await uploadModal.expectSelectedFile(designFile);
    await uploadModal.fillSpecialRequest('E2E upload fixture: keep colors as submitted.');

    const cart = await uploadModal.addToCart();
    await cart.expectLineItem({ ...configuredProduct, price: undefined });
  });

});
