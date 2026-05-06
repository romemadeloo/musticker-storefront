import { test } from '../fixtures/e2e-test';
import { dieCutSticker } from '../fixtures/test-data';
import { ProductPage } from '../pom/product-page';

test.describe('product configuration', { tag: '@regression' }, () => {
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

  test('custom size and quantity controls gate the next step until valid values exist', { tag: '@product' }, async ({ page }) => {
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
});
