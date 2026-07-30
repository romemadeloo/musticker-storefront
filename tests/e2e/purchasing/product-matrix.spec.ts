import { test, expect } from '../../fixtures/e2e-test.js';
import { memberPurchaseCategories } from '../../fixtures/test-data.js';
import { ProductPage } from '../../pom/product-page.js';

test.describe('representative product matrix', {
  tag: ['@regression', '@purchasing', '@product', '@production-safe']
}, () => {
  test.use({ allowGuestUserMe401: true, allowKnownNuxtPayloadFailures: true });

  for (const category of memberPurchaseCategories) {
    for (const product of category.products) {
      test(`configures ${product.productName} from ${category.categoryName}`, async ({ page }) => {
        const productPage = new ProductPage(page);

        await productPage.goto(product.path);
        await expect(page).toHaveURL(new RegExp(`${escapeRegExp(product.path.replace('./', '/kr/'))}/?$`));

        const configuredProduct = await productPage.configureRegressionProduct(product);

        expect(configuredProduct.productName).toBe(product.productName);
        expect(configuredProduct.widthMm).toBe(product.widthMm);
        expect(configuredProduct.heightMm).toBe(product.heightMm);
        expect(configuredProduct.quantity).toBe(product.quantity);
        expect(configuredProduct.price).toMatch(/[\d,]+\uc6d0/);
        await productPage.expectVisiblePrice();
        await productPage.expectNextStepEnabled();
      });
    }
  }
});

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
