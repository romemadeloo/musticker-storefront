import { test, expect } from '../../fixtures/e2e-test.js';
import { appPath, hasSeededUser, seededUser } from '../../fixtures/env.js';
import { HeaderComponent } from '../../pom/header-component.js';
import { HomePage } from '../../pom/home-page.js';
import { LoginPage } from '../../pom/login-page.js';

test.describe('auth', { tag: ['@regression', '@auth'] }, () => {
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

  test('guest account menu exposes login and registration actions', { tag: ['@smoke', '@auth'] }, async ({ page }) => {
    const home = new HomePage(page);
    const header = new HeaderComponent(page);

    await home.goto();
    await header.openAccountMenu();
    await page.getByTestId('app-header-account-register').click();
    await expect(page).toHaveURL(/\/kr\/auth\/register\/?$/);
  });

  test('member session survives navigation and logout blocks account routes', { tag: '@auth' }, async ({ page }) => {
    test.skip(!hasSeededUser(), 'Set TEST_USER_EMAIL and TEST_USER_PASSWORD to run member session coverage.');

    const loginPage = new LoginPage(page);
    const header = new HeaderComponent(page);
    const user = seededUser();

    await loginPage.goto();
    await loginPage.expectLoaded();
    await loginPage.login(user.email, user.password);
    await loginPage.expectLoggedIn();

    await page.reload();
    await header.expectMemberMenu();
    await page.keyboard.press('Escape');

    await page.goto(appPath('stickers'));
    await header.expectMemberMenu();
    await page.keyboard.press('Escape');

    await header.logout();
    await page.goto(appPath('account/orders'));

    await expect(page).toHaveURL(/\/kr\/?$/);
    await header.openAccountMenu();
    await expect(page.getByTestId('app-header-account-dropdown-guest')).toBeVisible();
  });
});
