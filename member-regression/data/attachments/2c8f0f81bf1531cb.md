# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: regression/member-purchase-regression.spec.ts >> new member purchase regression >> new member can register, log in, buy one product from each category, and confirm Toss bank transfer
- Location: tests/e2e/regression/member-purchase-regression.spec.ts:41:3

# Error details

```
Error: page.goto: net::ERR_NAME_NOT_RESOLVED at https://dev.musticker.com/kr/auth/register
Call log:
  - navigating to "https://dev.musticker.com/kr/auth/register", waiting until "load"

```

# Test source

```ts
  1   | import fs from 'node:fs/promises';
  2   | import path from 'node:path';
  3   | 
  4   | import type { Locator, Page } from '@playwright/test';
  5   | import { expect } from '@playwright/test';
  6   | 
  7   | import { appPath } from '../fixtures/env.js';
  8   | 
  9   | export type RegistrationProfile = {
  10  |   email: string;
  11  |   password: string;
  12  |   firstName: string;
  13  |   lastName: string;
  14  | };
  15  | 
  16  | type ProfilePreviewSignature = string;
  17  | 
  18  | export class RegisterPage {
  19  |   readonly page: Page;
  20  |   readonly main: Locator;
  21  | 
  22  |   constructor(page: Page) {
  23  |     this.page = page;
  24  |     this.main = page.getByRole('main');
  25  |   }
  26  | 
  27  |   async goto(): Promise<void> {
  28  |     const bootstrapPromise = this.page
  29  |       .waitForResponse((response) => /\/user\/me(?:\?|$)/i.test(response.url()), { timeout: 10_000 })
  30  |       .catch(() => null);
  31  | 
> 32  |     await this.page.goto(appPath('auth/register'));
      |                     ^ Error: page.goto: net::ERR_NAME_NOT_RESOLVED at https://dev.musticker.com/kr/auth/register
  33  |     await bootstrapPromise;
  34  |     // The register button can act like an unhydrated form reset before Nuxt finishes binding handlers.
  35  |     // eslint-disable-next-line playwright/no-networkidle
  36  |     await this.page.waitForLoadState('networkidle').catch(() => undefined);
  37  |   }
  38  | 
  39  |   async expectLoaded(): Promise<void> {
  40  |     await expect(this.page).toHaveURL(/\/kr\/auth\/register\/?$/);
  41  |     await expect(this.main.getByRole('heading', { name: '회원가입' })).toBeVisible();
  42  |     await expect(this.page.getByTestId('auth-register-submit')).toBeVisible();
  43  |   }
  44  | 
  45  |   async expectClientValidationWithoutSubmittingUser(): Promise<void> {
  46  |     await this.page.getByTestId('auth-register-submit').click();
  47  |     await expect(this.registrationNameInput()).toBeVisible();
  48  |     await expect(this.page.getByTestId('auth-register-email-input-control')).toBeVisible();
  49  |     await expect(this.page.getByTestId('auth-register-password-input-control')).toBeVisible();
  50  |     await expect(this.page).toHaveURL(/\/kr\/auth\/register\/?$/);
  51  |   }
  52  | 
  53  |   async submitRegistration(profile: RegistrationProfile): Promise<void> {
  54  |     const fullNameInput = this.page.getByTestId('auth-register-full-name-input-control');
  55  |     const firstName = this.page.getByTestId('auth-register-first-name-input-control');
  56  |     const lastName = this.page.getByTestId('auth-register-last-name-input-control');
  57  |     const email = this.page.getByTestId('auth-register-email-input-control');
  58  |     const password = this.page.getByTestId('auth-register-password-input-control');
  59  |     const fullName = `${profile.firstName} ${profile.lastName}`;
  60  | 
  61  |     if (await fullNameInput.isVisible().catch(() => false)) {
  62  |       await fullNameInput.fill(fullName);
  63  |       await expect(fullNameInput).toHaveValue(fullName);
  64  |     } else {
  65  |       await expect(firstName).toBeVisible();
  66  |       await firstName.fill(profile.firstName);
  67  |       await lastName.fill(profile.lastName);
  68  |       await expect(firstName).toHaveValue(profile.firstName);
  69  |       await expect(lastName).toHaveValue(profile.lastName);
  70  |     }
  71  |     await email.fill(profile.email);
  72  |     await password.fill(profile.password);
  73  |     await expect(email).toHaveValue(profile.email);
  74  |     await expect(password).toHaveValue(profile.password);
  75  |     await this.page.getByTestId('auth-register-agree-terms-control').check({ force: true });
  76  | 
  77  |     const verificationResponsePromise = this.page
  78  |       .waitForResponse(
  79  |         (response) =>
  80  |           response.request().method() !== 'GET' &&
  81  |           /auth\/register\/verification/i.test(response.url()) &&
  82  |           response.status() < 500,
  83  |         { timeout: 15_000 }
  84  |       )
  85  |       .catch(() => null);
  86  | 
  87  |     await this.page.getByTestId('auth-register-submit').click();
  88  |     await verificationResponsePromise;
  89  |     await expect(this.page.getByTestId('auth-register-verification-submit')).toBeVisible({ timeout: 15_000 });
  90  |   }
  91  | 
  92  |   async submitOtp(otp: string): Promise<void> {
  93  |     const codeInputs = this.page.locator('[data-testid^="auth-register-verification-code-"]');
  94  |     await expect(codeInputs.first()).toBeVisible({ timeout: 15_000 });
  95  | 
  96  |     for (let index = 0; index < otp.length; index += 1) {
  97  |       await codeInputs.nth(index).fill(otp[index]);
  98  |     }
  99  | 
  100 |     const verificationResponsePromise = this.page
  101 |       .waitForResponse(
  102 |         (response) =>
  103 |           response.request().method() !== 'GET' &&
  104 |           /auth\/register\/verification|auth\/register|verify/i.test(response.url()) &&
  105 |           response.status() < 500,
  106 |         { timeout: 15_000 }
  107 |       )
  108 |       .catch(() => null);
  109 | 
  110 |     await this.page.getByTestId('auth-register-verification-submit').click();
  111 |     await verificationResponsePromise;
  112 |     await this.page.waitForLoadState('domcontentloaded').catch(() => undefined);
  113 |   }
  114 | 
  115 |   async completeProfileSetup(profile: RegistrationProfile, profilePicturePath: string): Promise<void> {
  116 |     await this.expectProfileSetupReady();
  117 |     await this.uploadProfilePictureIfPresent(profilePicturePath);
  118 |     const setupResponsePromise = this.waitForProfileSetupResponse();
  119 |     await this.fillIfVisible(/이름|First/i, profile.firstName);
  120 |     await this.fillIfVisible(/성|Last/i, profile.lastName);
  121 |     await this.clickFirstVisibleButton(/저장|완료|계속|시작|다음|Save|Complete|Continue|Start|Finish/i, false);
  122 |     await setupResponsePromise;
  123 |     await this.page.waitForLoadState('domcontentloaded').catch(() => undefined);
  124 |   }
  125 | 
  126 |   async completeTourGuideIfPresent(): Promise<void> {
  127 |     for (let attempt = 0; attempt < 6; attempt += 1) {
  128 |       const clicked = await this.clickFirstVisibleButton(
  129 |         /건너뛰기|닫기|완료|시작하기|Skip|Close|Done|Finish|Got it/i,
  130 |         false
  131 |       );
  132 | 
```