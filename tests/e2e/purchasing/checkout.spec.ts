import type { Page } from '@playwright/test';

import { test, expect } from '../../fixtures/e2e-test.js';
import { checkoutProfile, hasSeededUser, seededUser } from '../../fixtures/env.js';
import { dieCutSticker } from '../../fixtures/test-data.js';
import type { CheckoutSnapshot } from '../../fixtures/types.js';
import { CheckoutPage } from '../../pom/checkout-page.js';
import { HomePage } from '../../pom/home-page.js';
import { LoginPage } from '../../pom/login-page.js';
import { ProductPage } from '../../pom/product-page.js';

test.describe('production-safe checkout', {
  tag: ['@regression', '@purchasing', '@checkout', '@production-safe']
}, () => {
  test.use({ allowGuestUserMe401: true, allowKnownNuxtPayloadFailures: true });

  test.beforeEach(async ({ page }) => {
    test.skip(!hasSeededUser(), 'Set TEST_USER_EMAIL and TEST_USER_PASSWORD to run safe checkout coverage.');

    const loginPage = new LoginPage(page);
    const user = seededUser();
    await loginPage.goto();
    await loginPage.expectLoaded();
    await loginPage.login(user.email, user.password);
    await loginPage.expectLoggedIn();

    await cleanupCart(page);
  });

  test('preserves the configured cart item and consistent totals at checkout', async ({ page }, testInfo) => {
    const productPage = new ProductPage(page);

    await productPage.goto(dieCutSticker.path);
    const configuredProduct = await productPage.configureProduct(dieCutSticker);
    const uploadModal = await productPage.openUploadModal();
    const cart = await uploadModal.skipUploadAndAddToCart();

    try {
      const cartItems = await cart.captureAllItems();
      await cart.checkout();

      const checkoutPage = new CheckoutPage(page);
      await checkoutPage.expectLoaded();
      await checkoutPage.expectCartItems(cartItems);
      await checkoutPage.fillContactAndShipping(checkoutProfile());
      await checkoutPage.selectStandardShipping();

      const snapshot = await checkoutPage.captureSnapshot(cartItems, 'No order submitted by production-safe test.');
      testInfo.annotations.push({
        type: 'production-safe-checkout-snapshot',
        description: JSON.stringify(snapshot)
      });

      expectCheckoutTotalsToBeConsistent(snapshot);
      expect(snapshot.products).toEqual(cartItems);
      expect(cartItems[0]).toMatchObject({
        productName: configuredProduct.productName,
        widthMm: configuredProduct.widthMm,
        heightMm: configuredProduct.heightMm,
        quantity: configuredProduct.quantity
      });
    } finally {
      await cleanupCart(page);
    }
  });

  test('validates required checkout fields without submitting an order', async ({ page }) => {
    test.setTimeout(120_000);

    await page.route(/\/sys\/kr\/orders\/checkout\b/i, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          message: 'E2E validation test blocked order creation.'
        })
      });
    });

    const productPage = new ProductPage(page);

    await productPage.goto(dieCutSticker.path);
    await productPage.configureProduct(dieCutSticker);
    const uploadModal = await productPage.openUploadModal();
    const cart = await uploadModal.skipUploadAndAddToCart();

    try {
      const cartItems = await cart.captureAllItems();
      await cart.checkout();

      const checkoutPage = new CheckoutPage(page);
      await checkoutPage.expectLoaded();
      await checkoutPage.expectRequiredFieldsRejectEmptyInput();
      await checkoutPage.fillContactAndShipping(checkoutProfile());
      await checkoutPage.selectStandardShipping();
      await checkoutPage.selectBankTransfer();
      await checkoutPage.expectOrderSubmissionEnabled();
      await checkoutPage.expectInvalidFormatsRejectSubmission(checkoutProfile());
      await checkoutPage.expectOrderSubmissionEnabled();

      const snapshot = await checkoutPage.captureSnapshot(cartItems, 'Validation only; no order submitted.');
      expectCheckoutTotalsToBeConsistent(snapshot);
    } finally {
      await cleanupCart(page);
    }
  });
});

function expectCheckoutTotalsToBeConsistent(snapshot: CheckoutSnapshot): void {
  const subtotal = wonAmount(snapshot.subtotal);
  const shipping = wonAmount(snapshot.shipping) ?? 0;
  const discount = wonAmount(snapshot.discount) ?? 0;
  const total = wonAmount(snapshot.total);

  expect(subtotal, `Checkout should expose a subtotal.\n${snapshot.summaryText}`).toBeDefined();
  expect(total, `Checkout should expose a total.\n${snapshot.summaryText}`).toBeDefined();

  if (subtotal !== undefined && total !== undefined) {
    expect(total).toBe(subtotal + shipping + discount);
  }
}

function wonAmount(value: string | undefined): number | undefined {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value.replace(/[^\d-]/g, ''));
  return Number.isFinite(parsed) ? parsed : undefined;
}

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
