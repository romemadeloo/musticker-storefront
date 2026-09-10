import type { Locator } from '@playwright/test';
import { expect } from '@playwright/test';

/**
 * Waits until a form's client-side handlers are actually bound.
 *
 * Nuxt serves these pages fully rendered, so every control is visible and enabled well before Vue
 * finishes hydrating them. A click that lands in that window hits an inert element: it focuses the
 * button and does nothing else. On the auth forms that shows up as a submit which neither validates
 * nor calls the API -- the test then fails on a missing validation message that the app would have
 * rendered a second later. Measured on development-1, the gap is consistently around 1.2s.
 *
 * Nuxt exposes no hydration flag on these builds (no `isHydrating`, no `data-v-app`, and the
 * production Vue build keeps `__vnode` off the DOM nodes), so interactivity is established
 * behaviourally instead: a password visibility toggle is a purely client-side control whose effect
 * is directly observable on the input's `type`. Once it responds, the surrounding form is bound too.
 *
 * The toggle is left exactly as it was found, so callers can use this before asserting on masking.
 */
export async function waitForPasswordFormInteractive(toggleButton: Locator, passwordInput: Locator): Promise<void> {
  await expect(passwordInput).toHaveAttribute('type', 'password');

  await expect(async () => {
    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute('type', 'text', { timeout: 1_000 });
  }).toPass({ timeout: 20_000 });

  await toggleButton.click();
  await expect(passwordInput).toHaveAttribute('type', 'password');
}
