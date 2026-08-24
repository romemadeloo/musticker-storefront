// Every product under the /kr/stickers category, mapped to the pricing table that serves it.
//
// Verified live against development-static-2 on 2026-08-24: the 12 products resolve to only 8
// distinct tables -- circle/rectangle/square/oval/rounded all share pricing_id 25 -- so one CSV
// covers all five of those shapes. `normalized_nr` is the rounding step the API applies to the line
// total; it is 100 everywhere except sticker-sheet, which uses 10.
//
// hologram-sticker serves both 다이컷 and 키스컷 from one table (supply_id does not change the
// quote), which is why its CSV is a merged die-cut/kiss-cut export.
export type PricingProduct = {
  // Also the product page path: /kr/stickers/<slug>
  slug: string;
  // ASCII label for test titles, so reports stay greppable.
  label: string;
  pricingId: number;
  // A pattern, not a literal, so a legitimate re-dating of the table -- "(6/29/2026)" becoming a
  // newer date -- does not fail every row test, while a swap to a different table still does.
  pricingName: RegExp;
  normalizedNr: number;
  csv: string;
};

export const pricingProducts: readonly PricingProduct[] = [
  {
    slug: 'die-cut-sticker',
    label: 'die-cut',
    pricingId: 5,
    pricingName: /^Die Cut\b/,
    normalizedNr: 100,
    csv: 'die-cut.csv'
  },
  {
    slug: 'vinyl-lettering',
    label: 'vinyl-lettering',
    pricingId: 8,
    pricingName: /^Vinyl Lettering\b/,
    normalizedNr: 100,
    csv: 'vinyl-lettering.csv'
  },
  {
    slug: 'transfer-sticker',
    label: 'transfer',
    pricingId: 11,
    pricingName: /^Transfer\b/,
    normalizedNr: 100,
    csv: 'transfer.csv'
  },
  {
    slug: 'kiss-cut-sticker',
    label: 'kiss-cut',
    pricingId: 23,
    pricingName: /^Kiss Cut\b/,
    normalizedNr: 100,
    csv: 'kiss-cut.csv'
  },
  {
    slug: 'circle-sticker',
    label: 'die-cut-kiss-cut',
    pricingId: 25,
    pricingName: /^Die Cut \/ Kiss Cut\b/,
    normalizedNr: 100,
    csv: 'die-cut-kiss-cut.csv'
  },
  {
    slug: 'rectangle-sticker',
    label: 'die-cut-kiss-cut',
    pricingId: 25,
    pricingName: /^Die Cut \/ Kiss Cut\b/,
    normalizedNr: 100,
    csv: 'die-cut-kiss-cut.csv'
  },
  {
    slug: 'square-sticker',
    label: 'die-cut-kiss-cut',
    pricingId: 25,
    pricingName: /^Die Cut \/ Kiss Cut\b/,
    normalizedNr: 100,
    csv: 'die-cut-kiss-cut.csv'
  },
  {
    slug: 'oval-sticker',
    label: 'die-cut-kiss-cut',
    pricingId: 25,
    pricingName: /^Die Cut \/ Kiss Cut\b/,
    normalizedNr: 100,
    csv: 'die-cut-kiss-cut.csv'
  },
  {
    slug: 'rounded-sticker',
    label: 'die-cut-kiss-cut',
    pricingId: 25,
    pricingName: /^Die Cut \/ Kiss Cut\b/,
    normalizedNr: 100,
    csv: 'die-cut-kiss-cut.csv'
  },
  {
    slug: 'clear-sticker',
    label: 'clear',
    pricingId: 30,
    pricingName: /^Clear - Die Cut \/ Kiss Cut\b/,
    normalizedNr: 100,
    csv: 'clear-die-kiss-cut.csv'
  },
  {
    slug: 'hologram-sticker',
    label: 'hologram',
    pricingId: 31,
    pricingName: /^Hologram - Die Cut \/ Kiss Cut\b/,
    normalizedNr: 100,
    csv: 'hologram-die-kiss-cut.csv'
  },
  {
    slug: 'sticker-sheet',
    label: 'custom-sheet',
    pricingId: 34,
    pricingName: /^Custom Sheet\b/,
    normalizedNr: 10,
    csv: 'custom-sheet.csv'
  }
] as const;

export type PricingTableGroup = {
  csv: string;
  label: string;
  pricingId: number;
  pricingName: RegExp;
  normalizedNr: number;
  slugs: string[];
  // The slug used to walk the table row by row, so shared tables are verified once rather than once
  // per product. product-table-mapping.spec.ts covers the other slugs on the same table.
  probeSlug: string;
};

// Grouping by CSV keeps the row-by-row work at 8 tables instead of 12 products. Registry mistakes
// (two products on one CSV disagreeing about pricing_id or normalized_nr) throw here at collection
// time rather than surfacing as confusing per-row failures.
export function pricingTableGroups(): PricingTableGroup[] {
  const groups = new Map<string, PricingTableGroup>();

  for (const product of pricingProducts) {
    const existing = groups.get(product.csv);

    if (!existing) {
      groups.set(product.csv, {
        csv: product.csv,
        label: product.label,
        pricingId: product.pricingId,
        pricingName: product.pricingName,
        normalizedNr: product.normalizedNr,
        slugs: [product.slug],
        probeSlug: product.slug
      });
      continue;
    }

    if (existing.pricingId !== product.pricingId) {
      throw new Error(
        `pricing registry: ${product.csv} is shared by products with different pricing ids (${existing.pricingId} vs ${product.pricingId} for ${product.slug})`
      );
    }
    if (existing.normalizedNr !== product.normalizedNr) {
      throw new Error(
        `pricing registry: ${product.csv} is shared by products with different normalized_nr (${existing.normalizedNr} vs ${product.normalizedNr} for ${product.slug})`
      );
    }

    existing.slugs.push(product.slug);
  }

  return [...groups.values()];
}
