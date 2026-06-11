import type { Page } from '@playwright/test';

import { test, expect } from '../../fixtures/e2e-test.js';
import { appPath, env, makeRunMarker } from '../../fixtures/env.js';
import {
  canRunOrderAllProducts,
  hasOrderAllProductsCredentialInput,
  loadOrderAllProductsConfig,
  normalizeProductPath,
  productNameFromPath
} from '../../fixtures/order-all-products-config.js';
import {
  expectOrderCompletionDetailsToMatchCheckout,
  summarizeOrderCompletionDetails,
  waitForOrderCompletionDetails
} from '../../fixtures/order-completion-details-client.js';
import { checkoutAmountToNumber, postTossPaymentStatusWebhook } from '../../fixtures/toss-payment-webhook-client.js';
import type { CartLineItem, RegressionProductCandidate, SeededUser } from '../../fixtures/types.js';
import { CartDrawer } from '../../pom/cart-drawer.js';
import { CheckoutPage } from '../../pom/checkout-page.js';
import { LoginPage } from '../../pom/login-page.js';
import { ProductPage } from '../../pom/product-page.js';

const discoveryEntryPaths = ['', './stickers', './roll-stickers', './sheet-stickers'];
const productCategories = new Set(['stickers', 'roll-stickers', 'sheet-stickers']);
const defaultWidthMm = 75;
const defaultHeightMm = 75;
const defaultQuantity = 10;

test.describe('order all products', {
  tag: ['@order-all-products', '@e2e', '@purchasing', '@payment', '@slow', '@destructive']
}, () => {
  test.setTimeout(900_000);
  test.skip(
    env.RUN_ORDER_ALL_PRODUCTS_E2E !== 'true',
    'Set RUN_ORDER_ALL_PRODUCTS_E2E=true to run the dedicated order-all-products test.'
  );
  test.skip(env.RUN_PAYMENT_E2E !== 'true', 'Set RUN_PAYMENT_E2E=true because this test places a checkout order.');
  test.skip(
    !hasOrderAllProductsCredentialInput(),
    'Provide credentials through ORDER_ALL_PRODUCTS_PAYLOAD, ORDER_ALL_PRODUCTS_PAYLOAD_FILE, or TEST_USER_EMAIL/TEST_USER_PASSWORD.'
  );
  test.use({ allowGuestUserMe401: true, allowExpectedAuthFailures: true, allowKnownNuxtPayloadFailures: true });

  test('runtime member can place one order containing every product', async ({ page, request }, testInfo) => {
    const config = await loadOrderAllProductsConfig();
    const runCheck = canRunOrderAllProducts(config);

    test.skip(!runCheck.canRun, runCheck.reason);

    const credentials = requiredCredentials(config.credentials);
    const runMarker = config.runLabel ?? makeRunMarker(testInfo.workerIndex);

    await test.step('log in with provided member credentials', async () => {
      await resetBrowserSession(page);

      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.expectLoaded();
      await loginPage.login(credentials.email, credentials.password);
      await loginPage.expectLoggedIn();
    });

    await test.step('clear existing cart state', async () => {
      await page.goto(appPath());

      await page.getByTestId('app-header-cart-button').click();

      const cart = new CartDrawer(page);
      const cartOpened = await cart.dialog
        .waitFor({ state: 'visible', timeout: 5_000 })
        .then(() => true)
        .catch(() => false);

      if (cartOpened) {
        await cart.removeAllLineItems();
      }
    });

    const products = config.products ?? (await discoverProductCandidates(page));
    expect(products.length, 'At least one product must be available to order.').toBeGreaterThan(0);
    testInfo.annotations.push({
      type: config.products ? 'order-all-products-payload' : 'order-all-products-discovery',
      description: JSON.stringify({
        source: config.products ? 'payload' : 'runtime-discovery',
        productCount: products.length,
        products: products.map(({ path, productName }) => ({ path, productName }))
      })
    });

    let cart: CartDrawer | undefined;
    const configuredProducts: CartLineItem[] = [];

    await test.step('add every product to cart', async () => {
      for (const [productIndex, product] of products.entries()) {
        const productPage = new ProductPage(page);

        await productPage.goto(product.path);
        const configuredProduct = await productPage.configureOrderAllProduct(product);
        const uploadModal = await productPage.openUploadModalIfPresent();

        if (uploadModal) {
          await uploadModal.fillSpecialRequest(`Order all products ${runMarker} - ${product.productName}`);
          cart = await uploadModal.skipUploadAndAddToCart();
        } else {
          cart = await productPage.currentOrOpenCartDrawer();
        }

        configuredProducts.push(configuredProduct);

        const visibleItems = await cart.captureAllItems();
        expect(
          visibleItems.length,
          `Cart should contain at least ${configuredProducts.length} item(s) after adding ${product.productName}.`
        ).toBeGreaterThanOrEqual(configuredProducts.length);

        if (productIndex < products.length - 1) {
          await cart.continueShopping();
        }
      }
    });

    if (!cart) {
      throw new Error('Cart drawer was not opened after adding all products.');
    }

    const activeCart = cart;
    const cartItems = await activeCart.captureAllItems();
    expect(cartItems, 'Cart should contain exactly the products added by this test.').toHaveLength(products.length);
    testInfo.annotations.push({
      type: 'order-all-products-cart-items',
      description: JSON.stringify(cartItems)
    });

    await test.step('place bank-transfer order containing all products', async () => {
      await activeCart.checkout();

      const checkoutPage = new CheckoutPage(page);
      await checkoutPage.expectLoaded();
      await checkoutPage.fillContactAndShipping({
        ...config.checkout,
        email: config.checkout.email || credentials.email
      });
      await checkoutPage.selectStandardShipping();
      await checkoutPage.selectBankTransfer();
      await checkoutPage.expectCartItems(cartItems);

      const checkoutSnapshot = await checkoutPage.captureSnapshot(cartItems, 'Points and coupons intentionally not applied.');
      testInfo.annotations.push({
        type: 'order-all-products-checkout-snapshot',
        description: JSON.stringify(checkoutSnapshot)
      });

      const gateway = await checkoutPage.placeOrder();
      const paymentProvider = gateway.paymentProvider();
      if (paymentProvider && paymentProvider !== 'BT_TOSS') {
        throw new Error(`Expected bank-transfer Toss checkout provider "BT_TOSS", received "${paymentProvider}".`);
      }

      const orderId = await gateway.captureOrderId();
      const confirmationOrderId = await gateway.captureConfirmationOrderId();
      const totalAmount = checkoutAmountToNumber(checkoutSnapshot.total);
      const webhookResult = await postTossPaymentStatusWebhook(request, {
        orderId,
        totalAmount
      });
      testInfo.annotations.push({
        type: 'order-all-products-payment-webhook',
        description: JSON.stringify({
          orderId,
          totalAmount,
          webhookStatus: webhookResult.status,
          webhookBody: webhookResult.body
        })
      });

      const completionDetails = await waitForOrderCompletionDetails(page.context().request, confirmationOrderId, {
        orderNumber: orderId,
        totalAmount,
        minItemCount: cartItems.length,
        productNames: cartItems.map((item) => item.productName)
      });
      expectOrderCompletionDetailsToMatchCheckout(completionDetails, checkoutSnapshot);
      testInfo.annotations.push({
        type: 'order-all-products-completion-details',
        description: JSON.stringify(summarizeOrderCompletionDetails(completionDetails))
      });

      const confirmationPage = await gateway.gotoOrderConfirmation(confirmationOrderId);
      await confirmationPage.expectLoaded();
      await confirmationPage.expectMatchesCheckoutSnapshot(checkoutSnapshot);
    });
  });
});

async function resetBrowserSession(page: Page): Promise<void> {
  await page.goto(appPath());
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  await page.context().clearCookies();
}

async function discoverProductCandidates(page: Page): Promise<RegressionProductCandidate[]> {
  const productsByPath = new Map<string, RegressionProductCandidate>();

  for (const entryPath of discoveryEntryPaths) {
    await page.goto(appPath(entryPath));
    await page.waitForLoadState('domcontentloaded').catch(() => undefined);
    await scrollToLoadProductCards(page);

    const links = await productLinks(page);

    for (const link of links) {
      const productPath = productPathFromHref(link.href);

      if (!productPath || productsByPath.has(productPath)) {
        continue;
      }

      productsByPath.set(productPath, {
        path: productPath,
        productName: productNameFromPath(productPath),
        categoryName: categoryNameFromPath(productPath),
        widthMm: defaultWidthMm,
        heightMm: defaultHeightMm,
        quantity: defaultQuantity,
        letteringText: defaultLetteringText(productPath)
      });
    }
  }

  return [...productsByPath.values()].sort((left, right) => left.path.localeCompare(right.path));
}

async function productLinks(page: Page): Promise<Array<{ href: string; text: string }>> {
  return page.locator('a[href]').evaluateAll((anchors) =>
    anchors.map((anchor) => {
      const link = anchor as HTMLAnchorElement;

      return {
        href: link.href,
        text: link.innerText || link.getAttribute('aria-label') || ''
      };
    })
  );
}

async function scrollToLoadProductCards(page: Page): Promise<void> {
  await page.evaluate(async () => {
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    for (let index = 0; index < 6; index += 1) {
      window.scrollBy(0, Math.max(window.innerHeight, 700));
      await delay(150);
    }

    window.scrollTo(0, 0);
  });
}

function productPathFromHref(href: string): string | undefined {
  let normalizedPath: string;

  try {
    normalizedPath = normalizeProductPath(new URL(href, env.BASE_URL).pathname);
  } catch {
    return undefined;
  }

  const [category, slug] = normalizedPath.replace(/^\.\//, '').split('/');

  if (!category || !slug || !productCategories.has(category)) {
    return undefined;
  }

  return normalizedPath;
}

function categoryNameFromPath(productPath: string): string {
  return productPath
    .replace(/^\.\//, '')
    .split('/')[0]
    ?.replace(/-/g, ' ') ?? 'products';
}

function defaultLetteringText(productPath: string): string | undefined {
  return /lettering|vinyl/i.test(productPath) ? 'E2E' : undefined;
}

function requiredCredentials(credentials: SeededUser | undefined): SeededUser {
  if (!credentials) {
    throw new Error('Credentials are required for the order-all-products test.');
  }

  return credentials;
}
