import { test } from '../../fixtures/e2e-test.js';
import { dieCutSticker } from '../../fixtures/test-data.js';
import { createTraceableUploadPng, createUnsupportedUploadFile } from '../../fixtures/traceable-upload-image.js';
import { HomePage } from '../../pom/home-page.js';
import { ProductPage } from '../../pom/product-page.js';

test.describe('purchasing validation and error handling', {
  tag: ['@regression', '@purchasing', '@validation', '@error-handling']
}, () => {
  test.use({ allowGuestUserMe401: true, allowKnownNuxtPayloadFailures: true });

  test('custom size and quantity controls gate the next step until valid values exist', { tag: '@product' }, async ({
    page
  }) => {
    const productPage = new ProductPage(page);

    await productPage.goto(dieCutSticker.path);
    await productPage.expectLoaded(dieCutSticker.localizedName);
    await productPage.openCustomSizeFields();
    await productPage.expectNextStepDisabled();

    await productPage.fillCustomSize(dieCutSticker.widthMm, dieCutSticker.heightMm);
    await productPage.openCustomQuantityField();
    await productPage.expectNextStepDisabled();

    await productPage.fillCustomQuantity(dieCutSticker.quantity);
    await productPage.expectVisiblePrice();
    await productPage.expectNextStepEnabled();
  });

  test('keeps unsupported upload formats inside the upload modal', { tag: '@cart' }, async ({ page }, testInfo) => {
    const invalidDesignFile = await createUnsupportedUploadFile(testInfo, `cart-${testInfo.workerIndex}`);
    const productPage = new ProductPage(page);

    await productPage.goto(dieCutSticker.path);
    await productPage.configureProduct(dieCutSticker);

    const uploadModal = await productPage.openUploadModal();
    await uploadModal.uploadDesignFile(invalidDesignFile, { waitForAddToCart: false });
    await uploadModal.expectInvalidFileValidation();
  });

  test('recovers from an invalid upload by reopening the modal with a valid file', { tag: '@cart' }, async ({
    page
  }, testInfo) => {
    const runMarker = `upload-recovery-${testInfo.workerIndex}`;
    const invalidDesignFile = await createUnsupportedUploadFile(testInfo, runMarker);
    const validDesignFile = await createTraceableUploadPng(page, testInfo, {
      purpose: 'ARTWORK UPLOAD',
      subject: dieCutSticker.productName,
      categoryName: 'upload recovery',
      sequence: 1,
      runMarker
    });
    const productPage = new ProductPage(page);

    await productPage.goto(dieCutSticker.path);
    const configuredProduct = await productPage.configureProduct(dieCutSticker);
    let uploadModal = await productPage.openUploadModal();
    await uploadModal.uploadDesignFile(invalidDesignFile, { waitForAddToCart: false });
    await uploadModal.expectInvalidFileValidation();
    await uploadModal.close();

    uploadModal = await productPage.openUploadModal();
    await uploadModal.uploadDesignFile(validDesignFile);
    await uploadModal.expectSelectedFile(validDesignFile);
    const cart = await uploadModal.addToCart();

    try {
      await cart.expectLineItem({ ...configuredProduct, price: undefined });
    } finally {
      const home = new HomePage(page);
      await home.goto();
      const activeCart = await home.header.openCart();
      await activeCart.removeAllLineItems();
      await activeCart.expectEmpty();
    }
  });

  test('replaces and removes artwork before adding the final file to cart', { tag: '@cart' }, async ({
    page
  }, testInfo) => {
    const runMarker = `upload-actions-${testInfo.workerIndex}`;
    const firstDesignFile = await createTraceableUploadPng(page, testInfo, {
      purpose: 'ARTWORK UPLOAD',
      subject: `${dieCutSticker.productName} first`,
      categoryName: 'upload actions',
      sequence: 1,
      runMarker
    });
    const replacementDesignFile = await createTraceableUploadPng(page, testInfo, {
      purpose: 'ARTWORK UPLOAD',
      subject: `${dieCutSticker.productName} replacement`,
      categoryName: 'upload actions',
      sequence: 2,
      runMarker
    });
    const productPage = new ProductPage(page);

    await productPage.goto(dieCutSticker.path);
    const configuredProduct = await productPage.configureProduct(dieCutSticker);
    const uploadModal = await productPage.openUploadModal();

    await uploadModal.uploadDesignFile(firstDesignFile);
    await uploadModal.expectSelectedFile(firstDesignFile);
    await uploadModal.replaceDesignFile(replacementDesignFile);
    await uploadModal.expectSelectedFile(replacementDesignFile);
    await uploadModal.removeSelectedFile(replacementDesignFile);
    await uploadModal.uploadDesignFile(firstDesignFile);

    const cart = await uploadModal.addToCart();
    try {
      await cart.expectLineItem({ ...configuredProduct, price: undefined });
    } finally {
      const home = new HomePage(page);
      await home.goto();
      const activeCart = await home.header.openCart();
      await activeCart.removeAllLineItems();
      await activeCart.expectEmpty();
    }
  });
});
