import type { Page } from '@playwright/test';

import { expect, test } from '../fixtures/e2e-test.js';
import { dieCutSticker, uploadAssets } from '../fixtures/test-data.js';
import type { CartDrawer } from '../pom/cart-drawer.js';
import type { DesignUploadModal } from '../pom/design-upload-modal.js';
import { ProductPage } from '../pom/product-page.js';

const supportedDesignSpecialRequest = 'E2E upload fixture: keep colors as submitted.';

test.describe('cart upload workflows', { tag: '@regression' }, () => {
  test.use({ allowGuestUserMe401: true, allowKnownHydrationMismatch: true });

  test('adds configured product to cart with upload-later path and removes it', { tag: ['@cart', '@e2e'] }, async ({ page }) => {
    const uploadModal = await openConfiguredUploadModal(page);
    await expect(uploadModal.dialog).toBeVisible();

    const cart = await test.step('Skip design upload and add the configured product to cart', async () =>
      uploadModal.skipUploadAndAddToCart()
    );

    await expect(cart.dialog).toBeVisible();

    await expectConfiguredItemInCart(cart);

    await test.step('Verify cart recommendations are displayed', async () => {
      await cart.expectRecommendedProductsVisible();
    });

    await test.step('Remove the configured product and verify the empty cart state', async () => {
      await cart.removeLineItem(dieCutSticker);
      await cart.expectEmpty(dieCutSticker);
    });
  });

  test('accepts a supported design file and adds the product to cart', { tag: '@cart' }, async ({ page }) => {
    const uploadModal = await openConfiguredUploadModal(page);
    await expect(uploadModal.dialog).toBeVisible();

    await test.step('Attach a supported design file and add an order note', async () => {
      await uploadModal.uploadDesignFile(uploadAssets.validDesign);
      await uploadModal.expectSelectedFile(uploadAssets.validDesign);
      await uploadModal.fillSpecialRequest(supportedDesignSpecialRequest);
    });

    const cart = await test.step('Add the uploaded design product to cart', async () => uploadModal.addToCart());

    await expect(cart.dialog).toBeVisible();

    await expectConfiguredItemInCart(cart);

    await test.step('Clean up the cart item created by this test', async () => {
      await cart.removeLineItem(dieCutSticker);
      await cart.expectEmpty(dieCutSticker);
    });
  });

  test('keeps unsupported upload formats inside the upload modal', { tag: '@cart' }, async ({ page }) => {
    const uploadModal = await openConfiguredUploadModal(page);
    await expect(uploadModal.dialog).toBeVisible();

    await test.step('Reject an unsupported design file without leaving the upload modal', async () => {
      await uploadModal.uploadDesignFile(uploadAssets.invalidDesign);
      await uploadModal.expectInvalidFileValidation();
    });
  });
});

async function openConfiguredUploadModal(page: Page): Promise<DesignUploadModal> {
  const productPage = new ProductPage(page);

  await test.step(`Open ${dieCutSticker.productName} product page`, async () => {
    await productPage.goto(dieCutSticker.path);
  });

  await test.step('Select a supported size and quantity', async () => {
    await productPage.configureProduct(dieCutSticker);
  });

  return test.step('Open the design upload modal', async () => productPage.openUploadModal());
}

async function expectConfiguredItemInCart(cart: CartDrawer): Promise<void> {
  await test.step('Verify the cart contains the configured product details', async () => {
    await cart.expectLineItem(dieCutSticker);
  });
}
