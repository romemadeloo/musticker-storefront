import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { appPath } from '../fixtures/env';

export class RegisterPage {
  readonly page: Page;
  readonly main: Locator;

  constructor(page: Page) {
    this.page = page;
    this.main = page.getByRole('main');
  }

  async goto(): Promise<void> {
    await this.page.goto(appPath('auth/register'));
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/kr\/auth\/register\/?$/);
    await expect(this.main.getByRole('heading', { name: '회원가입' })).toBeVisible();
    await expect(this.main.getByRole('button', { name: '계정 만들기' })).toBeVisible();
  }

  async expectClientValidationWithoutSubmittingUser(): Promise<void> {
    await this.main.getByRole('button', { name: '계정 만들기' }).click();
    await expect(this.main.getByRole('textbox', { name: '이름 입력' })).toBeVisible();
    await expect(this.main.getByRole('textbox', { name: '이메일 주소를 입력해 주세요.' })).toBeVisible();
    await expect(this.main.getByRole('textbox', { name: '비밀번호 입력' })).toBeVisible();
    await expect(this.page).toHaveURL(/\/kr\/auth\/register\/?$/);
  }
}
