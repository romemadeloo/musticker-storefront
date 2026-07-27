import { test } from '../../fixtures/e2e-test.js';
import { env } from '../../fixtures/env.js';
import { installArtworkUploadBypass } from '../../fixtures/artwork-upload-bypass.js';
import { dieCutSticker } from '../../fixtures/test-data.js';
import { createTraceableUploadPng } from '../../fixtures/traceable-upload-image.js';
import { CartDrawer } from '../../pom/cart-drawer.js';
import { ProductPage } from '../../pom/product-page.js';

test.describe('upload and cart', { tag: ['@regression', '@purchasing'] }, () => {
  test.use({ allowGuestUserMe401: true, allowKnownNuxtPayloadFailures: true });

  test.beforeEach(async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.goto(dieCutSticker.path);
    await page.getByTestId('app-header-cart-button').click();

    const cart = new CartDrawer(page);
    if (await cart.isVisible({ timeout: 3_000 })) {
      await cart.removeAllLineItems();
      await cart.expectEmpty();
    }
  });

  test('adds configured product to cart with upload-later path and removes it', { tag: ['@cart', '@e2e'] }, async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.goto(dieCutSticker.path);
    const configuredProduct = await productPage.configureProduct(dieCutSticker);

    const uploadModal = await productPage.openUploadModal();
    const cart = await uploadModal.skipUploadAndAddToCart();

    await cart.expectLineItem(configuredProduct);
    await cart.removeLineItem(configuredProduct);
    await cart.expectEmpty(configuredProduct);
  });

  test('accepts a supported design file and adds the product to cart', { tag: '@cart' }, async ({ page }, testInfo) => {
    const runMarker = `cart-${testInfo.workerIndex}`;

    if (env.BYPASS_ARTWORK_UPLOAD) {
      await installArtworkUploadBypass(page, runMarker);
    }

    const designFile = await createTraceableUploadPng(page, testInfo, {
      purpose: 'ARTWORK UPLOAD',
      subject: dieCutSticker.productName,
      categoryName: 'cart',
      sequence: 1,
      runMarker
    });
    const productPage = new ProductPage(page);

    await productPage.goto(dieCutSticker.path);
    const configuredProduct = await productPage.configureProduct(dieCutSticker);

    const uploadModal = await productPage.openUploadModal();
    await uploadModal.fillSpecialRequest('E2E upload fixture: keep colors as submitted.');
    await uploadModal.uploadDesignFile(designFile);
    await uploadModal.expectSelectedFile(designFile);

    let cart: CartDrawer | undefined;

    try {
      cart = await uploadModal.addToCart();
      await cart.expectLineItem({ ...configuredProduct, price: undefined });
    } finally {
      if (cart) {
        await cart.removeLineItem({ ...configuredProduct, price: undefined });
      }
    }
  });

});
