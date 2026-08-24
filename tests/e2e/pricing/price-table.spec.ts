// Verifies that every cell of every committed price CSV is what the pricing API actually serves.
//
// One request per CSV row: `debug=1` returns the whole stored row, so a single call covers all of
// that row's quantity columns. Shared tables are walked once (see pricingTableGroups); the other
// products on the same table are covered by product-table-mapping.spec.ts.
//
// Imports @playwright/test directly rather than the e2e-test fixture: that fixture's console guard
// is browser-oriented and defaults allowKnownPriceWarnings to true, neither of which suits an API
// test. No browser is launched here at all, since no test touches `page`.
import { test, expect } from '@playwright/test';

import {
  fetchQuotation,
  storedRow,
  tableIdentity,
  requireSchema
} from '../../fixtures/pricing/pricing-api.js';
import { pricingTableGroups } from '../../fixtures/pricing/pricing-products.js';
import { canonicalNumber, dimensionsForArea, loadPriceTable } from '../../fixtures/pricing/price-table.js';

test.describe.configure({ mode: 'parallel' });

for (const group of pricingTableGroups()) {
  test.describe(`pricing table ${group.label}`, { tag: ['@api', '@pricing', '@regression'] }, () => {
    const table = loadPriceTable(group.csv);

    if (!table) {
      test(`MS-PRC-${group.label} price table matches ${group.csv}`, () => {
        test.skip(true, `${group.csv} is not committed yet -- export it into tests/fixtures/pricing/`);
        expect(loadPriceTable(group.csv)).not.toBeNull();
      });

      return;
    }

    for (const area of table.areas) {
      const { width, height } = dimensionsForArea(area);

      test(`MS-PRC-${group.label} area ${area} (${width}x${height}) matches ${group.csv}`, async ({ request }, testInfo) => {
        const body = await fetchQuotation(request, group.probeSlug, {
          width,
          height,
          quantity: table.quantities[0],
          debug: true
        });

        const context = `${group.probeSlug} area ${area} (${width}x${height})`;
        const identity = tableIdentity(body);

        expect(body.meta.pricing_id, `${context}: ${identity}`).toBe(group.pricingId);
        expect(body.meta.pricing, `${context}: ${identity}`).toMatch(group.pricingName);
        // normalized_nr is the rounding step applied to line totals, so a silent change to it
        // repriced every order on this product.
        expect(body.data.normalized_nr, `${context}: ${identity}`).toBe(group.normalizedNr);

        const schema = requireSchema(body, context);

        // A false here means the CSV row is missing from the stored table entirely -- a worse
        // problem than a wrong rate, and the reason this is asserted before any cell comparison.
        expect(schema.exact_dimension, `${context} should be a stored grid row: ${identity}`).toBe(true);
        expect(
          schema.bounds.map((bound) => bound.base_area),
          `${context} should resolve to exactly its own grid row: ${identity}`
        ).toEqual([area]);

        const stored = storedRow(body, context);

        expect([...stored.keys()], `${context} quantity ladder: ${identity}`).toEqual(table.quantities);

        const mismatches: string[] = [];

        for (const quantity of table.quantities) {
          const expectedCell = table.rows.get(area)!.get(quantity)!;
          const actual = stored.get(quantity)!;
          const expectedCanonical = canonicalNumber(expectedCell);
          const actualCanonical = canonicalNumber(actual);

          if (actualCanonical !== expectedCanonical) {
            const delta = actual - Number(expectedCell);
            mismatches.push(
              `${String(quantity).padStart(6)} | ${expectedCanonical.padStart(14)} | ${actualCanonical.padStart(14)} | ${delta > 0 ? '+' : ''}${delta.toPrecision(4)}`
            );
          }

          // Soft so one run reports every wrong cell in the row instead of stopping at the first.
          expect
            .soft(actualCanonical, `${context} qty ${quantity} price_per_mm: ${identity}`)
            .toBe(expectedCanonical);
        }

        if (mismatches.length > 0) {
          await testInfo.attach(`price-diff-area-${area}.txt`, {
            contentType: 'text/plain',
            body: [
              `${group.csv} area ${area} probed as ${width}x${height} on ${group.probeSlug}`,
              identity,
              `${mismatches.length} of ${table.quantities.length} rates differ`,
              '',
              '   qty |       expected |         actual | delta',
              ...mismatches
            ].join('\n')
          });
        }
      });
    }
  });
}
