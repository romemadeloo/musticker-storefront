import type { APIRequestContext } from '@playwright/test';

import { test } from '../fixtures/e2e-test.js';
import {
  appPath,
  canRunMemberPurchaseRegression,
  checkoutProfile,
  makeRunMarker
} from '../fixtures/env.js';
import { installArtworkUploadBypass } from '../fixtures/artwork-upload-bypass.js';
import { fetchRegistrationOtp } from '../fixtures/otp-client.js';
import { memberPurchaseCategories, uploadAssets } from '../fixtures/test-data.js';
import { checkoutAmountToNumber, postTossPaymentStatusWebhook } from '../fixtures/toss-payment-webhook-client.js';
import type { CartLineItem, RegressionProductCandidate } from '../fixtures/types.js';
import { CartDrawer } from '../pom/cart-drawer.js';
import { CartPage } from '../pom/cart-page.js';
import { CheckoutPage } from '../pom/checkout-page.js';
import { LoginPage } from '../pom/login-page.js';
import { ProductPage } from '../pom/product-page.js';
import { RegisterPage, type RegistrationProfile } from '../pom/register-page.js';

test.describe('new member purchase regression', { tag: ['@regression', '@e2e', '@payment', '@slow'] }, () => {
  test.setTimeout(300_000);

  test.skip(
    !canRunMemberPurchaseRegression(),
    'Set RUN_PAYMENT_E2E=true and configure REGISTRATION_OTP_ENDPOINT if the default dev tester endpoint is unavailable.'
  );
  test.use({ allowGuestUserMe401: true, allowExpectedAuthFailures: true });

  test('new member can register, log in, buy one product from each category, and confirm Toss bank transfer', async ({
    page,
    request
  }, testInfo) => {
    const runMarker = makeRunMarker(testInfo.workerIndex);
    const member: RegistrationProfile = {
      email: `musticker-e2e-${runMarker}@example.com`.toLowerCase(),
      password: 'MustickerE2E!2345',
      firstName: 'Musticker',
      lastName: runMarker.slice(-10)
    };
    const selectedProducts = selectRegressionProducts(runMarker);
    const productNames = selectedProducts.map((product) => product.productName);

    await test.step('register disposable member and complete onboarding', async () => {
      const registerPage = new RegisterPage(page);

      await registerPage.goto();
      await registerPage.expectLoaded();
      await registerPage.submitRegistration(member);

      const otp = await fetchRegistrationOtpWithRetry(request, member.email);
      await registerPage.submitOtp(otp);
      await registerPage.completeProfileSetup(member);
      await registerPage.completeTourGuideIfPresent();
      await registerPage.expectSetupComplete();
    });

    await test.step('log in again with the newly registered credentials', async () => {
      await page.goto(appPath());
      await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
      });
      await page.context().clearCookies();

      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.expectLoaded();
      await loginPage.login(member.email, member.password);
      await loginPage.expectLoggedIn();
      await installArtworkUploadBypass(page, runMarker);
    });

    let cart: CartDrawer | undefined;

    await test.step('add one configured product from each homepage category', async () => {
      const configuredProducts: CartLineItem[] = [];

      for (const [productIndex, product] of selectedProducts.entries()) {
        const productPage = new ProductPage(page);
        await productPage.goto(product.path);
        const configuredProduct = await productPage.configureRegressionProduct(product);
        const artworkFile = uploadAssets.numberedDesigns[productIndex] ?? uploadAssets.validDesign;

        const uploadModal = await productPage.openUploadModalIfPresent();
        if (uploadModal) {
          await uploadModal.uploadDesignFile(artworkFile);
          await uploadModal.expectSelectedFile(artworkFile);
          await uploadModal.fillSpecialRequest(`E2E regression ${runMarker} - ${product.categoryName}`);
          cart = await uploadModal.addToCart();
        } else {
          cart = await productPage.currentOrOpenCartDrawer();
        }

        configuredProducts.push(configuredProduct);
        await cart.expectLineItems(configuredProducts.map((item) => item.productName));

        if (configuredProducts.length < selectedProducts.length) {
          await cart.continueShopping();
        }
      }
    });

    if (!cart) {
      throw new Error('Cart drawer was not opened after adding regression products.');
    }

    const activeCart = cart;
    let cartItems: CartLineItem[] = [];

    await test.step('edit size and quantity in cart preview and verify recalculation', async () => {
      await activeCart.editFirstItemSizeAndQuantity(100, 20);
      cartItems = await activeCart.captureItems(productNames);
      testInfo.annotations.push({
        type: 'cart-preview-items',
        description: JSON.stringify(cartItems)
      });
    });

    await test.step('edit size and quantity again on full cart page and verify recalculation', async () => {
      await activeCart.viewCart();

      const cartPage = new CartPage(page);
      await cartPage.expectLoaded();
      await cartPage.editFirstItemSizeAndQuantity(125, 30);
      cartItems = await cartPage.captureItems(productNames);
      testInfo.annotations.push({
        type: 'cart-page-items',
        description: JSON.stringify(cartItems)
      });
      await cartPage.proceedToCheckout();
    });

    await test.step('fill checkout, apply available points/coupons, and select bank transfer', async () => {
      const checkoutPage = new CheckoutPage(page);
      const profile = checkoutProfile();

      await checkoutPage.expectLoaded();
      await checkoutPage.fillContactAndShipping({
        ...profile,
        email: member.email,
        fullName: `${member.firstName} ${member.lastName}`
      });
      await checkoutPage.selectStandardShipping();

      const pointsAndCouponsNote = await checkoutPage.applyPointsAndCouponsIfAvailable();
      testInfo.annotations.push({
        type: 'points-and-coupons',
        description: pointsAndCouponsNote
      });

      await checkoutPage.selectBankTransfer();
      await checkoutPage.expectCartItems(cartItems);

      const checkoutSnapshot = await checkoutPage.captureSnapshot(cartItems, pointsAndCouponsNote);
      testInfo.annotations.push({
        type: 'checkout-snapshot',
        description: JSON.stringify(checkoutSnapshot)
      });

      const gateway = await checkoutPage.placeOrder();
      const orderId = await gateway.captureOrderId();
      const totalAmount = checkoutAmountToNumber(checkoutSnapshot.total);
      await postTossPaymentStatusWebhook(request, {
        orderId,
        totalAmount
      });
      testInfo.annotations.push({
        type: 'payment-webhook-bypass',
        description: JSON.stringify({ orderId, totalAmount })
      });

      const confirmationPage = await gateway.gotoOrderDetails(orderId);
      await confirmationPage.expectLoaded();
      await confirmationPage.expectMatchesCheckoutSnapshot(checkoutSnapshot);
    });
  });
});

async function fetchRegistrationOtpWithRetry(request: APIRequestContext, email: string): Promise<string> {
  let lastError: unknown;

  for (let attempt = 0; attempt < 6; attempt += 1) {
    try {
      return await fetchRegistrationOtp(request, email);
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 2_000));
    }
  }

  throw lastError;
}

function selectRegressionProducts(seed: string): RegressionProductCandidate[] {
  return memberPurchaseCategories.map((category) => {
    const index = seededIndex(`${seed}-${category.categoryName}`, category.products.length);
    return category.products[index];
  });
}

function seededIndex(seed: string, max: number): number {
  let hash = 0;

  for (const char of seed) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }

  return hash % max;
}
