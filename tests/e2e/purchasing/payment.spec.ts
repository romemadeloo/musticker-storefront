import type { APIRequestContext } from '@playwright/test';

import { test } from '../../fixtures/e2e-test.js';
import {
  AUTH_STORAGE_STATE,
  canRunPaymentE2E,
  checkoutProfile,
  makeRunMarker,
  paymentProfile
} from '../../fixtures/env.js';
import { postPayappFeedbackWebhook } from '../../fixtures/payapp-feedback-webhook-client.js';
import { dieCutSticker } from '../../fixtures/test-data.js';
import { checkoutAmountToNumber } from '../../fixtures/toss-payment-webhook-client.js';
import { CheckoutPage } from '../../pom/checkout-page.js';
import type { OrderConfirmationPage } from '../../pom/order-confirmation-page.js';
import type { PaymentGatewayPage } from '../../pom/payment-gateway-page.js';
import { ProductPage } from '../../pom/product-page.js';

test.describe('full payment checkout', {
  tag: ['@regression', '@e2e', '@purchasing', '@payment', '@slow', '@destructive']
}, () => {
  test.skip(!canRunPaymentE2E(), 'Set RUN_PAYMENT_E2E=true and seeded user credentials to run full payment checkout.');
  test.use({ storageState: AUTH_STORAGE_STATE });

  test('seeded user can buy a configured die-cut sticker through sandbox payment', async ({ page, request }, testInfo) => {
    const runMarker = makeRunMarker(testInfo.workerIndex);
    const productPage = new ProductPage(page);
    const profile = checkoutProfile();

    await productPage.goto(dieCutSticker.path);
    await productPage.configureProduct(dieCutSticker);

    const uploadModal = await productPage.openUploadModal();
    await uploadModal.fillSpecialRequest(`Payment checkout ${runMarker}`);
    const cart = await uploadModal.skipUploadAndAddToCart();
    await cart.expectLineItem(dieCutSticker);
    await cart.checkout();

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.expectLoaded();
    await checkoutPage.fillContactAndShipping(profile);
    await checkoutPage.selectStandardShipping();
    await checkoutPage.selectPaymentMethod(paymentProfile().method);
    await checkoutPage.expectOrderSummary(dieCutSticker);

    const gateway = await checkoutPage.placeOrder();
    const confirmationPage =
      gateway.paymentProvider() === 'PAYAPP'
        ? await completePayappBypass(gateway, request, {
            totalAmount: checkoutAmountToNumber(dieCutSticker.expectedCheckoutTotal),
            recvPhone: profile.phone
          })
        : await gateway.completeSandboxPayment(paymentProfile());
    await confirmationPage.expectLoaded();
    await confirmationPage.expectOrderSummary(dieCutSticker);

    const orderRecord = await confirmationPage.captureOrderRecord(runMarker, dieCutSticker);
    testInfo.annotations.push({
      type: 'order-record',
      description: JSON.stringify(orderRecord)
    });
  });
});

async function completePayappBypass(
  gateway: PaymentGatewayPage,
  request: APIRequestContext,
  options: { totalAmount: number; recvPhone: string }
): Promise<OrderConfirmationPage> {
  const orderId = await gateway.captureOrderId();
  const confirmationOrderId = await gateway.captureConfirmationOrderId();

  await postPayappFeedbackWebhook(request, {
    orderNumber: orderId,
    totalAmount: options.totalAmount,
    recvPhone: options.recvPhone,
    ...gateway.payappFeedbackData()
  });

  return gateway.gotoOrderConfirmation(confirmationOrderId);
}
