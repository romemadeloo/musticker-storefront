import { test, expect } from '../../fixtures/e2e-test.js';
import { env } from '../../fixtures/env.js';
import { HeaderComponent } from '../../pom/header-component.js';
import { HomeV2Page } from '../../pom/home-page.js';
import { LoginPage } from '../../pom/login-page.js';

test.describe('storefront authentication', { tag: ['@auth', '@production'] }, () => {
  test.use({ allowGuestUserMe401: true, allowExpectedAuthFailures: true, allowKnownNuxtPayloadFailures: true });

  test('MS-V2-026 account navigation opens login', async ({ page }) => {
    const home = new HomeV2Page(page);

    await home.goto();
    await home.openAccountEntry();

    const login = new LoginPage(page);
    await login.expectMemberLoginControls();
  });

  test('MS-V2-027 member login form exposes expected controls', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.expectMemberLoginControls();
  });

  test.fixme('MS-V2-031 password visibility toggle masks and unmasks password', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.togglePasswordVisibility();
    await expect(page).toHaveURL(/\/kr\/auth\/login\/?$/);
  });

  test('MS-V2-033 register entry is reachable from login', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.openRegister();
    await expect(page.getByTestId('auth-register-page')).toBeVisible();
  });

  test('MS-V2-034 seeded member can log in @credentialed', async ({ page }) => {
    test.skip(!env.AUTH_TEST_EMAIL || !env.AUTH_TEST_PASSWORD, 'Set AUTH_TEST_EMAIL and AUTH_TEST_PASSWORD to run.');

    const login = new LoginPage(page);
    const header = new HeaderComponent(page);

    await login.goto();
    await login.loginWithCredentials(env.AUTH_TEST_EMAIL!, env.AUTH_TEST_PASSWORD!);
    await header.expectMemberMenu();
  });

  test('MS-V2-035 seeded member can log out @credentialed', async ({ page }) => {
    test.skip(!env.AUTH_TEST_EMAIL || !env.AUTH_TEST_PASSWORD, 'Set AUTH_TEST_EMAIL and AUTH_TEST_PASSWORD to run.');

    const login = new LoginPage(page);
    const header = new HeaderComponent(page);

    await login.goto();
    await login.loginWithCredentials(env.AUTH_TEST_EMAIL!, env.AUTH_TEST_PASSWORD!);
    await header.logout();
    await expect(page.getByTestId('app-header-account-dropdown-guest')).toBeVisible();
  });
});
