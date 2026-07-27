import fs from 'node:fs/promises';
import path from 'node:path';

import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { appPath } from '../fixtures/env.js';

export type RegistrationProfile = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

type ProfilePreviewSignature = string;

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
    await expect(this.registrationNameInput()).toBeVisible();
    await expect(this.page.getByTestId('auth-register-email-input-control')).toBeVisible();
    await expect(this.page.getByTestId('auth-register-password-input-control')).toBeVisible();
    await expect(this.page).toHaveURL(/\/kr\/auth\/register\/?$/);
  }

  async submitRegistration(profile: RegistrationProfile): Promise<void> {
    const fullNameInput = this.page.getByTestId('auth-register-full-name-input-control');
    const firstName = this.page.getByTestId('auth-register-first-name-input-control');
    const lastName = this.page.getByTestId('auth-register-last-name-input-control');
    const email = this.page.getByTestId('auth-register-email-input-control');
    const password = this.page.getByTestId('auth-register-password-input-control');
    const fullName = `${profile.firstName} ${profile.lastName}`;

    if (await fullNameInput.isVisible().catch(() => false)) {
      await fullNameInput.fill(fullName);
      await expect(fullNameInput).toHaveValue(fullName);
    } else {
      await expect(firstName).toBeVisible();
      await firstName.fill(profile.firstName);
      await lastName.fill(profile.lastName);
      await expect(firstName).toHaveValue(profile.firstName);
      await expect(lastName).toHaveValue(profile.lastName);
    }
    await email.fill(profile.email);
    await password.fill(profile.password);
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

  async completeProfileSetup(profile: RegistrationProfile, profilePicturePath: string): Promise<void> {
    await this.expectProfileSetupReady();
    await this.uploadProfilePictureIfPresent(profilePicturePath);
    const setupResponsePromise = this.waitForProfileSetupResponse();
    await this.fillIfVisible(/이름|First/i, profile.firstName);
    await this.fillIfVisible(/성|Last/i, profile.lastName);
    await this.clickFirstVisibleButton(/저장|완료|계속|시작|다음|Save|Complete|Continue|Start|Finish/i, false);
    await setupResponsePromise;
    await this.page.waitForLoadState('domcontentloaded').catch(() => undefined);
    await this.waitForBlockingOverlaysToSettle();
  }

  async completeTourGuideIfPresent(): Promise<void> {
    for (let attempt = 0; attempt < 6; attempt += 1) {
      await this.waitForBlockingOverlaysToSettle();
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

  private async uploadProfilePictureIfPresent(profilePicturePath: string): Promise<void> {
    await this.expectUploadFileExists(profilePicturePath);

    const beforePreviewSignatures = await this.profilePreviewSignatures();
    const uploadedByChooser = await this.uploadViaFileChooser(profilePicturePath);

    if (!uploadedByChooser) {
      await this.uploadViaFileInput(profilePicturePath);
    }

    await this.expectProfilePicturePreview(profilePicturePath, beforePreviewSignatures);
  }

  private async uploadViaFileChooser(profilePicturePath: string): Promise<boolean> {
    const uploadButtons = this.profileUploadButtons();
    const uploadButtonCount = await uploadButtons.count();

    for (let index = 0; index < uploadButtonCount; index += 1) {
      const uploadButton = uploadButtons.nth(index);

      if (
        !(await uploadButton.isVisible().catch(() => false)) ||
        !(await uploadButton.isEnabled().catch(() => false))
      ) {
        continue;
      }

      const chooserPromise = this.page.waitForEvent('filechooser', { timeout: 3_000 }).catch(() => null);
      await uploadButton.click();
      const chooser = await chooserPromise;

      if (!chooser) {
        continue;
      }

      const uploadResponsePromise = this.waitForProfilePictureUploadResponse();
      await chooser.setFiles(profilePicturePath);
      await uploadResponsePromise;
      return true;
    }

    return false;
  }

  private async expectProfileSetupReady(): Promise<void> {
    await expect
      .poll(
        async () => {
          const uploadButtons = this.profileUploadButtons();
          const uploadButtonCount = await uploadButtons.count();

          for (let index = 0; index < uploadButtonCount; index += 1) {
            const uploadButton = uploadButtons.nth(index);

            if (
              (await uploadButton.isVisible().catch(() => false)) &&
              (await uploadButton.isEnabled().catch(() => false))
            ) {
              return true;
            }
          }

          return false;
        },
        {
          message: 'Profile setup upload button should be visible after OTP verification.',
          timeout: 20_000
        }
      )
      .toBe(true);
  }

  private profileUploadButtons(): Locator {
    return this.page.locator('button').filter({
      hasText: /프로필|사진|이미지|업로드|Upload|Choose|Photo|Image/i
    });
  }

  private registrationNameInput(): Locator {
    return this.page
      .getByTestId('auth-register-full-name-input-control')
      .or(this.page.getByTestId('auth-register-first-name-input-control'))
      .first();
  }

  private async uploadViaFileInput(profilePicturePath: string): Promise<void> {
    const fileName = path.basename(profilePicturePath);
    const fileInputs = this.page.locator('input[type="file"]');
    const fileInputCount = await fileInputs.count();
    let lastError: unknown;

    for (let index = 0; index < fileInputCount; index += 1) {
      const fileInput = fileInputs.nth(index);
      const accept = await fileInput.getAttribute('accept').catch(() => undefined);

      if (accept && !/image|\*/i.test(accept)) {
        continue;
      }

      try {
        const uploadResponsePromise = this.waitForProfilePictureUploadResponse();
        await fileInput.setInputFiles(profilePicturePath);
        await this.expectSelectedFile(fileInput, fileName);
        await uploadResponsePromise;
        return;
      } catch (error) {
        lastError = error;
      }
    }

    if (lastError) {
      throw lastError;
    }

    throw new Error('No profile picture file input or file chooser was available during registration setup.');
  }

  private async expectUploadFileExists(filePath: string): Promise<void> {
    const file = await fs.stat(filePath);
    expect(file.size, `Generated profile image should not be empty: ${filePath}`).toBeGreaterThan(0);
  }

  private async expectSelectedFile(fileInput: Locator, fileName: string): Promise<void> {
    await expect
      .poll(
        async () =>
          fileInput.evaluate(
            (input, expectedFileName) =>
              input instanceof HTMLInputElement && input.files?.[0]?.name === expectedFileName,
            fileName
          ),
        {
          message: `Profile picture input should contain ${fileName}.`,
          timeout: 5_000
        }
      )
      .toBe(true);
  }

  private async expectProfilePicturePreview(
    profilePicturePath: string,
    beforePreviewSignatures: ProfilePreviewSignature[]
  ): Promise<void> {
    const fileName = path.basename(profilePicturePath);
    const beforeSet = new Set(beforePreviewSignatures);

    await expect
      .poll(
        async () => {
          const afterPreviewSignatures = await this.profilePreviewSignatures();
          return afterPreviewSignatures.some((signature) => !beforeSet.has(signature));
        },
        {
          message: `Profile picture should render a non-blank preview after uploading ${fileName}.`,
          timeout: 15_000
        }
      )
      .toBe(true);
  }

  private async profilePreviewSignatures(): Promise<ProfilePreviewSignature[]> {
    return this.page.evaluate(renderedProfilePreviewSignatures);
  }

  private async waitForProfilePictureUploadResponse(): Promise<unknown> {
    return this.page
      .waitForResponse(
        (response) =>
          response.request().method() !== 'GET' &&
          /profile|avatar|image|file|upload|aws|pre-signed/i.test(response.url()) &&
          response.status() < 500,
        { timeout: 15_000 }
      )
      .catch(() => null);
  }

  private async waitForProfileSetupResponse(): Promise<unknown> {
    return this.page
      .waitForResponse(
        (response) =>
          response.request().method() !== 'GET' &&
          /profile|setup|onboarding|user|member/i.test(response.url()) &&
          response.status() < 500,
        { timeout: 15_000 }
      )
      .catch(() => null);
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
        const clicked = await button
          .click({ timeout: 3_000 })
          .then(() => true)
          .catch(async () => button.click({ force: true, timeout: 1_000 }).then(() => true).catch(() => false));

        if (clicked) {
          return true;
        }
      }
    }

    if (required) {
      throw new Error(`No visible button matched ${pattern}.`);
    }

    return false;
  }

  private async waitForBlockingOverlaysToSettle(): Promise<void> {
    await expect(this.page.getByTestId('auth-profile-complete-onboarding-overlay'))
      .toBeHidden({ timeout: 10_000 })
      .catch(() => undefined);
  }
}

function renderedProfilePreviewSignatures(): ProfilePreviewSignature[] {
  const imageSignatures = Array.from(document.images)
    .filter((image) => {
      const rect = image.getBoundingClientRect();
      const style = window.getComputedStyle(image);
      const alt = image.alt ?? '';
      const source = image.currentSrc || image.src;

      return (
        rect.width >= 40 &&
        rect.height >= 40 &&
        image.naturalWidth > 0 &&
        image.naturalHeight > 0 &&
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        !/logo/i.test(alt) &&
        !/logo/i.test(source)
      );
    })
    .map((image) => `img:${image.currentSrc || image.src}:${image.naturalWidth}x${image.naturalHeight}`);

  const backgroundSignatures = Array.from(document.querySelectorAll<HTMLElement>('*'))
    .filter((element) => {
      const rect = element.getBoundingClientRect();
      const style = window.getComputedStyle(element);

      return (
        rect.width >= 40 &&
        rect.height >= 40 &&
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        style.backgroundImage !== 'none' &&
        /url\(/i.test(style.backgroundImage) &&
        !/logo/i.test(style.backgroundImage)
      );
    })
    .map((element) => `bg:${window.getComputedStyle(element).backgroundImage}`);

  return [...imageSignatures, ...backgroundSignatures];
}
