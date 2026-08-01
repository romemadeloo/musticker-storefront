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
  53  |   async expectInvalidCredentialsValidation(): Promise<void> {
  54  |     const fullName = this.page.getByTestId('auth-register-full-name-input-control');
  55  |     const firstName = this.page.getByTestId('auth-register-first-name-input-control');
  56  |     const lastName = this.page.getByTestId('auth-register-last-name-input-control');
  57  |     const email = this.page.getByTestId('auth-register-email-input-control');
  58  |     const password = this.page.getByTestId('auth-register-password-input-control');
  59  | 
  60  |     if (await fullName.isVisible().catch(() => false)) {
  61  |       await fullName.fill('Musticker E2E');
  62  |     } else {
  63  |       await firstName.fill('Musticker');
  64  |       await lastName.fill('E2E');
  65  |     }
  66  | 
  67  |     await email.fill('invalid-email');
  68  |     await password.fill('123');
  69  |     await this.page.getByTestId('auth-register-agree-terms-control').check({ force: true });
  70  |     await this.page.getByTestId('auth-register-submit').click();
  71  | 
  72  |     await expect(this.page).toHaveURL(/\/kr\/auth\/register\/?$/);
  73  |     await expect(this.page.getByTestId('auth-register-verification-submit')).toHaveCount(0);
  74  |     expect(await email.evaluate((element) => !(element as HTMLInputElement).checkValidity())).toBe(true);
  75  |   }
  76  | 
  77  |   async submitRegistration(profile: RegistrationProfile): Promise<void> {
  78  |     const fullNameInput = this.page.getByTestId('auth-register-full-name-input-control');
  79  |     const firstName = this.page.getByTestId('auth-register-first-name-input-control');
  80  |     const lastName = this.page.getByTestId('auth-register-last-name-input-control');
  81  |     const email = this.page.getByTestId('auth-register-email-input-control');
  82  |     const password = this.page.getByTestId('auth-register-password-input-control');
  83  |     const fullName = `${profile.firstName} ${profile.lastName}`;
  84  | 
  85  |     if (await fullNameInput.isVisible().catch(() => false)) {
  86  |       await fullNameInput.fill(fullName);
  87  |       await expect(fullNameInput).toHaveValue(fullName);
  88  |     } else {
  89  |       await expect(firstName).toBeVisible();
  90  |       await firstName.fill(profile.firstName);
  91  |       await lastName.fill(profile.lastName);
  92  |       await expect(firstName).toHaveValue(profile.firstName);
  93  |       await expect(lastName).toHaveValue(profile.lastName);
  94  |     }
  95  |     await email.fill(profile.email);
  96  |     await password.fill(profile.password);
  97  |     await expect(email).toHaveValue(profile.email);
  98  |     await expect(password).toHaveValue(profile.password);
  99  |     await this.page.getByTestId('auth-register-agree-terms-control').check({ force: true });
  100 | 
  101 |     const verificationResponsePromise = this.page
  102 |       .waitForResponse(
  103 |         (response) =>
  104 |           response.request().method() !== 'GET' &&
  105 |           /auth\/register\/verification/i.test(response.url()) &&
  106 |           response.status() < 500,
  107 |         { timeout: 15_000 }
  108 |       )
  109 |       .catch(() => null);
  110 | 
  111 |     await this.page.getByTestId('auth-register-submit').click();
  112 |     await verificationResponsePromise;
  113 |     await expect(this.page.getByTestId('auth-register-verification-submit')).toBeVisible({ timeout: 15_000 });
  114 |   }
  115 | 
  116 |   async submitOtp(otp: string): Promise<void> {
  117 |     const codeInputs = this.page.locator('[data-testid^="auth-register-verification-code-"]');
  118 |     await expect(codeInputs.first()).toBeVisible({ timeout: 15_000 });
  119 | 
  120 |     for (let index = 0; index < otp.length; index += 1) {
  121 |       await codeInputs.nth(index).fill(otp[index]);
  122 |     }
  123 | 
  124 |     const verificationResponsePromise = this.page
  125 |       .waitForResponse(
  126 |         (response) =>
  127 |           response.request().method() !== 'GET' &&
  128 |           /auth\/register\/verification|auth\/register|verify/i.test(response.url()) &&
  129 |           response.status() < 500,
  130 |         { timeout: 15_000 }
  131 |       )
  132 |       .catch(() => null);
```