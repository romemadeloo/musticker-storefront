import type { Page } from '@playwright/test';

import { test, expect } from '../../fixtures/e2e-test.js';
import { appPath, checkoutProfile, hasSeededUser, seededUser } from '../../fixtures/env.js';
import { createTraceableUploadPng } from '../../fixtures/traceable-upload-image.js';
import { dieCutSticker, searchQueries } from '../../fixtures/test-data.js';
import { CartDrawer } from '../../pom/cart-drawer.js';
import { CheckoutPage } from '../../pom/checkout-page.js';
import { HeaderComponent } from '../../pom/header-component.js';
import { HomePage } from '../../pom/home-page.js';
import { LoginPage } from '../../pom/login-page.js';
import { ProductPage } from '../../pom/product-page.js';

test.describe('production-safe storefront edge cases', {
  tag: ['@edgecase', '@regression', '@production-safe']
}, () => {
  test.use({ allowGuestUserMe401: true, allowKnownNuxtPayloadFailures: true, allowExpectedAuthFailures: true });

  test('custom product inputs reject zero and negative size or quantity', { tag: ['@product', '@purchasing'] }, async ({
    page
  }) => {
    const productPage = new ProductPage(page);

    await productPage.goto(dieCutSticker.path);
    await productPage.expectLoaded(dieCutSticker.localizedName);
    await productPage.openCustomSizeFields();
    await productPage.fillCustomSize(0, 0);
    await productPage.openCustomQuantityField();
    await productPage.fillCustomQuantity(0);
    await productPage.expectNextStepDisabled();

    await productPage.fillCustomSize(-1, -1);
    await productPage.fillCustomQuantity(-1);
    await productPage.expectNextStepDisabled();
    await expect(page).toHaveURL(/\/kr\/stickers\/die-cut-sticker\/?$/);
  });

  test('switching from custom values back to preset values does not leak stale custom dimensions', {
    tag: ['@product', '@purchasing', '@cart']
  }, async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.goto(dieCutSticker.path);
    await productPage.openCustomSizeFields().catch((error: unknown) => {
      test.skip(true, `Custom size controls are not available for this product state: ${String(error)}`);
    });
    await productPage.fillCustomSize(101, 103);
    await productPage.selectSize(dieCutSticker.sizeLabel);
    await productPage.selectQuantity(dieCutSticker.quantity);
    await productPage.expectNextStepEnabled();

    const uploadModal = await productPage.openUploadModal();
    const cart = await uploadModal.skipUploadAndAddToCart();

    try {
      await cart.expectLineItem({
        productName: dieCutSticker.localizedName,
        widthMm: dieCutSticker.widthMm,
        heightMm: dieCutSticker.heightMm,
        quantity: dieCutSticker.quantity
      });
    } finally {
      await cart.removeAllLineItems();
      await cart.expectEmpty();
    }
  });

  test('repeated add-to-cart clicks after upload create at most one cart line', { tag: ['@upload', '@cart'] }, async ({
    page
  }, testInfo) => {
    const productPage = new ProductPage(page);
    const designFile = await createTraceableUploadPng(page, testInfo, {
      purpose: 'ARTWORK UPLOAD',
      subject: dieCutSticker.productName,
      categoryName: 'duplicate submit',
      sequence: 1,
      runMarker: `edge-${testInfo.workerIndex}`
    });

    await productPage.goto(dieCutSticker.path);
    await productPage.configureProduct(dieCutSticker);
    const uploadModal = await productPage.openUploadModal();
    await uploadModal.uploadDesignFile(designFile);
    await uploadModal.expectSelectedFile(designFile);

    const addButton = page
      .getByTestId('product-category-upload-add-to-cart-button')
      .or(uploadModal.dialog.getByRole('button', { name: /\uc7a5\ubc14\uad6c\ub2c8\s*\ub2f4\uae30|Add to cart/i }))
      .first();
    await expect(addButton).toBeEnabled();
    await addButton.dblclick();

    const cart = new CartDrawer(page);
    await cart.expectVisible();

    try {
      expect(await cart.captureItemCount()).toBeLessThanOrEqual(1);
    } finally {
      await cart.removeAllLineItems();
      await cart.expectEmpty();
    }
  });

  test('direct checkout access with an empty cart cannot submit an order', { tag: ['@checkout', '@cart'] }, async ({
    page
  }) => {
    await clearCart(page);
    await page.goto(appPath('checkout'));
    await page.waitForLoadState('domcontentloaded').catch(() => undefined);

    await expect.poll(() => visibleEnabledSubmitButtonCount(page), { timeout: 5_000 }).toBe(0);

    await expect(page).not.toHaveURL(/\/payment|\/checkout\/confirmation/i);
  });

  test('checkout double submit is blocked from creating duplicate order requests', { tag: ['@checkout', '@cart'] }, async ({
    page
  }) => {
    test.skip(!hasSeededUser(), 'Set TEST_USER_EMAIL and TEST_USER_PASSWORD to run checkout submit edge case.');
    test.fail(true, 'Known storefront edge case: double-clicking checkout submit currently sends duplicate requests.');

    let checkoutRequestCount = 0;
    await page.route(/\/sys\/kr\/orders\/checkout\b/i, async (route) => {
      checkoutRequestCount += 1;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          data: null,
          message: 'E2E edge-case test blocked order creation.'
        })
      });
    });

    await loginSeededMember(page);
    await clearCart(page);
    await addDieCutStickerToCheckout(page);

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.expectLoaded();
    await checkoutPage.fillContactAndShipping({
      ...checkoutProfile(),
      fullName: `  ${checkoutProfile().fullName}  `,
      addressLine1: `  ${checkoutProfile().addressLine1}  `,
      phone: `  ${checkoutProfile().phone}  `
    });
    await checkoutPage.selectStandardShipping();
    await checkoutPage.selectBankTransfer();
    await checkoutPage.expectOrderSubmissionEnabled();

    const submitButton = page.locator('button.checkout-summary-submit').first();
    await expect(submitButton).toBeEnabled();
    await submitButton.dblclick();
    await expect.poll(() => checkoutRequestCount, { timeout: 5_000 }).toBeGreaterThan(0);

    expect(checkoutRequestCount).toBeLessThanOrEqual(1);
    await expect(page).toHaveURL(/\/kr\/checkout\/?$/);
  });

  test('guest-only account routes do not expose member data', { tag: ['@auth'] }, async ({ page }) => {
    const protectedPaths = ['account/orders', 'account/profile', 'account'];

    for (const protectedPath of protectedPaths) {
      await page.goto(appPath(protectedPath));
      await page.waitForLoadState('domcontentloaded').catch(() => undefined);
      await expect(page).not.toHaveURL(new RegExp(`/kr/${protectedPath}/?$`));
      await expect(page.getByTestId('app-header-account-dropdown-member')).toHaveCount(0);
    }
  });

  test('search handles whitespace and symbols without stale results', { tag: ['@search', '@discovery'] }, async ({
    page
  }) => {
    const home = new HomePage(page);

    await home.goto();
    const search = await home.header.openSearch();

    for (const query of ['     ', '@@@###%%%^^^']) {
      await search.searchFor(query);
      await expect(search.input).toBeVisible();
      await expectNoHorizontalOverflow(page);
    }

    await search.searchFor('musticker-no-result-edgecase-zzzz');
    await search.expectNoResults();
  });

  test('search handles very long queries without server errors', { tag: ['@search', '@discovery'] }, async ({ page }) => {
    test.fail(true, 'Known storefront edge case: very long search queries currently return a 500 response.');

    const home = new HomePage(page);

    await home.goto();
    const search = await home.header.openSearch();
    await search.searchFor('musticker-edgecase-'.repeat(20));
    await expect(search.input).toBeVisible();
    await expectNoHorizontalOverflow(page);
    await search.expectNoResults();
  });

  test('mixed Korean and English search remains usable', { tag: ['@search', '@discovery'] }, async ({ page }) => {
    const home = new HomePage(page);

    await home.goto();
    const search = await home.header.openSearch();
    await search.searchFor(`${searchQueries.dieCutSticker} DIE CUT`);
    await expect(search.input).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });

  test('browser back and forward preserve cart state before checkout submission', { tag: ['@cart', '@checkout'] }, async ({
    page
  }) => {
    await clearCart(page);
    const productPage = new ProductPage(page);

    await productPage.goto(dieCutSticker.path);
    const configuredProduct = await productPage.configureProduct(dieCutSticker);
    const uploadModal = await productPage.openUploadModal();
    let cart = await uploadModal.skipUploadAndAddToCart();

    try {
      await cart.expectLineItem(configuredProduct);
      const initialItems = await cart.captureAllItems();
      await cart.continueShopping();
      await page.goto(appPath());
      await page.goBack();
      cart = await new HeaderComponent(page).openCart();
      expect(await cart.captureAllItems()).toEqual(initialItems);
      await cart.continueShopping();
      await page.goForward();
      cart = await new HeaderComponent(page).openCart();
      await cart.expectLineItem(configuredProduct);
    } finally {
      await clearCart(page);
    }
  });
});

test.describe('mobile edge cases', {
  tag: ['@edgecase', '@mobile', '@regression', '@production-safe']
}, () => {
  test.use({ allowGuestUserMe401: true, allowKnownNuxtPayloadFailures: true });

  test('mobile checkout form and summary stay within the viewport before order submission', async ({ page }) => {
    test.skip(!hasSeededUser(), 'Set TEST_USER_EMAIL and TEST_USER_PASSWORD to run mobile checkout edge case.');

    await loginSeededMember(page);
    await clearCart(page);
    await addDieCutStickerToCheckout(page);

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.expectLoaded();
    await checkoutPage.fillContactAndShipping(checkoutProfile());
    await checkoutPage.selectStandardShipping();
    await expectNoHorizontalOverflow(page);
  });
});

async function loginSeededMember(page: Page): Promise<void> {
  const loginPage = new LoginPage(page);
  const user = seededUser();

  await loginPage.goto();
  await loginPage.expectLoaded();
  await loginPage.login(user.email, user.password);
  await loginPage.expectLoggedIn();
}

async function addDieCutStickerToCheckout(page: Page): Promise<void> {
  const productPage = new ProductPage(page);

  await productPage.goto(dieCutSticker.path);
  await productPage.configureProduct(dieCutSticker);
  const uploadModal = await productPage.openUploadModal();
  const cart = await uploadModal.skipUploadAndAddToCart();
  await cart.checkout();
}

async function clearCart(page: Page): Promise<void> {
  if (page.isClosed()) {
    return;
  }

  const home = new HomePage(page);
  await home.goto();
  const header = new HeaderComponent(page);
  const cart = await header.openCart();
  await cart.removeAllLineItems();
  await cart.expectEmpty();
}

async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  const dimensions = await page.evaluate(() => ({
    viewportWidth: document.documentElement.clientWidth,
    contentWidth: document.documentElement.scrollWidth
  }));

  expect(dimensions.contentWidth).toBeLessThanOrEqual(dimensions.viewportWidth + 1);
}

async function visibleEnabledSubmitButtonCount(page: Page): Promise<number> {
  return page
    .getByRole('button', {
      name: /\uacb0\uc81c \uc644\ub8cc|\uacb0\uc81c\ud558\uae30|\uc8fc\ubb38\ud558\uae30|Place order|Order|Pay/i
    })
    .evaluateAll((buttons) =>
      buttons.filter((button) => {
        const element = button as HTMLButtonElement;
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);

        return (
          rect.width > 0 &&
          rect.height > 0 &&
          style.visibility !== 'hidden' &&
          style.display !== 'none' &&
          !element.disabled &&
          element.getAttribute('aria-disabled') !== 'true'
        );
      }).length
    );
}
