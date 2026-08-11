import { test, expect } from '../../fixtures/e2e-test.js';
import { appPath } from '../../fixtures/env.js';
import { ko } from '../../fixtures/storefront-data.js';

test.describe('storefront v2 error handling', { tag: ['@regression', '@production'] }, () => {
  test.use({ allowGuestUserMe401: true, allowKnownNuxtPayloadFailures: true });

  // Production observation on 2026-08-11: there is no dedicated 404 page. Unknown routes under
  // /kr redirect to the homepage with a 200 status instead of rendering a not-found page. This
  // asserts that verified behavior (safe redirect, no broken/error page) rather than a 404 page.
  test('MS-V2-043 unknown route redirects safely instead of showing a broken page', async ({ page }) => {
    const response = await page.goto(appPath('./this-page-does-not-exist-e2e-check'));

    expect(response?.ok(), 'unknown route should not return a server error status').toBe(true);
    await expect(page.getByRole('heading', { name: ko.homeHero })).toBeVisible();
  });
});
