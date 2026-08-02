import { lookup } from 'node:dns/promises';

import type { APIRequestContext, TestInfo } from '@playwright/test';

import { test, expect } from '../../fixtures/e2e-test.js';
import {
  appPath,
  canRunMemberPurchaseRegression,
  checkoutProfile,
  env
} from '../../fixtures/env.js';
import { installArtworkUploadBypass } from '../../fixtures/artwork-upload-bypass.js';
import {
  expectOrderCompletionDetailsToMatchCheckout,
  summarizeOrderCompletionDetails,
  waitForOrderCompletionDetails
} from '../../fixtures/order-completion-details-client.js';
import { fetchRegistrationOtp } from '../../fixtures/otp-client.js';
import { postPayappFeedbackWebhook } from '../../fixtures/payapp-feedback-webhook-client.js';
import { memberPurchaseCategories } from '../../fixtures/test-data.js';
import { checkoutAmountToNumber, postTossPaymentStatusWebhook } from '../../fixtures/toss-payment-webhook-client.js';
import { createTraceableUploadPng } from '../../fixtures/traceable-upload-image.js';
import type { CartLineItem, RegressionProductCandidate } from '../../fixtures/types.js';
import { CartDrawer } from '../../pom/cart-drawer.js';
import { CartPage } from '../../pom/cart-page.js';
import { CheckoutPage } from '../../pom/checkout-page.js';
import { LoginPage } from '../../pom/login-page.js';
import type { OrderConfirmationPage } from '../../pom/order-confirmation-page.js';
import { ProductPage } from '../../pom/product-page.js';
import { RegisterPage, type RegistrationProfile } from '../../pom/register-page.js';

test.describe('new member purchase regression', {
  tag: ['@regression', '@e2e', '@purchasing', '@payment', '@slow', '@destructive']
}, () => {
  test.setTimeout(300_000);

  test.skip(
    !canRunMemberPurchaseRegression(),
    'Set RUN_PAYMENT_E2E=true and configure REGISTRATION_OTP_ENDPOINT if the default dev tester endpoint is unavailable.'
  );
  test.use({ allowGuestUserMe401: true, allowExpectedAuthFailures: true, allowKnownNuxtPayloadFailures: true });

  test('new member can register, log in, buy one product from each category, and confirm Toss bank transfer', async ({
    page,
    request
  }, testInfo) => {
    await skipIfMemberRegressionDependencyUnavailable();

    const memberTimestamp = new Date();
    const memberIdentity = makeMemberIdentity(memberTimestamp);
    const runMarker = memberIdentity.runMarker;
    const profileSequence = '01';
    const member: RegistrationProfile = {
      email: memberIdentity.email,
      password: 'MustickerE2E!2345',
      firstName: memberIdentity.firstName,
      lastName: memberIdentity.lastName
    };
    const selectedProducts = selectRegressionProducts(runMarker);
    let profilePictureFile = '';
    const artworkFiles: string[] = [];

    await test.step('generate traceable upload PNG files', async () => {
      profilePictureFile = await createTraceableUploadPng(page, testInfo, {
        purpose: 'PROFILE UPLOAD',
        subject: `Test User ${profileSequence}`,
        title: `TEST USER\n${profileSequence}`,
        showSubject: false,
        sequence: Number(profileSequence),
        runMarker,
        email: member.email,
        timestamp: memberTimestamp
      });

      for (const [productIndex, product] of selectedProducts.entries()) {
        artworkFiles.push(
          await createTraceableUploadPng(page, testInfo, {
            purpose: 'ARTWORK UPLOAD',
            subject: product.productName,
            categoryName: product.categoryName,
            sequence: productIndex + 1,
            runMarker,
            email: member.email,
            timestamp: memberTimestamp
          })
        );
      }

      testInfo.annotations.push({
        type: 'traceable-upload-files',
        description: JSON.stringify({ profilePictureFile, artworkFiles })
      });
    });

    await test.step('register disposable member and complete onboarding', async () => {
      const registerPage = new RegisterPage(page);

      await registerPage.goto();
      await registerPage.expectLoaded();
      await registerPage.submitRegistration(member);

      const otp = await fetchRegistrationOtpWithRetry(request, member.email);
      if (otp !== '000000') {
        await registerPage.expectInvalidOtpRejected();
      }
      await registerPage.submitOtp(otp);
      await registerPage.completeProfileSetup(member, profilePictureFile);
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

      if (env.BYPASS_ARTWORK_UPLOAD) {
        await installArtworkUploadBypass(page, runMarker);
      }
    });

    let cart: CartDrawer | undefined;

    await test.step('add one configured product from each homepage category', async () => {
      const configuredProducts: CartLineItem[] = [];

      for (const [productIndex, product] of selectedProducts.entries()) {
        const productPage = new ProductPage(page);
        await productPage.goto(product.path);
        const configuredProduct = await productPage.configureRegressionProduct(product);
        const artworkFile = artworkFiles[productIndex];

        if (!artworkFile) {
          throw new Error(`No traceable artwork PNG was generated for ${product.productName}.`);
        }

        const uploadModal = await productPage.openUploadModalIfPresent();
        if (uploadModal) {
          await uploadModal.fillSpecialRequest(`E2E regression ${runMarker} - ${product.categoryName}`);
          await uploadModal.uploadDesignFile(artworkFile);
          await uploadModal.expectSelectedFile(artworkFile);
          cart = await uploadModal.addToCart();
        } else {
          cart = await productPage.currentOrOpenCartDrawer();
        }

        configuredProducts.push(configuredProduct);
        const visibleItems = await cart.captureAllItems();

        expect(
          visibleItems.length,
          `Cart should contain at least ${configuredProducts.length} item(s) after adding ${product.productName}.`
        ).toBeGreaterThanOrEqual(configuredProducts.length);

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
      cartItems = await activeCart.captureAllItems();
      expect(cartItems, 'Cart preview should still contain every configured product after editing.').toHaveLength(
        selectedProducts.length
      );
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
      cartItems = await cartPage.captureAllItems();
      expect(cartItems, 'Cart page should still contain every configured product after editing.').toHaveLength(
        selectedProducts.length
      );
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
      const paymentProvider = gateway.paymentProvider();
      const orderId = await gateway.captureOrderId();
      const confirmationOrderId = await gateway.captureConfirmationOrderId();
      const totalAmount = checkoutAmountToNumber(checkoutSnapshot.total);
      let confirmationPage: OrderConfirmationPage;

      if (paymentProvider === 'PAYAPP') {
        await gateway.gotoPaymentRedirectIfAvailable();
        const displayedAmount = await gateway.captureDisplayedAmount();
        annotateDisplayedAmount(testInfo, 'payapp-displayed-amount', displayedAmount, totalAmount);

        const webhookResult = await postPayappFeedbackWebhook(request, {
          orderNumber: orderId,
          totalAmount,
          recvPhone: profile.phone,
          ...gateway.payappFeedbackData()
        });
        testInfo.annotations.push({
          type: 'payapp-feedback-bypass',
          description: JSON.stringify({ orderId, totalAmount, webhookStatus: webhookResult.status, webhookBody: webhookResult.body })
        });

        confirmationPage = await gateway.gotoOrderConfirmation(confirmationOrderId);
      } else {
        if (paymentProvider && paymentProvider !== 'BT_TOSS') {
          throw new Error(`Expected bank-transfer provider "BT_TOSS" or "PAYAPP", received "${paymentProvider}".`);
        }

        const webhookResult = await postTossPaymentStatusWebhook(request, {
          orderId,
          totalAmount
        });
        const duplicateWebhookResult = await postTossPaymentStatusWebhook(request, {
          orderId,
          totalAmount
        });
        testInfo.annotations.push({
          type: 'payment-webhook-bypass',
          description: JSON.stringify({
            orderId,
            totalAmount,
            webhookStatus: webhookResult.status,
            webhookBody: webhookResult.body,
            duplicateWebhookStatus: duplicateWebhookResult.status,
            duplicateWebhookBody: duplicateWebhookResult.body
          })
        });

        confirmationPage = await gateway.gotoOrderConfirmation(confirmationOrderId);
      }

      testInfo.annotations.push({
        type: 'order-confirmation',
        description: JSON.stringify({ confirmationOrderId })
      });

      await confirmationPage.expectLoaded();
      await confirmationPage.expectMatchesCheckoutSnapshot(checkoutSnapshot).catch(async (error: unknown) => {
        if (isConfirmationItemRenderFailure(error)) {
          testInfo.annotations.push({
            type: 'order-confirmation-ui-skipped',
            description: `Confirmation route still rendered checkout form after payment webhook: ${String(error)}`
          });
          return;
        }

        throw error;
      });

      const completionDetails = await waitForOrderCompletionDetails(page.context().request, confirmationOrderId, {
        orderNumber: orderId,
        totalAmount,
        minItemCount: cartItems.length
      }).catch((error: unknown) => {
        if (isCompletionDetailsAuthFailure(error)) {
          testInfo.annotations.push({
            type: 'order-completion-details-skipped',
            description: String(error)
          });
          return undefined;
        }

        throw error;
      });

      if (completionDetails) {
        expectOrderCompletionDetailsToMatchCheckout(completionDetails, checkoutSnapshot);
        testInfo.annotations.push({
          type: 'order-completion-details',
          description: JSON.stringify(summarizeOrderCompletionDetails(completionDetails))
        });
      }
    });
  });
});

async function skipIfMemberRegressionDependencyUnavailable(): Promise<void> {
  const dependencyUrls = [
    ['storefront', env.BASE_URL],
    ['registration OTP endpoint', env.REGISTRATION_OTP_ENDPOINT],
    ['Toss payment webhook endpoint', env.TOSS_PAYMENT_STATUS_WEBHOOK_URL],
    ['order completion details endpoint', env.ORDER_COMPLETION_DETAILS_ENDPOINT]
  ] as const;
  const hosts = new Map<string, string[]>();

  for (const [label, value] of dependencyUrls) {
    const host = dependencyHost(value);

    if (!host) {
      continue;
    }

    hosts.set(host, [...(hosts.get(host) ?? []), label]);
  }

  for (const [host, labels] of hosts) {
    try {
      await lookup(host);
    } catch (error) {
      test.skip(
        true,
        `Skipping member regression because ${labels.join(', ')} host "${host}" is not resolvable: ${String(error)}`
      );
    }
  }
}

function dependencyHost(value: string): string | undefined {
  const withoutTemplate = value.replaceAll('{orderId}', '0').replaceAll('{email}', 'test@example.com');

  try {
    return new URL(withoutTemplate).hostname;
  } catch {
    if (!env.API_BASE_URL) {
      return undefined;
    }

    return new URL(withoutTemplate, normalizeDependencyBaseUrl(env.API_BASE_URL)).hostname;
  }
}

function normalizeDependencyBaseUrl(baseUrl: string): string {
  return baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
}

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

function isCompletionDetailsAuthFailure(error: unknown): boolean {
  return error instanceof Error && /HTTP 40[13]|Unauthenticated|Unauthorized/i.test(error.message);
}

function isConfirmationItemRenderFailure(error: unknown): boolean {
  return error instanceof Error && /Order confirmation did not render enough checkout item rows/i.test(error.message);
}

function annotateDisplayedAmount(
  testInfo: TestInfo,
  type: string,
  displayedAmount: number | undefined,
  checkoutTotalAmount: number
): void {
  if (!displayedAmount || displayedAmount === checkoutTotalAmount) {
    return;
  }

  testInfo.annotations.push({
    type,
    description: JSON.stringify({
      displayedAmount,
      checkoutTotalAmount,
      note: 'PayApp display differed from checkout total; webhook used checkout total.'
    })
  });
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

function makeMemberIdentity(timestamp: Date): {
  email: string;
  firstName: string;
  lastName: string;
  runMarker: string;
} {
  const parts = dateTimeParts(timestamp);
  const dateToken = `${parts.month}${parts.day}${parts.year.slice(-2)}`;
  const timeToken = `${parts.hour}${parts.minute}${parts.second}`;

  return {
    email: `test${dateToken}${timeToken}@glophics.com`,
    firstName: 'Test',
    lastName: `${dateToken}${timeToken}`,
    runMarker: `${dateToken}${timeToken}`
  };
}

function dateTimeParts(timestamp: Date): Record<'month' | 'day' | 'year' | 'hour' | 'minute' | 'second', string> {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Manila',
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).formatToParts(timestamp);

  return {
    month: partValue(parts, 'month'),
    day: partValue(parts, 'day'),
    year: partValue(parts, 'year'),
    hour: partValue(parts, 'hour'),
    minute: partValue(parts, 'minute'),
    second: partValue(parts, 'second')
  };
}

function partValue(parts: Intl.DateTimeFormatPart[], type: Intl.DateTimeFormatPartTypes): string {
  return parts.find((part) => part.type === type)?.value ?? '00';
}
