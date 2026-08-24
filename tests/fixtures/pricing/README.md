# Price table fixtures

Each CSV here is the admin-entered price table for one pricing table, committed so the suite can
assert that the pricing API serves exactly what was typed in. The git history of these files is the
audit trail for every price change.

## Adding a table

1. Export the table as an `area_factor` CSV: first column is the stored `base_area` in mm², one
   further column per quantity rung. Quoted thousands separators (`"1,000"`) are fine.
2. Save it under the filename the registry already expects — see the `csv` field in
   [pricing-products.ts](./pricing-products.ts). Nothing else needs editing; the specs generate one
   test per row automatically.
3. Run it: `npm run test:pricing:static2` (or `test:pricing:prod`).

Until a CSV is committed, its table's tests report as skipped rather than failing, so the eight
tables can be rolled out one export at a time.

Row counts, quantity ladders and rate precision all differ per table and are read from the CSV — the
lettering tables use an eight-rung ladder starting at 1, the rest use fourteen rungs starting at 10,
and `custom-sheet` stores ten decimal places where the others store eight. Nothing is hardcoded.

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
