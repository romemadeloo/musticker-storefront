# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: pricing/price-interpolation.spec.ts >> pricing interpolation rectangle-roll >> MS-PRC-INT-rectangle-roll quantity 15 interpolates between rungs 10 and 20
- Location: tests/e2e/pricing/price-interpolation.spec.ts:160:7

# Error details

```
Error: rectangle-roll 130x130 qty=15: HTTP 502 from https://api.musticker.com/index.php/sys/kr/pricing/quotation/rectangle-roll?width=130&height=130&quantity=15&debug=1
```

# Test source

```ts
  109 | // apart, so all of them land inside the same block window. Re-requesting with a growing delay does.
  110 | //
  111 | // This endpoint takes no auth and answers validation errors with HTTP 200 + success:false (see the
  112 | // note at the top of this file), so a 403 here is always the blocker rather than a real refusal.
  113 | const throttleRetryDelaysMs = [2_000, 4_000, 8_000, 15_000];
  114 | 
  115 | // The ladder above spends ~29s over five attempts, which fits inside the 60s per-test timeout.
  116 | // Budgeting that per test rather than per call keeps it fitting: a test that quotes several
  117 | // products in a loop (product-table-mapping.spec.ts walks a whole shared-table group) would
  118 | // otherwise stack one full ladder per call and time out instead of reporting the throttling.
  119 | // Keyed on the `request` fixture, which Playwright builds fresh for each test.
  120 | const throttleWaitBudgetMs = throttleRetryDelaysMs.reduce((sum, delay) => sum + delay, 0);
  121 | const spentThrottleWaitMs = new WeakMap<APIRequestContext, number>();
  122 | 
  123 | function isThrottleBlocked(response: APIResponse): boolean {
  124 |   return response.status() === 403;
  125 | }
  126 | 
  127 | // Reserves the next delay in the ladder against the test's budget, or returns undefined once this
  128 | // call has run out of rungs or the test has run out of budget.
  129 | function claimThrottleDelay(request: APIRequestContext, rung: number): number | undefined {
  130 |   const delayMs = throttleRetryDelaysMs[rung];
  131 | 
  132 |   if (delayMs === undefined) {
  133 |     return undefined;
  134 |   }
  135 | 
  136 |   const spentMs = spentThrottleWaitMs.get(request) ?? 0;
  137 | 
  138 |   if (spentMs + delayMs > throttleWaitBudgetMs) {
  139 |     return undefined;
  140 |   }
  141 | 
  142 |   spentThrottleWaitMs.set(request, spentMs + delayMs);
  143 | 
  144 |   return delayMs;
  145 | }
  146 | 
  147 | export async function fetchQuotation(
  148 |   request: APIRequestContext,
  149 |   slug: string,
  150 |   params: QuotationParams
  151 | ): Promise<QuotationBody> {
  152 |   const query: Record<string, string> = {
  153 |     width: String(params.width),
  154 |     height: String(params.height)
  155 |   };
  156 | 
  157 |   if (params.quantity !== undefined) {
  158 |     query.quantity = String(params.quantity);
  159 |   }
  160 |   if (params.materialId !== undefined) {
  161 |     query.material_id = String(params.materialId);
  162 |   }
  163 |   if (params.colorId !== undefined) {
  164 |     query.color_id = String(params.colorId);
  165 |   }
  166 |   if (params.fontId !== undefined) {
  167 |     query.font_id = String(params.fontId);
  168 |   }
  169 |   if (params.debug) {
  170 |     query.debug = '1';
  171 |   }
  172 | 
  173 |   const described = describeQuotation(slug, params);
  174 |   const path = apiPath(`/sys/kr/pricing/quotation/${slug}`);
  175 | 
  176 |   let response = await request.get(path, { params: query });
  177 |   let attempts = 1;
  178 |   let waitedMs = 0;
  179 | 
  180 |   while (isThrottleBlocked(response)) {
  181 |     const delayMs = claimThrottleDelay(request, attempts - 1);
  182 | 
  183 |     if (delayMs === undefined) {
  184 |       break;
  185 |     }
  186 | 
  187 |     await new Promise((resolve) => setTimeout(resolve, delayMs));
  188 | 
  189 |     waitedMs += delayMs;
  190 |     response = await request.get(path, { params: query });
  191 |     attempts += 1;
  192 |   }
  193 | 
  194 |   // Reported as the throttling it is rather than as a bare "HTTP 403", so an exhausted retry budget
  195 |   // does not read like a pricing regression.
  196 |   if (isThrottleBlocked(response)) {
  197 |     throw new Error(
  198 |       [
  199 |         `${described}: pricing API returned 403 Forbidden for ${response.url()} on all ${attempts} ` +
  200 |           `attempt${attempts === 1 ? '' : 's'} over ~${Math.round(waitedMs / 1_000)}s.`,
  201 |         'This is WAF/rate-limit throttling of the CI egress IP, not a broken endpoint: the same',
  202 |         'query normally answers 200 on a manual re-check. Re-run, or widen throttleRetryDelaysMs in',
  203 |         'tests/fixtures/pricing/pricing-api.ts if the block windows have grown.'
  204 |       ].join('\n')
  205 |     );
  206 |   }
  207 | 
  208 |   if (!response.ok()) {
> 209 |     throw new Error(`${described}: HTTP ${response.status()} from ${response.url()}`);
      |           ^ Error: rectangle-roll 130x130 qty=15: HTTP 502 from https://api.musticker.com/index.php/sys/kr/pricing/quotation/rectangle-roll?width=130&height=130&quantity=15&debug=1
  210 |   }
  211 | 
  212 |   const body = (await response.json()) as QuotationBody;
  213 | 
  214 |   if (body.success !== true) {
  215 |     throw new Error(
  216 |       `${described}: pricing API returned success=false "${body.message}" data=${JSON.stringify(body.data)}`
  217 |     );
  218 |   }
  219 | 
  220 |   return body;
  221 | }
  222 | 
  223 | // Included in every pricing assertion message: when a table is swapped or re-dated, this turns what
  224 | // would look like hundreds of wrong cells into one obvious "you are comparing against a different
  225 | // table" signal.
  226 | export function tableIdentity(body: QuotationBody): string {
  227 |   return `served pricing_id=${body.meta.pricing_id} "${body.meta.pricing}"`;
  228 | }
  229 | 
  230 | export function requireSchema(body: QuotationBody, context: string): QuotationSchema {
  231 |   const schema = body.meta.schema;
  232 |   if (!schema) {
  233 |     throw new Error(`${context}: response carries no meta.schema (was debug=1 sent?)`);
  234 |   }
  235 |   return schema;
  236 | }
  237 | 
  238 | // The stored table row behind an exact-area hit: quantity -> price_per_mm, straight out of the
  239 | // admin-entered table with no interpolation applied.
  240 | export function storedRow(body: QuotationBody, context: string): Map<number, number> {
  241 |   const schema = requireSchema(body, context);
  242 | 
  243 |   if (schema.bounds.length !== 1) {
  244 |     throw new Error(
  245 |       `${context}: expected exactly one stored bound, got [${schema.bounds.map((bound) => bound.base_area).join(', ')}]`
  246 |     );
  247 |   }
  248 | 
  249 |   const row = new Map<number, number>();
  250 |   for (const quantity of schema.bounds[0].quantities) {
  251 |     if (quantity.price_per_mm === null) {
  252 |       throw new Error(`${context}: stored row has a null price_per_mm at nr=${quantity.nr}`);
  253 |     }
  254 |     row.set(quantity.nr, quantity.price_per_mm);
  255 |   }
  256 | 
  257 |   return row;
  258 | }
  259 | 
  260 | export function areaInterpolation(body: QuotationBody, quantity: number, context: string): InbetweenAreaSource {
  261 |   const source = requireSchema(body, context).inbetween_src;
  262 | 
  263 |   if (Array.isArray(source)) {
  264 |     throw new Error(`${context}: inbetween_src is empty, so the area was an exact grid row`);
  265 |   }
  266 | 
  267 |   const trace = source[String(quantity)];
  268 |   if (!trace) {
  269 |     throw new Error(`${context}: inbetween_src has no entry for quantity ${quantity}`);
  270 |   }
  271 | 
  272 |   return trace;
  273 | }
  274 | 
  275 | export function quotedPrice(body: QuotationBody, quantity: number, context: string): number {
  276 |   const price = body.data.prices.find((entry) => entry.nr === quantity)?.price;
  277 | 
  278 |   if (price === undefined) {
  279 |     throw new Error(
  280 |       `${context}: no price returned for quantity ${quantity} (got [${body.data.prices.map((entry) => entry.nr).join(', ')}])`
  281 |     );
  282 |   }
  283 | 
  284 |   return price;
  285 | }
  286 | 
```