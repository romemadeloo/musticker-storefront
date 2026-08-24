// Guards the slug -> pricing table wiring for every product under /kr/stickers.
//
// price-table.spec.ts walks each table once via a single probe slug, which is only safe if the other
// products on that table really do resolve to it. These tests are that guarantee: one cheap request
// per product asserting the table identity and rounding step, plus a per-table check that all its
// products return byte-identical stored rows.
import { test, expect } from '@playwright/test';

import {
  fetchQuotation,
  storedRow,
  tableIdentity
} from '../../fixtures/pricing/pricing-api.js';
import { pricingProducts, pricingTableGroups } from '../../fixtures/pricing/pricing-products.js';
import { canonicalNumber, dimensionsForArea, loadPriceTable } from '../../fixtures/pricing/price-table.js';

test.describe.configure({ mode: 'parallel' });

// A mid-range size every table is expected to price. Only used as a probe; the tables themselves are
// walked in full by price-table.spec.ts.
const PROBE_SIZE = { width: 75, height: 75 } as const;

test.describe('pricing product mapping', { tag: ['@api', '@pricing', '@regression'] }, () => {
  for (const product of pricingProducts) {
    test(`MS-PRC-MAP ${product.slug} is served by pricing table ${product.pricingId}`, async ({ request }) => {
      const body = await fetchQuotation(request, product.slug, PROBE_SIZE);

      const context = `${product.slug} ${PROBE_SIZE.width}x${PROBE_SIZE.height}`;
      const identity = tableIdentity(body);

      expect(body.meta.pricing_id, `${context}: ${identity}`).toBe(product.pricingId);
      expect(body.meta.pricing, `${context}: ${identity}`).toMatch(product.pricingName);
      expect(body.data.normalized_nr, `${context} rounding step: ${identity}`).toBe(product.normalizedNr);
      expect(body.data.prices.length, `${context} should return a quantity ladder: ${identity}`).toBeGreaterThan(0);

      // Every returned total must be a whole multiple of the rounding step the same response
      // declares -- the cheapest possible check that normalized_nr is actually being honoured.
      for (const price of body.data.prices) {
        expect
          .soft(price.price! % product.normalizedNr, `${context} qty ${price.nr} total ${price.price}: ${identity}`)
          .toBe(0);
      }
    });
  }

  for (const group of pricingTableGroups().filter((candidate) => candidate.slugs.length > 1)) {
    const table = loadPriceTable(group.csv);
    const probeArea = table ? table.areas[Math.floor(table.areas.length / 2)] : PROBE_SIZE.width * PROBE_SIZE.height;
    const { width, height } = dimensionsForArea(probeArea);

    test(`MS-PRC-MAP ${group.label} is identical across ${group.slugs.length} products`, async ({ request }) => {
      const rows = new Map<string, Map<number, number>>();

      for (const slug of group.slugs) {
        const context = `${slug} area ${probeArea} (${width}x${height})`;
        const body = await fetchQuotation(request, slug, { width, height, quantity: 10, debug: true });

        expect(body.meta.pricing_id, `${context}: ${tableIdentity(body)}`).toBe(group.pricingId);
        rows.set(slug, storedRow(body, context));
      }

      const [referenceSlug, referenceRow] = [...rows.entries()][0];
      const asText = (row: Map<number, number>): string =>
        [...row.entries()].map(([quantity, rate]) => `${quantity}=${canonicalNumber(rate)}`).join(' ');

      for (const [slug, row] of rows) {
        expect
          .soft(asText(row), `${slug} should share ${referenceSlug}'s stored row at area ${probeArea}`)
          .toBe(asText(referenceRow));
      }
    });
  }
});
