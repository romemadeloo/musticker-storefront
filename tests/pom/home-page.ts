import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { appPath } from '../fixtures/env';
import { HeaderComponent } from './header-component';

export class HomePage {
  readonly page: Page;
  readonly header: HeaderComponent;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderComponent(page);
  }

  async goto(): Promise<void> {
    await this.page.goto(appPath());
    await this.header.expectVisible();
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle('머스티커 - 커스텀 스티커');
    await this.header.expectVisible();
    await expect(this.page.getByRole('heading', { name: '스티커ㅋㅋㅋ, 이유가 있구나' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: '빠른 주문' })).toBeVisible();
    await expect(this.page.getByRole('contentinfo')).toContainText('MUSTICKER / 머스티커');
    await expect(this.page.getByRole('link', { name: '이용약관' }).first()).toBeVisible();
    await expect(this.page.getByRole('link', { name: '개인정보처리방침' }).first()).toBeVisible();
  }

  async openProductShortcut(productName: string): Promise<void> {
    await this.page.getByRole('link', { name: productName, exact: true }).click();
  }

  async expectReviewCarouselMoves(): Promise<void> {
    const carousel = this.page.getByRole('region', { name: '고객 리뷰 캐러셀' }).first();
    const nextButton = carousel.getByRole('button', { name: /다음 리뷰|다음 리뷰로 이동/ });

    await expect(carousel).toBeVisible();
    await expect(nextButton).toBeEnabled();

    const prevButton = carousel.getByRole('button', { name: /이전 리뷰|이전 리뷰로 이동/ });
    for (let attempt = 0; attempt < 3; attempt += 1) {
      await nextButton.click();
      await this.page.waitForTimeout(500);

      if (await prevButton.isEnabled().catch(() => false)) {
        return;
      }
    }

    await expect(prevButton).toBeEnabled();
  }
}
