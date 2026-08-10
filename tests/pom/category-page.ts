import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { appPath } from '../fixtures/env.js';

export class CategoryV2Page {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string, heading: string): Promise<void> {
    await this.page.goto(appPath(path));
    await expect(this.page.getByRole('heading', { name: heading, exact: true }).first()).toBeVisible();
  }

  async expectProductLinks(productNames: readonly string[]): Promise<void> {
    for (const productName of productNames) {
      await expect(this.productLink(productName)).toBeVisible();
    }
  }

  async openProduct(productName: string, expectedPath: RegExp): Promise<void> {
    await this.productLink(productName).click();
    await expect(this.page).toHaveURL(expectedPath);
  }

  private productLink(productName: string) {
    return this.page.getByRole('link', { name: new RegExp(escapeRegExp(productName)) }).first();
  }
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
