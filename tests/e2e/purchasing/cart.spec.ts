import type { Page } from '@playwright/test';

import { test, expect } from '../../fixtures/e2e-test.js';
import { env } from '../../fixtures/env.js';
import { installArtworkUploadBypass } from '../../fixtures/artwork-upload-bypass.js';
import { dieCutSticker, memberPurchaseCategories } from '../../fixtures/test-data.js';
import { createTraceableUploadPng } from '../../fixtures/traceable-upload-image.js';
import type { RegressionProductCandidate } from '../../fixtures/types.js';
import { CartDrawer } from '../../pom/cart-drawer.js';
import { CartPage } from '../../pom/cart-page.js';
import { HeaderComponent } from '../../pom/header-component.js';
import { HomePage } from '../../pom/home-page.js';
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

  test(
    'keeps a configured cart item after reload and storefront navigation',
    { tag: ['@cart', '@production-safe'] },
    async ({ page }) => {
      const productPage = new ProductPage(page);

      await productPage.goto(dieCutSticker.path);
      const configuredProduct = await productPage.configureProduct(dieCutSticker);
      const uploadModal = await productPage.openUploadModal();
      let cart = await uploadModal.skipUploadAndAddToCart();

      try {
        const initialItems = await cart.captureAllItems();
        const initialTotal = await cart.captureTotal();

        expect(initialItems).toEqual([configuredProduct]);

        await cart.continueShopping();
        await page.reload();
        cart = await new HeaderComponent(page).openCart();

        expect(await cart.captureAllItems()).toEqual(initialItems);
        expect(await cart.captureTotal()).toBe(initialTotal);

        await cart.continueShopping();
        const home = new HomePage(page);
        await home.header.goHome();
        cart = await home.header.openCart();

        expect(await cart.captureAllItems()).toEqual(initialItems);
        expect(await cart.captureTotal()).toBe(initialTotal);
      } finally {
        await cleanupCart(page);
      }
    }
  );

  test(
    'updates item options and total consistently in cart preview and cart page',
    { tag: ['@cart', '@production-safe'] },
    async ({ page }) => {
      const productPage = new ProductPage(page);

      await productPage.goto(dieCutSticker.path);
      await productPage.configureProduct(dieCutSticker);
      const uploadModal = await productPage.openUploadModal();
      const cart = await uploadModal.skipUploadAndAddToCart();

      try {
        const itemsBefore = await cart.captureAllItems();
        const totalBefore = await cart.captureTotal();

        await cart.editFirstItemSizeAndQuantity(100, 20);

        const editedDrawerItems = await cart.captureAllItems();
        const totalAfter = await cart.captureTotal();

        expect(editedDrawerItems).toHaveLength(1);
        expect(editedDrawerItems[0]).not.toEqual(itemsBefore[0]);
        expect(totalAfter).not.toBe(totalBefore);

        await cart.viewCart();

        const cartPage = new CartPage(page);
        await cartPage.expectLoaded();
        expect(await cartPage.captureAllItems()).toEqual(editedDrawerItems);
        expect(await cartPage.captureTotal()).toBe(totalAfter);
      } finally {
        await cleanupCart(page);
      }
    }
  );

  test(
    'keeps multiple cart items independent while editing and removing one',
    { tag: ['@cart', '@production-safe'] },
    async ({ page }) => {
      test.setTimeout(120_000);

      const secondProduct = representativeProduct('hologram');
      const productPage = new ProductPage(page);

      await productPage.goto(dieCutSticker.path);
      await productPage.configureProduct(dieCutSticker);
      const firstUploadModal = await productPage.openUploadModal();
      let cart = await firstUploadModal.skipUploadAndAddToCart();
      await cart.continueShopping();

      await productPage.goto(secondProduct.path);
      await productPage.configureRegressionProduct(secondProduct);
      const secondUploadModal = await productPage.openUploadModal();
      cart = await secondUploadModal.skipUploadAndAddToCart();

      try {
        const itemsBefore = await cart.captureAllItems();
        expect(itemsBefore).toHaveLength(2);
        expect(await cart.captureDeclaredItemCount()).toBe(2);

        await cart.editFirstItemSizeAndQuantity(100, 20);
        const itemsAfterEdit = await cart.captureAllItems();
        const unchangedItems = itemsAfterEdit.filter((item) =>
          itemsBefore.some((previousItem) => JSON.stringify(previousItem) === JSON.stringify(item))
        );
        const changedItem = itemsAfterEdit.find(
          (item) => !itemsBefore.some((previousItem) => JSON.stringify(previousItem) === JSON.stringify(item))
        );

        expect(itemsAfterEdit).toHaveLength(2);
        expect(unchangedItems).toHaveLength(1);
        expect(changedItem).toBeDefined();

        await cart.removeLineItem(changedItem?.productName ?? secondProduct.productName);
        expect(await cart.captureItemCount()).toBe(1);
        expect(await cart.captureDeclaredItemCount()).toBe(1);
        expect(await cart.captureAllItems()).toEqual(unchangedItems);
      } finally {
        await cleanupCart(page);
      }
    }
  );

  test(
    'keeps identical product additions as distinct cart lines after reload',
    { tag: ['@cart', '@production-safe'] },
    async ({ page }) => {
      const productPage = new ProductPage(page);

      for (let addition = 0; addition < 2; addition += 1) {
        await productPage.goto(dieCutSticker.path);
        await productPage.configureProduct(dieCutSticker);
        const uploadModal = await productPage.openUploadModal();
        const cart = await uploadModal.skipUploadAndAddToCart();

        if (addition === 0) {
          await cart.continueShopping();
        }
      }

      try {
        let cart = new CartDrawer(page);
        const itemsBeforeReload = await cart.captureAllItems();

        expect(itemsBeforeReload).toHaveLength(2);
        expect(await cart.captureDeclaredItemCount()).toBe(2);

        await cart.continueShopping();
        await page.reload();
        cart = await new HeaderComponent(page).openCart();

        expect(await cart.captureAllItems()).toEqual(itemsBeforeReload);

        await cart.removeLineItem(itemsBeforeReload[0] ?? dieCutSticker);
        expect(await cart.captureItemCount()).toBe(1);
        expect(await cart.captureDeclaredItemCount()).toBe(1);
      } finally {
        await cleanupCart(page);
      }
    }
  );
});

async function cleanupCart(page: Page): Promise<void> {
  if (page.isClosed()) {
    return;
  }

  const home = new HomePage(page);
  await home.goto();
  const cart = await home.header.openCart();
  await cart.removeAllLineItems();
  await cart.expectEmpty();
}

function representativeProduct(categoryName: string): RegressionProductCandidate {
  const product = memberPurchaseCategories.find((category) => category.categoryName === categoryName)?.products[0];

  if (!product) {
    throw new Error(`No representative product configured for ${categoryName}.`);
  }

  return product;
}
