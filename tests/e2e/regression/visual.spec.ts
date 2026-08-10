import { test, expect } from '../../fixtures/e2e-test.js';
import { appPath } from '../../fixtures/env.js';

const runVisual = process.env.RUN_VISUAL_E2E === 'true';

test.describe('storefront v2 visual snapshots', { tag: ['@visual', '@production'] }, () => {
  test.skip(!runVisual, 'Set RUN_VISUAL_E2E=true after approving baselines for visual snapshot coverage.');
  test.use({ allowGuestUserMe401: true, allowKnownNuxtPayloadFailures: true });

  for (const [name, path] of [
    ['home', ''],
    ['stickers', './stickers'],
    ['roll-stickers', './roll-stickers'],
    ['sheet-stickers', './sheet-stickers'],
    ['die-cut-sticker', './stickers/die-cut-sticker'],
    ['faq', './faq']
  ] as const) {
    test(`MS-V2-024 ${name} visual snapshot`, async ({ page }) => {
      await page.goto(appPath(path));
      await expect(page).toHaveScreenshot(`storefront-${name}.png`, {
        fullPage: true,
        animations: 'disabled',
        maxDiffPixelRatio: 0.02
      });
    });
  }
});

