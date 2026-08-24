// Every product under the /kr/stickers category, mapped to its price table CSV.
//
// CSVs live in stickers/ and are named after the product slug, one per product. Note that the
// server does NOT have a one-table-per-product layout: the 9 products below resolve to only 5
// distinct pricing tables, and circle / rectangle / square / oval / rounded all share one table.
// Products on a shared table must therefore hold matching CSVs, which product-table-mapping.spec.ts
// checks explicitly.
//
// TABLE IDS ARE PER ENVIRONMENT. Verified live on 2026-08-24, the servers carry two different
// generations of these tables: production and development-static-2 serve the 5/23/25/30/31 set,
// while development-1 serves a newer 45/46/47/49/50 set re-dated (8/21/2026). The generations
// differ in their *rates* too, not just their ids -- 9 of 14 cells on a probe row -- so a CSV is
// only a valid baseline for the environment it was exported from, which `csvSource` records.
//
// The other development-* servers have no recorded ids yet; the pricing specs skip there with an
// explicit reason rather than guessing. Add an entry to `pricingIds` to switch a server on.
//
// `normalizedNr` is the rounding step in KRW that the API applies to the line total. It is 100
// everywhere except sticker-sheet, which uses 10, and is stable across both generations.
//
// hologram-sticker serves both 다이컷 and 키스컷 from one table (supply_id does not change the
// quote), which is why its CSV is a merged die-cut/kiss-cut export.
import { activeEnvironment } from '../env.js';
import type { EnvironmentName } from '../environments.js';

type PricingProductRegistryEntry = {
  slug: string;
  // A pattern, not a literal, so a legitimate re-dating of the table -- "(6/29/2026)" becoming a
  // newer date -- does not fail every row test, while a swap to a different table still does. Kept
  // loose enough to span both generations' naming, since development-1 dropped the " - " separator
  // and appended "Pricing" ("Clear - Die Cut / Kiss Cut" -> "Clear Die Cut / Kiss Cut Pricing").
  // pricingId is the strict identity assertion; this is the sanity check on top of it.
  pricingName: RegExp;
  // Per-environment table id. A missing entry means "not recorded for that server".
  pricingIds: Partial<Record<EnvironmentName, number>>;
  normalizedNr: number;
  // Path relative to this directory. Filenames follow the slug, except where the export was named
  // without the "-sticker" suffix.
  csv: string;
  // The environment this CSV was exported from. Cell-by-cell rate comparison only runs there,
  // because the other generation holds different rates.
  csvSource: EnvironmentName;
};

export type PricingProduct = {
  // Also the product page path: /kr/stickers/<slug>
  slug: string;
  // Resolved for the active environment.
  pricingId: number;
  pricingName: RegExp;
  normalizedNr: number;
  csv: string;
  csvSource: EnvironmentName;
  // True when the committed CSV was exported from the environment under test, i.e. when its rates
  // are the ones this server is expected to serve.
  ratesComparable: boolean;
};

// The older generation, shared by production and development-static-2, against the newer
// development-1 set. Listed per product rather than as one map so a product can move generations
// independently -- vinyl-lettering, transfer-sticker and sticker-sheet were left out of
// development-1's regeneration entirely and still answer on their production ids.
const registry: readonly PricingProductRegistryEntry[] = [
  {
    slug: 'die-cut-sticker',
    pricingName: /^Die Cut\b/,
    pricingIds: { production: 5, 'development-static-2': 5, 'development-1': 45 },
    normalizedNr: 100,
    csv: 'stickers/die-cut-sticker.csv',
    csvSource: 'development-1'
  },
  {
    slug: 'kiss-cut-sticker',
    pricingName: /^Kiss Cut\b/,
    pricingIds: { production: 23, 'development-static-2': 23, 'development-1': 47 },
    normalizedNr: 100,
    csv: 'stickers/kiss-cut-sticker.csv',
    csvSource: 'development-1'
  },
  {
    slug: 'circle-sticker',
    pricingName: /^Die Cut \/ Kiss Cut\b/,
    pricingIds: { production: 25, 'development-static-2': 25, 'development-1': 46 },
    normalizedNr: 100,
    csv: 'stickers/circle-sticker.csv',
    csvSource: 'development-1'
  },
  {
    slug: 'rectangle-sticker',
    pricingName: /^Die Cut \/ Kiss Cut\b/,
    pricingIds: { production: 25, 'development-static-2': 25, 'development-1': 46 },
    normalizedNr: 100,
    csv: 'stickers/rectangle-sticker.csv',
    csvSource: 'development-1'
  },
  {
    slug: 'square-sticker',
    pricingName: /^Die Cut \/ Kiss Cut\b/,
    pricingIds: { production: 25, 'development-static-2': 25, 'development-1': 46 },
    normalizedNr: 100,
    csv: 'stickers/square-sticker.csv',
    csvSource: 'development-1'
  },
  {
    slug: 'oval-sticker',
    pricingName: /^Die Cut \/ Kiss Cut\b/,
    pricingIds: { production: 25, 'development-static-2': 25, 'development-1': 46 },
    normalizedNr: 100,
    csv: 'stickers/oval-sticker.csv',
    csvSource: 'development-1'
  },
  {
    slug: 'rounded-sticker',
    pricingName: /^Die Cut \/ Kiss Cut\b/,
    pricingIds: { production: 25, 'development-static-2': 25, 'development-1': 46 },
    normalizedNr: 100,
    csv: 'stickers/rounded-sticker.csv',
    csvSource: 'development-1'
  },
  {
    slug: 'clear-sticker',
    pricingName: /^Clear\b.*Die Cut \/ Kiss Cut\b/,
    pricingIds: { production: 30, 'development-static-2': 30, 'development-1': 49 },
    normalizedNr: 100,
    csv: 'stickers/clear-sticker.csv',
    csvSource: 'development-1'
  },
  {
    slug: 'hologram-sticker',
    pricingName: /^Hologram\b.*Die Cut \/ Kiss Cut\b/,
    pricingIds: { production: 31, 'development-static-2': 31, 'development-1': 50 },
    normalizedNr: 100,
    csv: 'stickers/hologram.csv',
    csvSource: 'development-1'
  }
  // Parked until their CSVs are exported into stickers/ -- the specs would otherwise contribute
  // nothing but skips. Probed on development-1 on 2026-08-24, these three were left out of that
  // server's table regeneration and still answer on the same ids and names as production.
  // {
  //   slug: 'vinyl-lettering',
  //   pricingName: /^Vinyl Lettering\b/,
  //   pricingIds: { production: 8, 'development-static-2': 8, 'development-1': 8 },
  //   normalizedNr: 100,
  //   csv: 'stickers/vinyl-lettering.csv',
  //   csvSource: 'production'
  // },
  // {
  //   slug: 'transfer-sticker',
  //   pricingName: /^Transfer\b/,
  //   pricingIds: { production: 11, 'development-static-2': 11, 'development-1': 11 },
  //   normalizedNr: 100,
  //   csv: 'stickers/transfer-sticker.csv',
  //   csvSource: 'production'
  // },
  // {
  //   slug: 'sticker-sheet',
  //   pricingName: /^Custom Sheet\b/,
  //   pricingIds: { production: 34, 'development-static-2': 34, 'development-1': 34 },
  //   normalizedNr: 10,
  //   csv: 'stickers/sticker-sheet.csv',
  //   csvSource: 'production'
  // }
];

function resolve(entry: PricingProductRegistryEntry): PricingProduct | undefined {
  const pricingId = activeEnvironment ? entry.pricingIds[activeEnvironment] : undefined;

  if (pricingId === undefined) {
    return undefined;
  }

  return {
    slug: entry.slug,
    pricingId,
    pricingName: entry.pricingName,
    normalizedNr: entry.normalizedNr,
    csv: entry.csv,
    csvSource: entry.csvSource,
    ratesComparable: activeEnvironment === entry.csvSource
  };
}

// Products whose table id is known for the environment under test.
export const pricingProducts: readonly PricingProduct[] = registry
  .map(resolve)
  .filter((product): product is PricingProduct => product !== undefined);

// Products with no recorded table id for the environment under test. The specs turn these into
// explicit skips, so an unmapped server reads as "no data yet" rather than silently testing nothing.
export const unmappedPricingProducts: readonly string[] = registry
  .filter((entry) => resolve(entry) === undefined)
  .map((entry) => entry.slug);

// Names the environment under test in skip messages and assertion context.
export const activeEnvironmentLabel = activeEnvironment ?? 'an environment outside the registry';

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
