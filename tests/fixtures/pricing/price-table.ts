// Parser and pricing model for the admin-entered price tables. Each CSV is an `area_factor` grid:
// the first column is the stored `base_area` (mm^2) and each remaining column is a quantity rung,
// holding the price-per-mm^2 rate for that (area, quantity) pair.
//
// The API-side arithmetic reproduced here was derived from live `debug=1` traces, not from docs:
//   price = roundToNearest(price_per_mm * area * quantity, normalized_nr)
// with `normalized_nr` reported per product by the API (100 for most, 10 for sticker-sheet), which
// is why no rounding step is ever defaulted in this module -- callers always pass it in.
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Cell values stay as the raw CSV strings so comparisons can be exact rather than float-fuzzy; see
// canonicalNumber().
export type PriceRow = Map<number, string>;

export type PriceTable = {
  csvFileName: string;
  quantities: number[];
  areas: number[];
  rows: Map<number, PriceRow>;
};

// Minimal CSV field splitter. Needed because the header quotes its thousands separators
// ("1,000"), so a plain split(',') would shear those columns in two.
function splitCsvLine(line: string): string[] {
  const cells: string[] = [];
  let cell = '';
  let inQuotes = false;

  for (const character of line) {
    if (character === '"') {
      inQuotes = !inQuotes;
    } else if (character === ',' && !inQuotes) {
      cells.push(cell.trim());
      cell = '';
    } else {
      cell += character;
    }
  }
  cells.push(cell.trim());

  return cells;
}

export function parseAreaFactorCsv(csvText: string, csvFileName: string): PriceTable {
  const lines = csvText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length < 2) {
    throw new Error(`${csvFileName}: expected a header row plus at least one data row`);
  }

  const [headerLabel, ...quantityLabels] = splitCsvLine(lines[0]);
  if (!/^area_factor$/i.test(headerLabel)) {
    throw new Error(`${csvFileName}: first header cell should be "area_factor", got "${headerLabel}"`);
  }

  const quantities = quantityLabels.map((label) => {
    const quantity = Number(label.replace(/,/g, ''));
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error(`${csvFileName}: header quantity "${label}" is not a positive integer`);
    }
    return quantity;
  });

  const rows = new Map<number, PriceRow>();

  for (const [index, line] of lines.slice(1).entries()) {
    const cells = splitCsvLine(line);
    const area = Number(cells[0].replace(/,/g, ''));

    if (!Number.isInteger(area) || area <= 0) {
      throw new Error(`${csvFileName} row ${index + 2}: area_factor "${cells[0]}" is not a positive integer`);
    }
    if (cells.length - 1 !== quantities.length) {
      throw new Error(
        `${csvFileName} row ${index + 2} (area ${area}): has ${cells.length - 1} rate cells but the header declares ${quantities.length} quantities`
      );
    }
    if (rows.has(area)) {
      throw new Error(`${csvFileName} row ${index + 2}: area ${area} appears more than once`);
    }

    const row: PriceRow = new Map();
    for (const [column, quantity] of quantities.entries()) {
      const cell = cells[column + 1];
      if (!Number.isFinite(Number(cell))) {
        throw new Error(`${csvFileName} row ${index + 2} (area ${area}, qty ${quantity}): "${cell}" is not a number`);
      }
      row.set(quantity, cell);
    }
    rows.set(area, row);
  }

  return {
    csvFileName,
    quantities,
    areas: [...rows.keys()].sort((a, b) => a - b),
    rows
  };
}

// Returns null when the CSV has not been committed yet, so specs can skip that table with a clear
// message instead of failing while the remaining tables are rolled out one export at a time.
export function loadPriceTable(csvFileName: string): PriceTable | null {
  const csvPath = fileURLToPath(new URL(csvFileName, import.meta.url));
  if (!existsSync(csvPath)) {
    return null;
  }
  return parseAreaFactorCsv(readFileSync(csvPath, 'utf8'), csvFileName);
}

// The stored grid is keyed on area alone, so any width/height whose product hits the row works.
// Walking down from sqrt() picks the most-square pair, which keeps probes inside the configurator's
// own min/max size limits even though the pricing endpoint itself does not enforce them.
export function dimensionsForArea(area: number): { width: number; height: number } {
  for (let width = Math.floor(Math.sqrt(area)); width >= 1; width -= 1) {
    if (area % width === 0) {
      return { width, height: area / width };
    }
  }
  throw new Error(`no integer width/height pair produces area ${area}`);
}

// A second factorisation of the same area, used to prove the lookup is area-keyed and not
// shape-keyed. Returns null for areas with only one factor pair (1 x prime, or a perfect square of
// a prime).
export function alternateDimensionsForArea(area: number): { width: number; height: number } | null {
  const primary = dimensionsForArea(area);
  for (let width = primary.width - 1; width >= 1; width -= 1) {
    if (area % width === 0) {
      return { width, height: area / width };
    }
  }
  return null;
}

export function roundToNearest(value: number, step: number): number {
  if (!Number.isFinite(step) || step <= 0) {
    throw new Error(`rounding step must be a positive number, got ${step}`);
  }
  return Math.round(value / step) * step;
}

// Unrounded on purpose: the area interpolation below needs the raw product, while the quantity
// interpolation needs it rounded first. Mixing the two up shifts results by one rounding step.
export function lineTotal(pricePerMm: number, area: number, quantity: number): number {
  return pricePerMm * area * quantity;
}

export function ratePerMm(table: PriceTable, area: number, quantity: number): number {
  const cell = table.rows.get(area)?.get(quantity);
  if (cell === undefined) {
    throw new Error(`${table.csvFileName}: no rate for area ${area} at quantity ${quantity}`);
  }
  return Number(cell);
}

export function exactTotal(table: PriceTable, area: number, quantity: number, step: number): number {
  return roundToNearest(lineTotal(ratePerMm(table, area, quantity), area, quantity), step);
}

// Between two grid areas the API interpolates linearly on the *unrounded* bound totals and rounds
// only at the end. Verified against a live trace: 73x77 (area 5621) at qty 10 reports
// lower_bound_price 6799.999989999999 -- the raw product, not 6800.
export function interpolateByArea(table: PriceTable, area: number, quantity: number, step: number): number {
  const [lower, upper] = bracket(table.areas, area, `${table.csvFileName} area`);
  const lowerTotal = lineTotal(ratePerMm(table, lower, quantity), lower, quantity);
  const upperTotal = lineTotal(ratePerMm(table, upper, quantity), upper, quantity);
  const raw = lowerTotal + ((area - lower) * (upperTotal - lowerTotal)) / (upper - lower);

  return roundToNearest(raw, step);
}

// Between two ladder rungs the API interpolates on the *already rounded* rung totals. Verified
// against a live trace: 75x75 at qty 250 reports lower_price 120800 / upper_price 175000, both
// rounded, giving 120800 + 542 * 50 = 147900.
export function interpolateByQuantity(table: PriceTable, area: number, quantity: number, step: number): number {
  const [lower, upper] = bracket(table.quantities, quantity, `${table.csvFileName} quantity`);
  const lowerTotal = exactTotal(table, area, lower, step);
  const upperTotal = exactTotal(table, area, upper, step);
  const raw = lowerTotal + ((quantity - lower) * (upperTotal - lowerTotal)) / (upper - lower);

  return roundToNearest(raw, step);
}

// Picks an integer area strictly between two grid rows that also factors into a realistic probe
// shape, scanning outward from the midpoint so the sample sits well inside the interval. Returns
// null for intervals too narrow to hold one (which cannot happen in the tables seen so far).
//
// The aspect guard matters: many areas only factor into slivers (146312 is 8 x 18289), and while the
// pricing endpoint would still answer, a 18-metre-tall sticker is not a shape worth asserting on.
export function offGridAreaBetween(lower: number, upper: number): number | null {
  const midpoint = Math.floor((lower + upper) / 2);

  for (let offset = 0; offset < upper - lower; offset += 1) {
    for (const candidate of [midpoint + offset, midpoint - offset]) {
      if (candidate <= lower || candidate >= upper) {
        continue;
      }
      // Within a 4:1 aspect ratio of square.
      if (dimensionsForArea(candidate).width * 2 >= Math.sqrt(candidate)) {
        return candidate;
      }
    }
  }

  return null;
}

// Returns null for adjacent rungs (the lettering ladders start 1, 2, ...), which have no integer
// quantity between them.
export function offLadderQuantityBetween(lower: number, upper: number): number | null {
  if (upper - lower < 2) {
    return null;
  }
  return Math.floor((lower + upper) / 2);
}

// Evenly spread sample indices over a list, used to probe the low, middle and high end of a grid
// without walking all of it a second time.
export function sampleIndices(length: number, count: number): number[] {
  if (length <= count) {
    return [...Array(length).keys()];
  }

  const indices = new Set<number>();
  for (let sample = 0; sample < count; sample += 1) {
    indices.add(Math.round((sample * (length - 1)) / (count - 1)));
  }

  return [...indices].sort((a, b) => a - b);
}

export function bracket(sortedValues: number[], value: number, label: string): [number, number] {
  for (const [index, current] of sortedValues.entries()) {
    if (current > value) {
      if (index === 0) {
        throw new Error(`${label} ${value} is below the lowest entry ${current}`);
      }
      return [sortedValues[index - 1], current];
    }
    if (current === value) {
      throw new Error(`${label} ${value} is an exact entry, not an in-between value`);
    }
  }
  throw new Error(`${label} ${value} is above the highest entry ${sortedValues.at(-1)}`);
}

// JS's shortest round-trip representation of a number, used to compare an API rate against a CSV
// cell exactly. Formatting both sides this way normalises harmless differences ("0.10" vs "0.1")
// and float noise (2.1000000000000001 -> "2.1") while still failing on any real difference in
// value or precision -- which toFixed(n) or a tolerance would quietly let through.
export function canonicalNumber(value: string | number): string {
  return String(Number(value));
}
