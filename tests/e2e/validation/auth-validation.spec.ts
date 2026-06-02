import { test } from '../../fixtures/e2e-test.js';
import { LoginPage } from '../../pom/login-page.js';
import { RegisterPage } from '../../pom/register-page.js';

test.describe('auth validation and error handling', { tag: ['@regression', '@auth', '@validation', '@error-handling'] }, () => {
  test.use({ allowGuestUserMe401: true, allowExpectedAuthFailures: true });

  test('invalid member login stays on login form and shows feedback', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.expectLoaded();
    await loginPage.expectInvalidLoginError();
  });

  test('registration form validates required fields without creating a user', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    await registerPage.expectLoaded();
    await registerPage.expectClientValidationWithoutSubmittingUser();
  });

  test('non-member order lookup requires email and order number', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.expectLoaded();
    await loginPage.expectNonMemberLookupValidation();
  });
});
