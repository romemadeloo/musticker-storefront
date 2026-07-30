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

  test('registration rejects an invalid email and weak password before OTP', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    await registerPage.expectLoaded();
    await registerPage.expectInvalidCredentialsValidation();
  });

  test('non-member order lookup requires email and order number', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.expectLoaded();
    await loginPage.expectNonMemberLookupValidation();
  });

  test('non-member order lookup does not expose a mismatched order', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.expectLoaded();
    await loginPage.expectNonMemberLookupRejected('nonmember-e2e@example.com', 'AO-000000000000-none');
  });
});
