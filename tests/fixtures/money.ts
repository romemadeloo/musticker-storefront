/**
 * Won amounts as the storefront renders them, and back again.
 *
 * Every price in this app is a `1,234원` string, sometimes with a leading minus for a discount row
 * (`-0원`), sometimes with the sign separated by a space (` -0원`, as the checkout summary emits).
 * The pricing suite works in numbers throughout; these helpers are the boundary between the two so
 * that arithmetic assertions -- subtotal + shipping = total -- can be written as arithmetic.
 *
 * Fractional amounts are preserved rather than rounded: per-unit readouts really are fractional
 * (`8.582원`), which was confirmed intended, so a parser that rounded would quietly hide changes
 * there.
 */
const wonPattern = /(-?)\s*([\d,]+(?:\.\d+)?)\s*원/u;

export function parseWon(value: string): number {
  const match = value.replace(/\s+/g, ' ').match(wonPattern);

  if (!match) {
    throw new Error(`Expected a won amount in "${value}".`);
  }

  const amount = Number(match[2].replace(/,/g, ''));

  return match[1] === '-' ? -amount : amount;
}

/** The last won amount in a block of text -- summary rows put the figure after its label. */
export function parseLastWon(value: string): number {
  const amounts = [...value.replace(/\s+/g, ' ').matchAll(/(-?)\s*([\d,]+(?:\.\d+)?)\s*원/gu)];

  if (!amounts.length) {
    throw new Error(`Expected at least one won amount in "${value}".`);
  }

  const [, sign, digits] = amounts[amounts.length - 1];
  const amount = Number(digits.replace(/,/g, ''));

  return sign === '-' ? -amount : amount;
}

export function formatWon(amount: number): string {
  return `${amount.toLocaleString('en-US')}원`;
}
