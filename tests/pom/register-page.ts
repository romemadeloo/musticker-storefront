import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { appPath } from '../fixtures/env.js';

export type RegistrationProfile = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const profilePicture = {
  name: 'profile-picture.png',
  mimeType: 'image/png',
  buffer: Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=',
    'base64'
  )
};

export class RegisterPage {
  readonly page: Page;
  readonly main: Locator;

  constructor(page: Page) {
    this.page = page;
    this.main = page.getByRole('main');
  }

  async goto(): Promise<void> {
    const bootstrapPromise = this.page
      .waitForResponse((response) => /\/user\/me(?:\?|$)/i.test(response.url()), { timeout: 10_000 })
      .catch(() => null);

    await this.page.goto(appPath('auth/register'));
    await bootstrapPromise;
    // The register button can act like an unhydrated form reset before Nuxt finishes binding handlers.
    // eslint-disable-next-line playwright/no-networkidle
    await this.page.waitForLoadState('networkidle').catch(() => undefined);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/kr\/auth\/register\/?$/);
    await expect(this.main.getByRole('heading', { name: '회원가입' })).toBeVisible();
    await expect(this.page.getByTestId('auth-register-submit')).toBeVisible();
  }

  async expectClientValidationWithoutSubmittingUser(): Promise<void> {
    await this.page.getByTestId('auth-register-submit').click();
    await expect(this.page.getByTestId('auth-register-first-name-input-control')).toBeVisible();
    await expect(this.page.getByTestId('auth-register-email-input-control')).toBeVisible();
    await expect(this.page.getByTestId('auth-register-password-input-control')).toBeVisible();
    await expect(this.page).toHaveURL(/\/kr\/auth\/register\/?$/);
  }

  async submitRegistration(profile: RegistrationProfile): Promise<void> {
    const firstName = this.page.getByTestId('auth-register-first-name-input-control');
    const lastName = this.page.getByTestId('auth-register-last-name-input-control');
    const email = this.page.getByTestId('auth-register-email-input-control');
    const password = this.page.getByTestId('auth-register-password-input-control');

    await expect(firstName).toBeVisible();
    await firstName.fill(profile.firstName);
    await lastName.fill(profile.lastName);
    await email.fill(profile.email);
    await password.fill(profile.password);
    await expect(firstName).toHaveValue(profile.firstName);
    await expect(lastName).toHaveValue(profile.lastName);
    await expect(email).toHaveValue(profile.email);
    await expect(password).toHaveValue(profile.password);
    await this.page.getByTestId('auth-register-agree-terms-control').check({ force: true });

    const verificationResponsePromise = this.page
      .waitForResponse(
        (response) =>
          response.request().method() !== 'GET' &&
          /auth\/register\/verification/i.test(response.url()) &&
          response.status() < 500,
        { timeout: 15_000 }
      )
      .catch(() => null);

    await this.page.getByTestId('auth-register-submit').click();
    await verificationResponsePromise;
    await expect(this.page.getByTestId('auth-register-verification-submit')).toBeVisible({ timeout: 15_000 });
  }

  async submitOtp(otp: string): Promise<void> {
    const codeInputs = this.page.locator('[data-testid^="auth-register-verification-code-"]');
    await expect(codeInputs.first()).toBeVisible({ timeout: 15_000 });

    for (let index = 0; index < otp.length; index += 1) {
      await codeInputs.nth(index).fill(otp[index]);
    }

    const verificationResponsePromise = this.page
      .waitForResponse(
        (response) =>
          response.request().method() !== 'GET' &&
          /auth\/register\/verification|auth\/register|verify/i.test(response.url()) &&
          response.status() < 500,
        { timeout: 15_000 }
      )
      .catch(() => null);

    await this.page.getByTestId('auth-register-verification-submit').click();
    await verificationResponsePromise;
    await this.page.waitForLoadState('domcontentloaded').catch(() => undefined);
  }

  async completeProfileSetup(profile: RegistrationProfile): Promise<void> {
    await this.uploadProfilePictureIfPresent();
    await this.fillIfVisible(/이름|First/i, profile.firstName);
    await this.fillIfVisible(/성|Last/i, profile.lastName);
    await this.clickFirstVisibleButton(/저장|완료|계속|시작|다음|Save|Complete|Continue|Start|Finish/i, false);
    await this.page.waitForLoadState('domcontentloaded').catch(() => undefined);
  }

  async completeTourGuideIfPresent(): Promise<void> {
    for (let attempt = 0; attempt < 6; attempt += 1) {
      const clicked = await this.clickFirstVisibleButton(
        /건너뛰기|닫기|완료|시작하기|Skip|Close|Done|Finish|Got it/i,
        false
      );

      if (!clicked) {
        return;
      }

      await this.page.waitForTimeout(500);
    }
  }

  async expectSetupComplete(): Promise<void> {
    await expect(this.page).not.toHaveURL(/\/auth\/register/);
    await expect(this.page.getByTestId('app-header-account-toggle-button')).toBeVisible();
  }

  private async uploadProfilePictureIfPresent(): Promise<void> {
    const fileInput = this.page.locator('input[type="file"]').first();

    if (await fileInput.count()) {
      await fileInput.setInputFiles(profilePicture).catch(() => undefined);
      return;
    }

    const uploadButton = this.page.getByRole('button', {
      name: /프로필|사진|이미지|업로드|Upload|Choose|Photo|Image/i
    }).first();

    if (!(await uploadButton.isVisible().catch(() => false))) {
      return;
    }

    const chooserPromise = this.page.waitForEvent('filechooser', { timeout: 3_000 }).catch(() => null);
    await uploadButton.click();
    const chooser = await chooserPromise;
    await chooser?.setFiles(profilePicture);
  }

  private async fillIfVisible(name: RegExp, value: string): Promise<void> {
    const field = this.page.getByRole('textbox', { name }).first();
    if ((await field.isVisible().catch(() => false)) && (await field.isEditable().catch(() => false))) {
      await field.fill(value);
    }
  }

  private async clickFirstVisibleButton(pattern: RegExp, required = true): Promise<boolean> {
    const buttons = this.page.getByRole('button', { name: pattern });
    const count = await buttons.count();

    for (let index = 0; index < count; index += 1) {
      const button = buttons.nth(index);
      if ((await button.isVisible().catch(() => false)) && (await button.isEnabled().catch(() => false))) {
        await button.click();
        return true;
      }
    }

    if (required) {
      throw new Error(`No visible button matched ${pattern}.`);
    }

    return false;
  }
}
