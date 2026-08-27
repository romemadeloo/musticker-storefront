import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { appPath } from '../fixtures/env.js';
import { gotoStorefront } from '../fixtures/navigation.js';

export class LoginPage {
  readonly page: Page;
  readonly root: Locator;
  readonly createAccountLink: Locator;
  readonly memberModeButton: Locator;
  readonly nonMemberModeButton: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly passwordToggleButton: Locator;
  readonly keepSignedInCheckbox: Locator;
  readonly forgotPasswordButton: Locator;
  readonly submitButton: Locator;
  readonly kakaoLoginButton: Locator;
  readonly naverLoginButton: Locator;
  readonly googleLoginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.getByTestId('auth-login-page');
    this.createAccountLink = page.getByTestId('auth-login-create-account-link');
    this.memberModeButton = page.getByTestId('auth-login-mode-member-active-button');
    this.nonMemberModeButton = page.getByTestId('auth-login-mode-non-member-inactive-button');
    this.emailInput = page.getByTestId('auth-login-member-email-input-control');
    this.passwordInput = page.getByTestId('auth-login-member-password-input-control');
    this.passwordToggleButton = page.getByTestId('auth-login-member-password-toggle-button');
    this.keepSignedInCheckbox = page.getByTestId('auth-login-member-keep-signed-in-control');
    this.forgotPasswordButton = page.getByTestId('auth-login-member-forgot-password-button');
    this.submitButton = page.getByTestId('auth-login-submit-member-button');
    this.kakaoLoginButton = page.getByTestId('auth-login-social-kakao');
    this.naverLoginButton = page.getByTestId('auth-login-social-naver');
    this.googleLoginButton = page.getByTestId('auth-login-social-google');
  }

  async goto(): Promise<void> {
    const appBootstrap = Promise.allSettled([
      this.page.waitForResponse((response) => response.url().includes('/sys/kr/navigation/categories'), { timeout: 10_000 }),
      this.page.waitForResponse((response) => response.url().includes('/sys/kr/user/me'), { timeout: 10_000 }),
      this.page.waitForResponse((response) => response.url().includes('/sys/kr/inquiry/types'), { timeout: 10_000 })
    ]);

    await gotoStorefront(this.page, appPath('./auth/login'));
    await this.page.waitForFunction(() => Boolean((document.querySelector('#__nuxt') as Element & { __vue_app__?: unknown })?.__vue_app__));
    await appBootstrap;
    await expect(this.root).toBeVisible();
  }

  async expectMemberLoginControls(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: '\ub85c\uadf8\uc778' })).toBeVisible();
    await expect(this.createAccountLink).toBeVisible();
    await expect(this.memberModeButton).toBeVisible();
    await expect(this.nonMemberModeButton).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.passwordInput).toHaveAttribute('type', 'password');
    await expect(this.passwordToggleButton).toBeVisible();
    await expect(this.keepSignedInCheckbox).toBeVisible();
    await expect(this.forgotPasswordButton).toBeVisible();
    await expect(this.submitButton).toBeVisible();
    await expect(this.kakaoLoginButton).toBeVisible();
    await expect(this.naverLoginButton).toBeVisible();
    await expect(this.googleLoginButton).toBeVisible();
  }

  async togglePasswordVisibility(): Promise<void> {
    await this.passwordInput.fill('temporary-secret');
    await expect(this.passwordInput).toHaveAttribute('type', 'password');
    await this.passwordToggleButton.click();
    await expect(this.passwordInput).toHaveAttribute('type', 'text');
    await this.passwordToggleButton.click();
    await expect(this.passwordInput).toHaveAttribute('type', 'password');
  }

  async openRegister(): Promise<void> {
    await this.createAccountLink.click();
    await expect(this.page).toHaveURL(/\/kr\/auth\/register\/?$/);
  }

  async loginWithCredentials(email: string, password: string): Promise<void> {
    await this.enterCredentialsWithFill(email, password);
    await this.expectCredentialsEntered(email, password);

    const loginSucceeded = await this.submitWithEnter();

    if (!loginSucceeded) {
      await this.submitWithClick();
    }

    await expect(this.page.getByTestId('ui-toast')).toContainText('\ub85c\uadf8\uc778\uc5d0 \uc131\uacf5\ud588\uc2b5\ub2c8\ub2e4');
  }

  private async submitWithEnter(): Promise<boolean> {
    const loginResponse = this.waitForSuccessfulLoginResponse(12_000);

    await this.page.keyboard.press('Enter');

    return loginResponse
      .then(() => true)
      .catch(() => false);
  }

  private async submitWithClick(): Promise<void> {
    const loginResponse = this.waitForSuccessfulLoginResponse(20_000);

    await this.submitButton.click({ force: true });
    await loginResponse;
  }

  private async waitForSuccessfulLoginResponse(timeout: number): Promise<void> {
    await this.page.waitForResponse(
      (response) => response.url().includes('/sys/kr/auth/login') && response.status() === 200,
      { timeout }
    );
  }

  private async enterCredentialsWithFill(email: string, password: string): Promise<void> {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);

      if ((await this.emailInput.inputValue()) === email && (await this.passwordInput.inputValue()).length === password.length) {
        return;
      }
    }

    throw new Error('Login credentials were not retained by the form fields.');
  }

  private async expectCredentialsEntered(email: string, password: string): Promise<void> {
    if ((await this.emailInput.inputValue()) !== email || (await this.passwordInput.inputValue()).length !== password.length) {
      throw new Error('Login credentials were not retained by the form fields.');
    }
  }
}
