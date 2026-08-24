// Every product under the /kr/stickers category, mapped to its price table CSV.
//
// CSVs live in stickers/ and are named after the product slug, one per product. Note that the
// server does NOT have a one-table-per-product layout: verified live against development-static-2 on
// 2026-08-24, the 12 products resolve to only 8 distinct pricing tables, and circle / rectangle /
// square / oval / rounded all share pricing_id 25. Products on a shared table must therefore hold
// matching CSVs, which product-table-mapping.spec.ts checks explicitly.
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
  pricingName: RegExp;
  normalizedNr: number;
  // Path relative to this directory. Filenames follow the slug, except where the export was named
  // without the "-sticker" suffix.
  csv: string;
};

export const pricingProducts: readonly PricingProduct[] = [
  {
    slug: 'die-cut-sticker',
    pricingId: 5,
    pricingName: /^Die Cut\b/,
    normalizedNr: 100,
    csv: 'stickers/die-cut-sticker.csv'
  },
  {
    slug: 'vinyl-lettering',
    pricingId: 8,
    pricingName: /^Vinyl Lettering\b/,
    normalizedNr: 100,
    csv: 'stickers/vinyl-lettering.csv'
  },
  {
    slug: 'transfer-sticker',
    pricingId: 11,
    pricingName: /^Transfer\b/,
    normalizedNr: 100,
    csv: 'stickers/transfer-sticker.csv'
  },
  {
    slug: 'kiss-cut-sticker',
    pricingId: 23,
    pricingName: /^Kiss Cut\b/,
    normalizedNr: 100,
    csv: 'stickers/kiss-cut-sticker.csv'
  },
  {
    slug: 'circle-sticker',
    pricingId: 25,
    pricingName: /^Die Cut \/ Kiss Cut\b/,
    normalizedNr: 100,
    csv: 'stickers/circle-sticker.csv'
  },
  {
    slug: 'rectangle-sticker',
    pricingId: 25,
    pricingName: /^Die Cut \/ Kiss Cut\b/,
    normalizedNr: 100,
    csv: 'stickers/rectangle-sticker.csv'
  },
  {
    slug: 'square-sticker',
    pricingId: 25,
    pricingName: /^Die Cut \/ Kiss Cut\b/,
    normalizedNr: 100,
    csv: 'stickers/square-sticker.csv'
  },
  {
    slug: 'oval-sticker',
    pricingId: 25,
    pricingName: /^Die Cut \/ Kiss Cut\b/,
    normalizedNr: 100,
    csv: 'stickers/oval-sticker.csv'
  },
  {
    slug: 'rounded-sticker',
    pricingId: 25,
    pricingName: /^Die Cut \/ Kiss Cut\b/,
    normalizedNr: 100,
    csv: 'stickers/rounded-sticker.csv'
  },
  {
    slug: 'clear-sticker',
    pricingId: 30,
    pricingName: /^Clear - Die Cut \/ Kiss Cut\b/,
    normalizedNr: 100,
    csv: 'stickers/clear-sticker.csv'
  },
  {
    slug: 'hologram-sticker',
    pricingId: 31,
    pricingName: /^Hologram - Die Cut \/ Kiss Cut\b/,
    normalizedNr: 100,
    csv: 'stickers/hologram.csv'
  },
  {
    slug: 'sticker-sheet',
    pricingId: 34,
    pricingName: /^Custom Sheet\b/,
    normalizedNr: 10,
    csv: 'stickers/sticker-sheet.csv'
  }
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
