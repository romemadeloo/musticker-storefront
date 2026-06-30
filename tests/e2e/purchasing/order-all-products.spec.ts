import type { Page, TestInfo } from '@playwright/test';

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
import { installArtworkUploadBypass } from '../../fixtures/artwork-upload-bypass.js';
import { postPayappFeedbackWebhook } from '../../fixtures/payapp-feedback-webhook-client.js';
import { checkoutAmountToNumber, postTossPaymentStatusWebhook } from '../../fixtures/toss-payment-webhook-client.js';
import { createTraceableUploadPng } from '../../fixtures/traceable-upload-image.js';
import type { CartLineItem, RegressionProductCandidate, SeededUser } from '../../fixtures/types.js';
import { CartDrawer } from '../../pom/cart-drawer.js';
import { CheckoutPage } from '../../pom/checkout-page.js';
import { HomePage } from '../../pom/home-page.js';
import { LoginPage } from '../../pom/login-page.js';
import type { OrderConfirmationPage } from '../../pom/order-confirmation-page.js';
import { ProductPage } from '../../pom/product-page.js';

const discoveryEntryPaths = ['', './stickers', './roll-stickers', './sheet-stickers'];
const productCategories = new Set(['stickers', 'roll-stickers', 'sheet-stickers']);
const defaultWidthMm = 75;
const defaultHeightMm = 75;
const defaultQuantity = 10;

test.describe('order all products', {
  tag: ['@order-all-products', '@e2e', '@purchasing', '@payment', '@slow', '@destructive']
}, () => {
  test.describe.configure({ retries: 0 });
  test.setTimeout(2_700_000);
  test.skip(
    env.RUN_ORDER_ALL_PRODUCTS_E2E !== 'true',
    'Set RUN_ORDER_ALL_PRODUCTS_E2E=true to run the dedicated order-all-products test.'
  );
  test.skip(env.RUN_PAYMENT_E2E !== 'true', 'Set RUN_PAYMENT_E2E=true because this test places a checkout order.');
  test.skip(
    !hasOrderAllProductsCredentialInput(),
    'Provide credentials through ORDER_ALL_PRODUCTS_PAYLOAD, ORDER_ALL_PRODUCTS_PAYLOAD_FILE, or TEST_USER_EMAIL/TEST_USER_PASSWORD.'
  );
  test.use({
    allowGuestUserMe401: true,
    allowExpectedAuthFailures: true,
    allowKnownNuxtPayloadFailures: true,
    allowTransientApiCorsFailures: true,
    allowTransientCartCreateFailures: true,
    allowTransientProductPageFailures: true
  });

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

      if (env.BYPASS_ARTWORK_UPLOAD) {
        await installArtworkUploadBypass(page, runMarker);
      }
    });

    await test.step('clear existing cart state', async () => {
      const home = new HomePage(page);

      await home.goto();
      const cart = await home.header.openCart();
      await cart.removeAllLineItems();
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
    const artworkFiles: string[] = [];

    await test.step('generate traceable artwork PNG files', async () => {
      for (const [productIndex, product] of products.entries()) {
        artworkFiles.push(
          await createTraceableUploadPng(page, testInfo, {
            purpose: 'ARTWORK UPLOAD',
            subject: product.productName,
            categoryName: product.categoryName,
            sequence: productIndex + 1,
            runMarker,
            email: credentials.email
          })
        );
      }

      testInfo.annotations.push({
        type: 'order-all-products-artwork-files',
        description: JSON.stringify(artworkFiles)
      });
    });

    await test.step('add every product to cart', async () => {
      for (const [productIndex, product] of products.entries()) {
        const artworkFile = artworkFiles[productIndex];

        if (!artworkFile) {
          throw new Error(`No traceable artwork PNG was generated for ${product.productName}.`);
        }

        const {
          cart: updatedCart,
          configuredProduct,
          visibleItems
        } = await addProductToCartWithArtwork(page, product, artworkFile, {
          expectedCartItemCount: configuredProducts.length + 1,
          runMarker
        });

        cart = updatedCart;
        configuredProducts.push(configuredProduct);

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
      testInfo.annotations.push({
        type: 'order-all-products-checkout-item-count',
        description: String(cartItems.length)
      });

      const checkoutSnapshot = await checkoutPage.captureSnapshot(cartItems, 'Points and coupons intentionally not applied.');
      testInfo.annotations.push({
        type: 'order-all-products-checkout-snapshot',
        description: JSON.stringify(checkoutSnapshot)
      });

      const gateway = await checkoutPage.placeOrder();
      const paymentProvider = gateway.paymentProvider();
      const orderId = await gateway.captureOrderId();
      const confirmationOrderId = await gateway.captureConfirmationOrderId();
      const totalAmount = checkoutAmountToNumber(checkoutSnapshot.total);
      let confirmationPage: OrderConfirmationPage;

      if (paymentProvider === 'PAYAPP') {
        const displayedAmount = await gateway.captureDisplayedAmount();
        annotateDisplayedAmount(testInfo, 'order-all-products-payapp-displayed-amount', displayedAmount, totalAmount);

        const payappFeedback = await postPayappFeedbackWebhook(request, {
          orderNumber: orderId,
          totalAmount,
          recvPhone: config.checkout.phone,
          ...gateway.payappFeedbackData()
        });
        testInfo.annotations.push({
          type: 'order-all-products-payapp-feedback',
          description: JSON.stringify({
            orderId,
            totalAmount,
            paymentProvider,
            webhookStatus: payappFeedback.status,
            webhookBody: payappFeedback.body
          })
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
        testInfo.annotations.push({
          type: 'order-all-products-payment-webhook',
          description: JSON.stringify({
            orderId,
            totalAmount,
            webhookStatus: webhookResult.status,
            webhookBody: webhookResult.body
          })
        });

        confirmationPage = await gateway.gotoOrderConfirmation(confirmationOrderId);
      }

      await confirmationPage.expectLoaded();
      await confirmationPage.expectMatchesCheckoutSnapshot(checkoutSnapshot, { allowServerRepricedTotal: true });

      const completionDetails = await waitForOrderCompletionDetails(page.context().request, confirmationOrderId, {
        orderNumber: orderId,
        totalAmount,
        minItemCount: cartItems.length,
        productNames: cartItems.map((item) => item.productName)
      }).catch((error: unknown) => {
        if (isCompletionDetailsAuthFailure(error)) {
          testInfo.annotations.push({
            type: 'order-all-products-completion-details-skipped',
            description: String(error)
          });
          return undefined;
        }

        throw error;
      });

      if (completionDetails) {
        expectOrderCompletionDetailsToMatchCheckout(completionDetails, checkoutSnapshot);
        testInfo.annotations.push({
          type: 'order-all-products-completion-details',
          description: JSON.stringify(summarizeOrderCompletionDetails(completionDetails))
        });
      }
    });
  });
});

type AddProductToCartOptions = {
  expectedCartItemCount: number;
  runMarker: string;
};

type AddProductToCartResult = {
  cart: CartDrawer;
  configuredProduct: CartLineItem;
  visibleItems: CartLineItem[];
};

async function addProductToCartWithArtwork(
  page: Page,
  product: RegressionProductCandidate,
  artworkFile: string,
  options: AddProductToCartOptions
): Promise<AddProductToCartResult> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    let configuredProduct: CartLineItem | undefined;

    try {
      const productPage = new ProductPage(page);

      await productPage.goto(product.path);
      configuredProduct = await productPage.configureOrderAllProduct(product);

      const uploadModal = await productPage.openUploadModalIfPresent();
      const cart = uploadModal
        ? await addUploadedArtworkToCart(uploadModal, artworkFile, options.runMarker, product.productName)
        : await productPage.currentOrOpenCartDrawer();
      const visibleItems = await cart.captureAllItems();

      if (visibleItems.length >= options.expectedCartItemCount) {
        return {
          cart,
          configuredProduct,
          visibleItems
        };
      }

      throw new Error(
        `Cart contained ${visibleItems.length} item(s), expected at least ${options.expectedCartItemCount} after adding ${product.productName}.`
      );
    } catch (error) {
      lastError = error;

      if (configuredProduct) {
        const recovered = await recoverCartAfterFailedAdd(page, options.expectedCartItemCount).catch(() => undefined);

        if (recovered) {
          return {
            cart: recovered.cart,
            configuredProduct,
            visibleItems: recovered.visibleItems
          };
        }
      }

      await retryDelay(2_000 * attempt);
    }
  }

  throw new Error(`Could not add ${product.productName} to the cart after 3 attempts.`, { cause: lastError });
}

async function retryDelay(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

function isCompletionDetailsAuthFailure(error: unknown): boolean {
  return error instanceof Error && /HTTP 40[13]|Unauthenticated|Unauthorized/i.test(error.message);
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

async function addUploadedArtworkToCart(
  uploadModal: Awaited<ReturnType<ProductPage['openUploadModal']>>,
  artworkFile: string,
  runMarker: string,
  productName: string
): Promise<CartDrawer> {
  await uploadModal.fillSpecialRequest(`Order all products ${runMarker} - ${productName}`);
  await uploadModal.uploadDesignFile(artworkFile);
  await uploadModal.expectSelectedFile(artworkFile);
  return uploadModal.addToCart();
}

async function recoverCartAfterFailedAdd(
  page: Page,
  expectedCartItemCount: number
): Promise<{ cart: CartDrawer; visibleItems: CartLineItem[] } | undefined> {
  const closeModalButton = page.getByRole('button', { name: /Close modal|\ubaa8\ub2ec \ub2eb\uae30|\ub2eb\uae30/i }).last();

  if (await closeModalButton.isVisible().catch(() => false)) {
    await closeModalButton.click().catch(() => undefined);
  }

  const productPage = new ProductPage(page);
  const cart = await productPage.currentOrOpenCartDrawer().catch(() => undefined);

  if (!cart) {
    return undefined;
  }

  const visibleItems = await cart.captureAllItems().catch(() => []);
  if (visibleItems.length < expectedCartItemCount) {
    return undefined;
  }

  return {
    cart,
    visibleItems
  };
}

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
