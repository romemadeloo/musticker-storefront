// Every product under the /kr/stickers category, mapped to its price table CSV.
//
// CSVs live in stickers/ and are named after the product slug, one per product. Note that the
// server does NOT have a one-table-per-product layout: verified live against development-1 on
// 2026-08-24, the 9 products below resolve to only 5 distinct pricing tables, and circle /
// rectangle / square / oval / rounded all share pricing_id 46. Products on a shared table must
// therefore hold matching CSVs, which product-table-mapping.spec.ts checks explicitly.
//
// The pricingId values below are development-1's, so run this suite with
// E2E_ENVIRONMENT=development-1 (npm run test:pricing:dev1). That server carries a newer generation
// of the sticker tables -- 45/46/47/49/50 against 5/23/25/30/31 on development-static-2 and
// production -- so these IDs are expected to fail elsewhere until the new tables are promoted.
//
// `normalizedNr` is the rounding step in KRW that the API applies to the line total. It is 100
// everywhere except sticker-sheet, which uses 10.
//
// hologram-sticker serves both 다이컷 and 키스컷 from one table (supply_id does not change the
// quote), which is why its CSV is a merged die-cut/kiss-cut export.
export type PricingProduct = {
  // Also the product page path: /kr/stickers/<slug>
  slug: string;
  pricingId: number;
  // A pattern, not a literal, so a legitimate re-dating of the table -- "(6/29/2026)" becoming a
  // newer date -- does not fail every row test, while a swap to a different table still does.
  // Kept loose enough to survive cosmetic renames too: development-1 dropped the " - " separator
  // and appended "Pricing" ("Clear - Die Cut / Kiss Cut" -> "Clear Die Cut / Kiss Cut Pricing"),
  // which is what pricingId is for -- that stays the strict identity assertion.
  pricingName: RegExp;
  normalizedNr: number;
  // Path relative to this directory. Filenames follow the slug, except where the export was named
  // without the "-sticker" suffix.
  csv: string;
};

export const pricingProducts: readonly PricingProduct[] = [
  {
    slug: 'die-cut-sticker',
    pricingId: 45,
    pricingName: /^Die Cut\b/,
    normalizedNr: 100,
    csv: 'stickers/die-cut-sticker.csv'
  },
  {
    slug: 'kiss-cut-sticker',
    pricingId: 47,
    pricingName: /^Kiss Cut\b/,
    normalizedNr: 100,
    csv: 'stickers/kiss-cut-sticker.csv'
  },
  {
    slug: 'circle-sticker',
    pricingId: 46,
    pricingName: /^Die Cut \/ Kiss Cut\b/,
    normalizedNr: 100,
    csv: 'stickers/circle-sticker.csv'
  },
  {
    slug: 'rectangle-sticker',
    pricingId: 46,
    pricingName: /^Die Cut \/ Kiss Cut\b/,
    normalizedNr: 100,
    csv: 'stickers/rectangle-sticker.csv'
  },
  {
    slug: 'square-sticker',
    pricingId: 46,
    pricingName: /^Die Cut \/ Kiss Cut\b/,
    normalizedNr: 100,
    csv: 'stickers/square-sticker.csv'
  },
  {
    slug: 'oval-sticker',
    pricingId: 46,
    pricingName: /^Die Cut \/ Kiss Cut\b/,
    normalizedNr: 100,
    csv: 'stickers/oval-sticker.csv'
  },
  {
    slug: 'rounded-sticker',
    pricingId: 46,
    pricingName: /^Die Cut \/ Kiss Cut\b/,
    normalizedNr: 100,
    csv: 'stickers/rounded-sticker.csv'
  },
  {
    slug: 'clear-sticker',
    pricingId: 49,
    pricingName: /^Clear\b.*Die Cut \/ Kiss Cut\b/,
    normalizedNr: 100,
    csv: 'stickers/clear-sticker.csv'
  },
  {
    slug: 'hologram-sticker',
    pricingId: 50,
    pricingName: /^Hologram\b.*Die Cut \/ Kiss Cut\b/,
    normalizedNr: 100,
    csv: 'stickers/hologram.csv'
  }
  // Parked until their CSVs are exported into stickers/ -- the specs would otherwise contribute
  // nothing but skips. Their pricingIds are deliberately unchanged: probed on development-1 on
  // 2026-08-24, these three were left out of that server's table regeneration and still answer on
  // the same ids and names as production (8 "Vinyl Lettering", 11 "Transfer", 34 "Custom Sheet").
  // {
  //   slug: 'vinyl-lettering',
  //   pricingId: 8,
  //   pricingName: /^Vinyl Lettering\b/,
  //   normalizedNr: 100,
  //   csv: 'stickers/vinyl-lettering.csv'
  // },
  // {
  //   slug: 'transfer-sticker',
  //   pricingId: 11,
  //   pricingName: /^Transfer\b/,
  //   normalizedNr: 100,
  //   csv: 'stickers/transfer-sticker.csv'
  // },
  // {
  //   slug: 'sticker-sheet',
  //   pricingId: 34,
  //   pricingName: /^Custom Sheet\b/,
  //   normalizedNr: 10,
  //   csv: 'stickers/sticker-sheet.csv'
  // }
] as const;

// Products the server prices from one shared table. Used to assert they return byte-identical
// stored rows -- and, by extension, that their CSVs agree with each other.
export function productsSharingPricingId(): PricingProduct[][] {
  const byPricingId = new Map<number, PricingProduct[]>();

  for (const product of pricingProducts) {
    const existing = byPricingId.get(product.pricingId);
    if (existing) {
      existing.push(product);
    } else {
      byPricingId.set(product.pricingId, [product]);
    }
  }

  return [...byPricingId.values()].filter((products) => products.length > 1);
}
