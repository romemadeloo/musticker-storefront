import { test } from '../../fixtures/e2e-test.js';
import { dieCutSticker } from '../../fixtures/test-data.js';
import { createUnsupportedUploadFile } from '../../fixtures/traceable-upload-image.js';
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
    await productPage.expectPrice(dieCutSticker.expectedUnitPrice);
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
});
