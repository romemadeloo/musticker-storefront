# Price table fixtures

Each CSV is the admin-entered price table for one product, committed so the suite can assert that
the pricing API serves exactly what was typed in. The git history of these files is the audit trail
for every price change.

`stickers/` holds the products under `/kr/stickers`, one CSV per product slug.

## Adding a table

1. Export the table as an `area_factor` CSV: first column is the stored `base_area` in mm², one
   further column per quantity rung. Quoted thousands separators (`"1,000"`) are fine.
2. Save it under `stickers/<slug>.csv` and point the product's `csv` field at it in
   [pricing-products.ts](./pricing-products.ts), and set `csvSource` to the environment you exported
   it from. Nothing else needs editing; the specs generate one test per row automatically.
3. Run it: `npm run test:pricing:dev1` (or `test:pricing:static2`, `test:pricing:prod`).

Until a CSV is committed its product's tests report as skipped rather than failing, so products can
be rolled out one export at a time. Still missing: `sticker-sheet`, `vinyl-lettering`,
`transfer-sticker`.

## Table ids and rates are per environment

The servers do not all carry the same generation of these tables. Verified live on 2026-08-24:

| | production / development-static-2 | development-1 |
|---|---|---|
| die-cut | 5 `Die Cut` | 45 `Die Cut Pricing (8/21/2026)` |
| kiss-cut | 23 `Kiss Cut` | 47 `Kiss Cut Pricing (8/21/2026)` |
| the five shapes | 25 `Die Cut / Kiss Cut` | 46 `Die Cut / Kiss Cut Pricing (8/21/2026)` |
| clear | 30 `Clear - Die Cut / Kiss Cut` | 49 `Clear Die Cut / Kiss Cut Pricing (8/21/2026) v.2` |
| hologram | 31 `Hologram - Die Cut / Kiss Cut` | 50 `Hologram Die Cut / Kiss Cut Pricing (8/21/2026)` |

The generations differ in their **rates**, not only their ids — 9 of 14 cells on a probe row — so a
CSV is only a valid baseline for the environment it came from. `pricing-products.ts` therefore holds
`pricingIds` per environment and a single `csvSource`, and the suite splits accordingly:

- `product-table-mapping.spec.ts` asserts table identity and the rounding step, and runs on **every**
  environment that has recorded ids.
- `price-table.spec.ts` and `price-interpolation.spec.ts` compare rates against the CSV, and run
  **only** on `csvSource`. Elsewhere they skip with the reason spelled out.

So against production the suite is 11 passed / 18 skipped, and against development-1 it is all 1339.
An environment with no recorded ids skips everything rather than guessing. To switch one on, probe it
and add its ids to `pricingIds`.

`normalizedNr` was checked on both generations and is stable, so it is not per environment.

The development servers return **HTTP 502** under sustained concurrency, which surfaces as a failed
row rather than a pricing mismatch — `test:pricing:dev1` uses 4 workers and 2 retries for that
reason. If a run shows failures, check whether they are all `HTTP 502` before suspecting the tables.

Row counts, quantity ladders and rate precision all differ per table and are read from the CSV — the
lettering products use an eight-rung ladder starting at 1, the rest use fourteen rungs starting at
10, and `sticker-sheet` stores ten decimal places where the others store eight. Nothing is
hardcoded.

A CSV only needs the rows its table actually has. `die-cut-sticker` starts at area 625, because
25x25 mm is the die-cut minimum and the API answers anything smaller with `No base dimension data
found!`. Conversely a CSV that stops short of its table's top row leaves those rows unverified —
`kiss-cut-sticker.csv` ends at 90,000 while the kiss-cut table continues past 545,382.

## One table, several products

The server does not price one table per product: five shape products (`circle`, `rectangle`,
`square`, `oval`, `rounded`) all share one table — `pricing_id 25` on production, `46` on
development-1 — and the die-cut and shared shape tables hold identical rates. Products on a shared
table must therefore hold matching CSVs; `product-table-mapping.spec.ts` asserts both that they
return identical stored rows and that their CSVs agree with each other. It groups by the id resolved
for the environment under test, so the grouping follows whichever generation that server carries.

## How the arithmetic works

The API computes, and this suite reproduces:

```
price = roundToNearest(price_per_mm * area * quantity, normalized_nr)
```

`normalized_nr` comes back in the response (`data.normalized_nr`) and is the rounding step in KRW —
100 for every `/kr/stickers` product, **10** for `sticker-sheet`. It is never defaulted in code:
[price-table.ts](./price-table.ts) takes the step as an argument, and the specs
assert the served value matches the registry so a silent backend change fails loudly.

Lookup is keyed on **area alone**, never shape — `10x40` and `20x20` both resolve to `base_area:
400`. Off-grid sizes and off-ladder quantities are interpolated linearly, with one asymmetry that is
easy to get backwards and is verified against live `debug=1` traces:

| interpolating | operates on |
|---|---|
| area, between two grid rows | the **unrounded** bound totals, rounding once at the end |
| quantity, between two rungs | the **already rounded** rung totals |

## Probing by hand

The endpoint is public — no auth, cookies or headers. `debug=1` returns the stored row plus the
interpolation trace. Note it answers validation errors with HTTP 200 and `success: false`, so never
trust the status alone.

```bash
curl -s "https://dev-api.musticker.com/index.php/sys/kr/pricing/quotation/hologram-sticker?width=75&height=75&quantity=100&debug=1"
```

Swap the host per [environments.ts](../environments.ts). `meta.pricing_id` in the reply is how you
find the ids for an environment that is not in the table above.
