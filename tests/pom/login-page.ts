import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { appPath } from '../fixtures/env.js';

export class LoginPage {
  readonly page: Page;
  readonly main: Locator;

  constructor(page: Page) {
    this.page = page;
    this.main = page.getByRole('main');
  }

  async goto(redirect?: string): Promise<void> {
    const search = redirect ? `?redirect=${encodeURIComponent(redirect)}` : '';
    const bootstrapPromise = this.page
      .waitForResponse((response) => /\/user\/me(?:\?|$)/i.test(response.url()), { timeout: 10_000 })
      .catch(() => null);

    await this.page.goto(`${appPath('auth/login')}${search}`);
    await bootstrapPromise;
    // The login submit can behave like an unhydrated form button until Nuxt has settled.
    // eslint-disable-next-line playwright/no-networkidle
    await this.page.waitForLoadState('networkidle').catch(() => undefined);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/kr\/auth\/login/);
    await expect(this.main.getByRole('heading', { name: '로그인' })).toBeVisible();
    await expect(this.main.getByRole('button', { name: '회원', exact: true })).toBeVisible();
    await expect(this.main.getByRole('button', { name: '비회원', exact: true })).toBeVisible();
  }

  async login(email: string, password: string): Promise<void> {
    await this.page.getByTestId('auth-login-member-email-input-control').fill(email);
    await this.page.getByTestId('auth-login-member-password-input-control').fill(password);

    const userMeResponse = this.page
      .waitForResponse((response) => response.url().includes('/sys/kr/user/me') && response.status() === 200, {
        timeout: 20_000
      })
      .catch(() => null);

    await this.page.getByTestId('auth-login-submit-member-button').click();
    await Promise.race([
      this.page.waitForURL((url) => !url.pathname.includes('/auth/login'), { timeout: 20_000 }).catch(() => null),
      userMeResponse
    ]);
  }

  async expectLoggedIn(): Promise<void> {
    await expect(this.page).not.toHaveURL(/\/auth\/login/);
  }

  async expectInvalidLoginError(): Promise<void> {
    await this.main.getByRole('textbox', { name: '이메일 주소' }).fill('invalid@example.com');
    await this.main.getByRole('textbox', { name: '비밀번호' }).fill('wrong-password');
    await this.main.getByRole('button', { name: '로그인', exact: true }).click();
    await expect(this.page.getByText(/로그인|일치|잘못|유효|오류|실패/).first()).toBeVisible();
  }

  async switchToNonMember(): Promise<void> {
    const orderNumberInput = this.main.getByRole('textbox', { name: '주문번호' });

    for (let attempt = 0; attempt < 3; attempt += 1) {
      const nonMemberByTestId = this.page.getByTestId('auth-login-mode-non-member-inactive-button');

      if (await nonMemberByTestId.count()) {
        await nonMemberByTestId.click();
      } else {
        await this.main.getByRole('button', { name: '비회원', exact: true }).click();
      }

      if (await orderNumberInput.isVisible().catch(() => false)) {
        await expect(orderNumberInput).toBeVisible();
        return;
      }

      await this.page.waitForTimeout(500);
    }

    await expect(orderNumberInput).toBeVisible();
  }

  async expectNonMemberLookupValidation(): Promise<void> {
    await this.switchToNonMember();
    await this.main.getByRole('button', { name: '주문을 확인하세요' }).click();
    await expect(this.main.getByRole('textbox', { name: '이메일 주소' })).toBeVisible();
    await expect(this.main.getByRole('textbox', { name: '주문번호' })).toBeVisible();
  }

  async goToRegister(): Promise<void> {
    await this.main.getByRole('link', { name: '계정 만들기' }).click();
    await expect(this.page).toHaveURL(/\/kr\/auth\/register\/?$/);
  }
}
