import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { appPath } from '../fixtures/env.js';
import { gotoStorefront } from '../fixtures/navigation.js';
import { orderHistoryCopy } from '../fixtures/storefront-data.js';

/**
 * `/kr/account/orders` -- the member account shell's order-history tab.
 *
 * A master/detail layout: `.order-list` on the left holds one `.order-item` card per order, and
 * selecting one routes to `/kr/account/orders/<id>` and fills `.orders-main` with that order's
 * invoice. Verified live against development-1 on 2026-08-27.
 *
 * Almost nothing here carries a test id -- the page exposes `account-orders-page`,
 * `account-orders-header`, `account-orders-search-input`, `account-orders-filters-button` and
 * `account-orders-select-date-button`, and no id at all for the cards, the segmented 진행 중 /
 * 이전 내역 control, or the detail pane. The class-based locators below are that documented fallback;
 * asking for `account-orders-item-<id>` ids would let all of them go.
 */
export class AccountOrdersPage {
  readonly page: Page;
  readonly root: Locator;
  readonly header: Locator;
  readonly searchInput: Locator;
  readonly filtersButton: Locator;
  readonly selectDateButton: Locator;
  readonly detailPane: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.getByTestId('account-orders-page');
    this.header = page.getByTestId('account-orders-header');
    // The test id is on the input's container, not the control itself.
    this.searchInput = page.getByTestId('account-orders-search-input').locator('input').first();
    this.filtersButton = page.getByTestId('account-orders-filters-button');
    this.selectDateButton = page.getByTestId('account-orders-select-date-button');
    this.detailPane = page.locator('.orders-main');
  }

  async goto(): Promise<void> {
    await gotoStorefront(this.page, appPath('./account/orders'));
    await expect(this.root).toBeVisible();
    await expect(this.page.getByRole('heading', { name: orderHistoryCopy.heading })).toBeVisible();
  }

  orderCards(): Locator {
    return this.page.locator('.order-list .order-item');
  }

  /** Waits for the list to load rather than reading a still-empty one. */
  async waitForOrders(): Promise<number> {
    await expect
      .poll(() => this.orderCards().count(), {
        timeout: 30_000,
        message: 'the order list never rendered a card'
      })
      .toBeGreaterThan(0);

    return this.orderCards().count();
  }

  /** Order numbers in render order, read off the cards. */
  async captureOrderNumbers(): Promise<string[]> {
    const cards = this.orderCards();
    const cardCount = await cards.count();
    const numbers: string[] = [];

    for (let index = 0; index < cardCount; index += 1) {
      const text = await cards.nth(index).innerText();
      const number = text.match(orderHistoryCopy.orderNumberPattern)?.[0];

      expect(number, `order card ${index} carries no order number: "${text.replace(/\n+/g, ' | ')}"`).toBeTruthy();
      numbers.push(number!);
    }

    return numbers;
  }

  /** The count the list advertises above the cards. */
  async captureDeclaredOrderCount(): Promise<number> {
    const badge = this.page.locator('.order-count').first();
    await expect(badge).toBeVisible();

    const text = await badge.innerText();
    const count = Number(text.replace(/[^\d]/g, ''));

    expect(Number.isFinite(count), `could not read an order count from "${text}"`).toBe(true);

    return count;
  }

  /**
   * Selects a card and waits for the route to carry its id. Returns the order number the card showed,
   * so the caller can assert the detail pane opened the *same* order.
   */
  async selectOrder(index = 0): Promise<string> {
    const card = this.orderCards().nth(index);
    await expect(card).toBeVisible();

    const orderNumber = (await card.innerText()).match(orderHistoryCopy.orderNumberPattern)?.[0];
    expect(orderNumber, `order card ${index} carries no order number`).toBeTruthy();

    await card.click();
    await expect(this.page).toHaveURL(/\/kr\/account\/orders\/\d+/, { timeout: 20_000 });

    return orderNumber!;
  }

  /**
   * The detail pane must show the order that was selected -- not a stale one, and not a placeholder.
   *
   * Deliberately does not assert the invoice arithmetic: an order whose amount was revised after
   * placement renders both the old and new totals plus an 추가 결제 금액 row, so the identity that
   * holds at checkout does not hold here. MS-V2-097 covers the arithmetic where it is unambiguous.
   */
  async expectOrderDetail(orderNumber: string): Promise<void> {
    await expect(this.detailPane).toContainText(orderNumber, { timeout: 20_000 });
    await expect(this.detailPane).not.toContainText(orderHistoryCopy.noSelectionPrompt);

    for (const label of orderHistoryCopy.invoiceLabels) {
      await expect(this.detailPane, `order detail is missing its ${label} row`).toContainText(label);
    }
  }

  async expectNoOrderSelected(): Promise<void> {
    await expect(this.detailPane).toContainText(orderHistoryCopy.noSelectionPrompt);
  }

  private segmentedButton(name: string): Locator {
    return this.page.getByRole('button', { name, exact: true }).and(this.page.locator('.ui-segmented-btn'));
  }

  /**
   * Switches between the 진행 중 and 이전 내역 lists. The control reports its state through
   * `aria-pressed`, which is asserted here because that attribute is the only thing telling an
   * assistive technology which list is showing.
   */
  async switchTo(segment: 'inProgress' | 'past'): Promise<void> {
    const wanted = segment === 'inProgress' ? orderHistoryCopy.inProgressTab : orderHistoryCopy.pastTab;
    const other = segment === 'inProgress' ? orderHistoryCopy.pastTab : orderHistoryCopy.inProgressTab;

    await this.segmentedButton(wanted).click();

    await expect(this.segmentedButton(wanted)).toHaveAttribute('aria-pressed', 'true', { timeout: 15_000 });
    await expect(this.segmentedButton(other)).toHaveAttribute('aria-pressed', 'false');
  }

  async expectSelectedSegment(segment: 'inProgress' | 'past'): Promise<void> {
    const wanted = segment === 'inProgress' ? orderHistoryCopy.inProgressTab : orderHistoryCopy.pastTab;

    await expect(this.segmentedButton(wanted)).toHaveAttribute('aria-pressed', 'true');
  }

  /**
   * Searches the list. The input filters on submit, not as you type -- filling it and waiting does
   * nothing (verified: 61 cards before, 61 after), so the Enter press is load-bearing.
   */
  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
  }

  async clearSearch(): Promise<void> {
    await this.searchInput.fill('');
    await this.searchInput.press('Enter');
  }
}
