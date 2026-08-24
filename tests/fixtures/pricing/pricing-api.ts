// Thin client for the public pricing quotation endpoint:
//
//   GET {apiBaseUrl}/sys/kr/pricing/quotation/{slug}?width=&height=&quantity=&debug=1
//
// No auth, cookies or headers are involved. Note the endpoint answers validation errors with HTTP
// 200 and success:false, so the status alone never proves a request worked -- fetchQuotation()
// checks both and throws with the server's own message.
//
// `debug=1` adds meta.schema, which carries the stored table row and the interpolation trace. The
// storefront only forwards debug when its own ?debug=1 is set, but the API honours it either way.
import type { APIRequestContext } from '@playwright/test';

import { apiPath } from '../env.js';

export type QuotationParams = {
  width: number;
  height: number;
  quantity?: number;
  // Sheet products select a different table per material (1=PVC 매트, 2=투명, 3=홀로그램). Unused
  // by the /kr/stickers products, wired here for the sheet-sticker category.
  materialId?: number;
  colorId?: number;
  fontId?: number;
  debug?: boolean;
};

export type QuotationPrice = {
  nr: number;
  // null when the value was interpolated rather than read straight from the table.
  price_per_mm: number | null;
  featured: number | boolean;
  price?: number;
};

export type QuotationBound = {
  id?: number;
  base_area: number;
  quantities: QuotationPrice[];
};

export type InbetweenAreaSource = {
  lower_dimension: number;
  lower_bound_price: number;
  upper_dimension: number;
  upper_bound_price: number;
  area_diff: number;
  bound_area_diff: number;
  bound_price_diff: number;
  bound_diff: number;
  diff: number;
  price: number;
};

export type InbetweenQuantitySource = {
  quantities: QuotationPrice[];
  src: {
    bound_qty_diff: number;
    qty_diff: number;
    lower_price: number;
    upper_price: number;
    bound_price_diff: number;
    bound_diff: number;
    diff: number;
    price: number;
  };
};

export type QuotationSchema = {
  exact_dimension: boolean;
  override_dimension: boolean;
  quantity_method: string;
  allowed_quantities: number[];
  bounds: QuotationBound[];
  // An empty array when the area hit a grid row exactly, otherwise keyed by quantity.
  inbetween_src: Record<string, InbetweenAreaSource> | unknown[];
  inbetween_qty_src: InbetweenQuantitySource | null;
};

export type QuotationBody = {
  success: boolean;
  message: string;
  data: {
    product_variant_id?: number;
    // The rounding step the API applies to the line total.
    normalized_nr: number;
    sheet: unknown;
    prices: QuotationPrice[];
    sticker_quantities: unknown[];
  };
  meta: {
    pricing_id: number;
    pricing: string;
    schema?: QuotationSchema;
  };
};

export function describeQuotation(slug: string, params: QuotationParams): string {
  const quantity = params.quantity === undefined ? '' : ` qty=${params.quantity}`;
  return `${slug} ${params.width}x${params.height}${quantity}`;
}

export async function fetchQuotation(
  request: APIRequestContext,
  slug: string,
  params: QuotationParams
): Promise<QuotationBody> {
  const query: Record<string, string> = {
    width: String(params.width),
    height: String(params.height)
  };

  if (params.quantity !== undefined) {
    query.quantity = String(params.quantity);
  }
  if (params.materialId !== undefined) {
    query.material_id = String(params.materialId);
  }
  if (params.colorId !== undefined) {
    query.color_id = String(params.colorId);
  }
  if (params.fontId !== undefined) {
    query.font_id = String(params.fontId);
  }
  if (params.debug) {
    query.debug = '1';
  }

  const described = describeQuotation(slug, params);
  const response = await request.get(apiPath(`/sys/kr/pricing/quotation/${slug}`), { params: query });

  if (!response.ok()) {
    throw new Error(`${described}: HTTP ${response.status()} from ${response.url()}`);
  }

  const body = (await response.json()) as QuotationBody;

  if (body.success !== true) {
    throw new Error(
      `${described}: pricing API returned success=false "${body.message}" data=${JSON.stringify(body.data)}`
    );
  }

  return body;
}

// Included in every pricing assertion message: when a table is swapped or re-dated, this turns what
// would look like hundreds of wrong cells into one obvious "you are comparing against a different
// table" signal.
export function tableIdentity(body: QuotationBody): string {
  return `served pricing_id=${body.meta.pricing_id} "${body.meta.pricing}"`;
}

export function requireSchema(body: QuotationBody, context: string): QuotationSchema {
  const schema = body.meta.schema;
  if (!schema) {
    throw new Error(`${context}: response carries no meta.schema (was debug=1 sent?)`);
  }
  return schema;
}

// The stored table row behind an exact-area hit: quantity -> price_per_mm, straight out of the
// admin-entered table with no interpolation applied.
export function storedRow(body: QuotationBody, context: string): Map<number, number> {
  const schema = requireSchema(body, context);

  if (schema.bounds.length !== 1) {
    throw new Error(
      `${context}: expected exactly one stored bound, got [${schema.bounds.map((bound) => bound.base_area).join(', ')}]`
    );
  }

  const row = new Map<number, number>();
  for (const quantity of schema.bounds[0].quantities) {
    if (quantity.price_per_mm === null) {
      throw new Error(`${context}: stored row has a null price_per_mm at nr=${quantity.nr}`);
    }
    row.set(quantity.nr, quantity.price_per_mm);
  }

  return row;
}

export function areaInterpolation(body: QuotationBody, quantity: number, context: string): InbetweenAreaSource {
  const source = requireSchema(body, context).inbetween_src;

  if (Array.isArray(source)) {
    throw new Error(`${context}: inbetween_src is empty, so the area was an exact grid row`);
  }

  const trace = source[String(quantity)];
  if (!trace) {
    throw new Error(`${context}: inbetween_src has no entry for quantity ${quantity}`);
  }

  return trace;
}

export function quotedPrice(body: QuotationBody, quantity: number, context: string): number {
  const price = body.data.prices.find((entry) => entry.nr === quantity)?.price;

  if (price === undefined) {
    throw new Error(
      `${context}: no price returned for quantity ${quantity} (got [${body.data.prices.map((entry) => entry.nr).join(', ')}])`
    );
  }

  return price;
}
