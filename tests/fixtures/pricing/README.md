# Price table fixtures

Each CSV is the admin-entered price table for one product, committed so the suite can assert that
the pricing API serves exactly what was typed in. The git history of these files is the audit trail
for every price change.

`stickers/` holds the products under `/kr/stickers`, one CSV per product slug.

## Adding a table

1. Export the table as an `area_factor` CSV: first column is the stored `base_area` in mm², one
   further column per quantity rung. Quoted thousands separators (`"1,000"`) are fine.
2. Save it under `stickers/<slug>.csv` and point the product's `csv` field at it in
   [pricing-products.ts](./pricing-products.ts). Nothing else needs editing; the specs generate one
   test per row automatically.
3. Run it: `npm run test:pricing:static2` (or `test:pricing:prod`).

Until a CSV is committed its product's tests report as skipped rather than failing, so products can
be rolled out one export at a time. Still missing: `sticker-sheet`, `vinyl-lettering`,
`transfer-sticker`.

Row counts, quantity ladders and rate precision all differ per table and are read from the CSV — the
lettering products use an eight-rung ladder starting at 1, the rest use fourteen rungs starting at
10, and `sticker-sheet` stores ten decimal places where the others store eight. Nothing is
hardcoded.

A CSV only needs the rows its table actually has. `die-cut-sticker` starts at area 625, because
25x25 mm is the die-cut minimum and the API answers anything smaller with `No base dimension data
found!`. Conversely a CSV that stops short of its table's top row leaves those rows unverified —
`kiss-cut-sticker.csv` ends at 90,000 while the pid 23 table continues past 545,382.

## One table, several products

The server does not price one table per product: five shape products (`circle`, `rectangle`,
`square`, `oval`, `rounded`) all share `pricing_id 25`, and the `pricing_id 5` and `25` tables hold
identical rates. Products on a shared table must therefore hold matching CSVs;
`product-table-mapping.spec.ts` asserts both that they return identical stored rows and that their
CSVs agree with each other.

## How the arithmetic works

The API computes, and this suite reproduces:

```
price = roundToNearest(price_per_mm * area * quantity, normalized_nr)
```

`normalized_nr` comes back in the response (`data.normalized_nr`) and is the rounding step in KRW —
100 for eleven of the twelve `/kr/stickers` products, **10** for `sticker-sheet`. It is never
defaulted in code: [price-table.ts](./price-table.ts) takes the step as an argument, and the specs
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
curl -s "https://dev-static-2-api.musticker.com/index.php/sys/kr/pricing/quotation/hologram-sticker?width=75&height=75&quantity=100&debug=1"
```

Swap the host per [environments.ts](../environments.ts).
