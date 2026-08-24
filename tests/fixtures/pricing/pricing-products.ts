// Every product under the /kr/stickers category, mapped to its price table CSV.
//
// CSVs live in stickers/ and are named after the product slug, one per product. Note that the
// server does NOT have a one-table-per-product layout: the 9 products below resolve to only 5
// distinct pricing tables, and circle / rectangle / square / oval / rounded all share one table.
// Products on a shared table must therefore hold matching CSVs, which product-table-mapping.spec.ts
// checks explicitly.
//
// TABLE IDS ARE PER ENVIRONMENT, AND THE ID NUMBERS COLLIDE ACROSS SERVERS. Probed live on
// 2026-08-24, three different generations are in play:
//
//   environment           ids                    naming                        rates
//   production            43/44/45/46/47         "... Sticker (8/24/2026)"      match the CSVs
//   development-1         45/46/47/49/50         "... Pricing (8/21/2026)"      match the CSVs
//   development-static-2  5/23/25/30/31          "Die Cut", "Clear - ..."       differ
//
// The collision is the reason a single shared id map would be actively wrong rather than merely
// incomplete: id 45 is kiss-cut on production but die-cut on development-1, and 46/47 are
// clear/hologram on production but the shapes/kiss-cut tables on development-1.
//
// `csvSources` lists the environments a CSV is a valid baseline for. production and development-1
// were promoted from the same price data -- verified cell by cell -- so the same export covers both,
// while development-static-2 still holds the older rates and is identity-checked only.
//
// The remaining development-* servers have no recorded ids yet; the pricing specs skip there with an
// explicit reason rather than guessing. Add an entry to `pricingIds` to switch a server on.
//
// `normalizedNr` is the rounding step in KRW that the API applies to the line total. It is 100
// everywhere except sticker-sheet, which uses 10, and is stable across all three generations.
//
// hologram-sticker serves both 다이컷 and 키스컷 from one table (supply_id does not change the
// quote), which is why its CSV is a merged die-cut/kiss-cut export.
import { activeEnvironment } from '../env.js';
import type { EnvironmentName } from '../environments.js';

type PricingProductRegistryEntry = {
  slug: string;
  // A pattern, not a literal, so a legitimate re-dating or renaming of the table does not fail every
  // row test. It has to span all three generations' naming, which have drifted a long way apart --
  // the clear table has been "Clear - Die Cut / Kiss Cut", "Clear Die Cut / Kiss Cut Pricing" and
  // now "Clear Sticker" -- so for those two products this is only a coarse sanity check. pricingId
  // is the strict identity assertion and the reason this can afford to be loose.
  pricingName: RegExp;
  // Per-environment table id. A missing entry means "not recorded for that server".
  pricingIds: Partial<Record<EnvironmentName, number>>;
  normalizedNr: number;
  // Path relative to this directory. Filenames follow the slug, except where the export was named
  // without the "-sticker" suffix.
  csv: string;
  // Environments this CSV is a valid rate baseline for. Cell-by-cell comparison runs only on these;
  // elsewhere the table is identity-checked and the cells are skipped with the reason given.
  csvSources: readonly EnvironmentName[];
};

export type PricingProduct = {
  // Also the product page path: /kr/stickers/<slug>
  slug: string;
  // Resolved for the active environment.
  pricingId: number;
  pricingName: RegExp;
  normalizedNr: number;
  csv: string;
  csvSources: readonly EnvironmentName[];
  // True when the environment under test is one the CSV is a baseline for.
  ratesComparable: boolean;
};

// production and development-1 were promoted from the same price data, so every product below lists
// both in csvSources. development-static-2 lags on the older rates.
const CSV_SOURCES = ['production', 'development-1'] as const satisfies readonly EnvironmentName[];

const registry: readonly PricingProductRegistryEntry[] = [
  {
    slug: 'die-cut-sticker',
    pricingName: /^Die Cut\b/,
    pricingIds: { production: 43, 'development-1': 45, 'development-static-2': 5 },
    normalizedNr: 100,
    csv: 'stickers/die-cut-sticker.csv',
    csvSources: CSV_SOURCES
  },
  {
    slug: 'kiss-cut-sticker',
    pricingName: /^Kiss Cut\b/,
    pricingIds: { production: 45, 'development-1': 47, 'development-static-2': 23 },
    normalizedNr: 100,
    csv: 'stickers/kiss-cut-sticker.csv',
    csvSources: CSV_SOURCES
  },
  {
    slug: 'circle-sticker',
    pricingName: /^Die Cut \/ Kiss Cut\b/,
    pricingIds: { production: 44, 'development-1': 46, 'development-static-2': 25 },
    normalizedNr: 100,
    csv: 'stickers/circle-sticker.csv',
    csvSources: CSV_SOURCES
  },
  {
    slug: 'rectangle-sticker',
    pricingName: /^Die Cut \/ Kiss Cut\b/,
    pricingIds: { production: 44, 'development-1': 46, 'development-static-2': 25 },
    normalizedNr: 100,
    csv: 'stickers/rectangle-sticker.csv',
    csvSources: CSV_SOURCES
  },
  {
    slug: 'square-sticker',
    pricingName: /^Die Cut \/ Kiss Cut\b/,
    pricingIds: { production: 44, 'development-1': 46, 'development-static-2': 25 },
    normalizedNr: 100,
    csv: 'stickers/square-sticker.csv',
    csvSources: CSV_SOURCES
  },
  {
    slug: 'oval-sticker',
    pricingName: /^Die Cut \/ Kiss Cut\b/,
    pricingIds: { production: 44, 'development-1': 46, 'development-static-2': 25 },
    normalizedNr: 100,
    csv: 'stickers/oval-sticker.csv',
    csvSources: CSV_SOURCES
  },
  {
    slug: 'rounded-sticker',
    pricingName: /^Die Cut \/ Kiss Cut\b/,
    pricingIds: { production: 44, 'development-1': 46, 'development-static-2': 25 },
    normalizedNr: 100,
    csv: 'stickers/rounded-sticker.csv',
    csvSources: CSV_SOURCES
  },
  {
    // "Clear Sticker" on production, "Clear Die Cut / Kiss Cut Pricing ... v.2" on development-1.
    slug: 'clear-sticker',
    pricingName: /^Clear\b/,
    pricingIds: { production: 46, 'development-1': 49, 'development-static-2': 30 },
    normalizedNr: 100,
    csv: 'stickers/clear-sticker.csv',
    csvSources: CSV_SOURCES
  },
  {
    slug: 'hologram-sticker',
    pricingName: /^Hologram\b/,
    pricingIds: { production: 47, 'development-1': 50, 'development-static-2': 31 },
    normalizedNr: 100,
    csv: 'stickers/hologram.csv',
    csvSources: CSV_SOURCES
  }
  // Parked until their CSVs are exported into stickers/ -- the specs would otherwise contribute
  // nothing but skips. Probed on 2026-08-24: the lettering products were left out of the sticker
  // regeneration and answer on the same ids everywhere, but sticker-sheet does differ (33 on
  // production, 34 on development-1), so do not collapse these to a single id when enabling them.
  // {
  //   slug: 'vinyl-lettering',
  //   pricingName: /^Vinyl Lettering\b/,
  //   pricingIds: { production: 8, 'development-1': 8, 'development-static-2': 8 },
  //   normalizedNr: 100,
  //   csv: 'stickers/vinyl-lettering.csv',
  //   csvSources: ['production']
  // },
  // {
  //   slug: 'transfer-sticker',
  //   pricingName: /^Transfer\b/,
  //   pricingIds: { production: 11, 'development-1': 11, 'development-static-2': 11 },
  //   normalizedNr: 100,
  //   csv: 'stickers/transfer-sticker.csv',
  //   csvSources: ['production']
  // },
  // {
  //   slug: 'sticker-sheet',
  //   pricingName: /^Custom Sheet\b/,
  //   pricingIds: { production: 33, 'development-1': 34 },
  //   normalizedNr: 10,
  //   csv: 'stickers/sticker-sheet.csv',
  //   csvSources: ['production']
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
    csvSources: entry.csvSources,
    ratesComparable: activeEnvironment !== undefined && entry.csvSources.includes(activeEnvironment)
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
