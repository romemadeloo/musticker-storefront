import { test, expect } from '../../fixtures/e2e-test.js';
import { appPath } from '../../fixtures/env.js';

const criticalRoutes = [
  { name: 'home', path: '' },
  { name: 'stickers listing', path: './stickers' },
  { name: 'roll stickers listing', path: './roll-stickers' },
  { name: 'sheet stickers listing', path: './sheet-stickers' },
  { name: 'die-cut sticker detail', path: './stickers/die-cut-sticker' }
];

test.describe('production readiness', { tag: ['@production', '@smoke', '@availability'] }, () => {
  for (const route of criticalRoutes) {
    test(`critical route serves rendered HTML: ${route.name}`, async ({ request }) => {
      const response = await request.get(appPath(route.path), { failOnStatusCode: false });
      const contentType = response.headers()['content-type'] ?? '';
      const body = await response.text();

      expect(response.status(), `${route.name} should not return an HTTP error`).toBeLessThan(400);
      expect(contentType, `${route.name} should return an HTML document`).toContain('text/html');
      expect(body.length, `${route.name} should return a rendered storefront document`).toBeGreaterThan(1_000);
      expect(body.toLowerCase(), `${route.name} should include an HTML shell`).toContain('<html');
    });
  }
});
