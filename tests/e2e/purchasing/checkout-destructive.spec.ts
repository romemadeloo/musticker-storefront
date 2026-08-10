import { test, expect } from '../../fixtures/e2e-test.js';

const canRunDestructiveCheckout = process.env.RUN_PAYMENT_E2E === 'true';

test.describe('storefront v2 destructive checkout', { tag: ['@e2e', '@destructive', '@slow', '@payment'] }, () => {
  test.skip(
    !canRunDestructiveCheckout,
    'MS-V2-025 is guarded because it creates checkout/order side effects.'
  );

  test('MS-V2-025 full product-to-checkout flow requires sandbox checkout implementation', async () => {
    test.info().annotations.push({
      type: 'todo',
      description: 'Implement only against a sandbox environment with safe payment/order cleanup.'
    });
    expect(canRunDestructiveCheckout).toBe(true);
  });
});
