import { test } from '../fixtures/e2e-test';
import { hasSeededUser, seededUser } from '../fixtures/env';
import { HeaderComponent } from '../pom/header-component';
import { HomePage } from '../pom/home-page';
import { LoginPage } from '../pom/login-page';
import { RegisterPage } from '../pom/register-page';

test.describe('auth', { tag: '@regression' }, () => {
  test.use({ allowGuestUserMe401: true, allowExpectedAuthFailures: true });

  test('seeded member can log in from the account menu', { tag: ['@smoke', '@auth'] }, async ({ page }) => {
    test.skip(!hasSeededUser(), 'Set TEST_USER_EMAIL and TEST_USER_PASSWORD to run seeded login.');

    const home = new HomePage(page);
    const user = seededUser();

    await home.goto();
    await home.header.chooseLoginFromAccountMenu();

    const loginPage = new LoginPage(page);
    await loginPage.expectLoaded();
    await loginPage.login(user.email, user.password);
    await loginPage.expectLoggedIn();
  });

  test('invalid member login stays on login form and shows feedback', { tag: '@auth' }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.expectLoaded();
    await loginPage.expectInvalidLoginError();
  });

  test('registration form validates required fields without creating a user', { tag: '@auth' }, async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    await registerPage.expectLoaded();
    await registerPage.expectClientValidationWithoutSubmittingUser();
  });

  test('non-member order lookup requires email and order number', { tag: '@auth' }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.expectLoaded();
    await loginPage.expectNonMemberLookupValidation();
  });

  test('guest account menu exposes login and registration actions', { tag: ['@smoke', '@auth'] }, async ({ page }) => {
    const home = new HomePage(page);
    const header = new HeaderComponent(page);

    await home.goto();
    await header.openAccountMenu();
    await page.getByRole('menuitem', { name: '회원가입' }).click();
    await page.waitForURL(/\/kr\/auth\/register\/?$/);
  });
});
