# Musticker Storefront E2E

Playwright TypeScript tests for the Musticker storefront using Page Object Model classes, custom fixtures, and native Playwright tags. The default local target is `https://dev.musticker.com/kr`; production-safe runs target `https://www.musticker.com/kr`.

## Setup

On Windows PowerShell, use `npm.cmd` / `npx.cmd` so execution policy does not block npm scripts.

```powershell
npm.cmd install
npx.cmd playwright install chromium
npm.cmd run test:e2e:list
```

Create a local `.env` file when you need seeded auth, API setup, or sandbox payment coverage. Tests that require missing environment values are skipped with an explicit reason.

Common environment variables:

- `BASE_URL`: storefront URL, defaults to `https://dev.musticker.com/kr`.
- `PRODUCTION_BASE_URL`: optional GitHub Actions variable for production workflows, defaults to `https://www.musticker.com/kr`.
- `TEST_USER_EMAIL`, `TEST_USER_PASSWORD`: seeded member credentials for auth and payment flows.
- `API_BASE_URL`, `API_TOKEN`, `TEST_DATA_USER_ENDPOINT`, `TEST_DATA_USER_DELETE_ENDPOINT`: API setup data management.
- `RUN_PAYMENT_E2E=true`: enables the sandbox payment test when credentials are also configured.
- `RUN_ORDER_ALL_PRODUCTS_E2E=true`: enables only the dedicated all-products order test. Use with `RUN_PAYMENT_E2E=true`.
- `ORDER_ALL_PRODUCTS_PAYLOAD`: optional JSON payload for the all-products order test. It can include `credentials`, `checkout`, and `products`.
- `ORDER_ALL_PRODUCTS_PAYLOAD_FILE`: optional path to a JSON payload file for the all-products order test. Use this instead of `ORDER_ALL_PRODUCTS_PAYLOAD`.
- `SKIP_SEEDED_AUTH_SETUP=true`: skips global seeded-user auth setup; used by the self-registering member regression.
- `REGISTRATION_OTP_ENDPOINT`: dev/test endpoint for the latest registration OTP. Defaults to `https://dev-api.musticker.com/index.php/sys/kr/tester/get-otp`; GET endpoints receive `email` as a query parameter, and `{email}` URL templates are also supported.
- `REGISTRATION_OTP_METHOD`: OTP request method, defaults to `GET`.
- `REGISTRATION_OTP_REQUEST_FROM`: OTP request `Request-From` header, defaults to `glophics-dev`.
- `TOSS_BANK_TRANSFER_PASSWORD`: Toss bank-transfer sandbox password, defaults to `000000`.
- `TOSS_PAYMENT_STATUS_WEBHOOK_URL`: Toss payment-status webhook used by the member regression payment bypass, defaults to the dev API endpoint.
- `TOSS_PAYMENT_WEBHOOK_CREATED_AT`: webhook `createdAt` payload value, defaults to `2022-01-01T00:00:00.000000`.
- `TOSS_PAYMENT_WEBHOOK_PAYMENT_KEY`, `TOSS_PAYMENT_WEBHOOK_MID`: optional webhook payload overrides; defaults match the dev Toss test payload.
- `ORDER_COMPLETION_DETAILS_ENDPOINT`: order completion details endpoint template, defaults to `https://dev-api.musticker.com/index.php/sys/kr/orders/completion/details/{orderId}`.
- `BYPASS_ARTWORK_UPLOAD=true`: optional fallback for environments where real artwork upload is unavailable. Leave unset for the member regression so uploaded artwork uses real traceable PNG files.
- `PAYMENT_METHOD`, `PAYMENT_CARD_NUMBER`, `PAYMENT_CARD_EXPIRY`, `PAYMENT_CARD_CVC`, `PAYMENT_CARD_PASSWORD`, `PAYMENT_BIRTH_DATE`: sandbox payment data.
- `PAYMENT_GATEWAY_*_SELECTOR`: optional gateway field and confirm selectors for provider-specific payment forms.

## Commands

```powershell
npm.cmd run test:e2e
npm.cmd run test:e2e:list
npm.cmd run test:prod:smoke
npm.cmd run test:prod:full
npm.cmd run test:smoke
npm.cmd run test:regression
npm.cmd run test:e2e:journeys
npm.cmd run test:api
npm.cmd run test:setup
npm.cmd run test:ci
npm.cmd run test:e2e:headed
npm.cmd run test:e2e:ui
npm.cmd run test:e2e:headed:ui
npm.cmd run test:e2e:payment
npm.cmd run test:e2e:member-regression
npm.cmd run test:e2e:order-all-products
```

Quality checks:

```powershell
npm.cmd run typecheck
npm.cmd run lint
```

Direct Playwright tag examples:

```powershell
npx.cmd playwright test --grep @smoke
npx.cmd playwright test --grep @regression
npx.cmd playwright test --grep "(?=.*@regression)(?=.*@slow)"
npx.cmd playwright test --grep-invert @slow
```

## Test Categories

- `@smoke`: fast critical checks such as home/header loading and seeded login.
- `@regression`: broad storefront validation for search, auth, product configuration, cart, and checkout.
- `@e2e`: complete user journeys that cross multiple pages or systems.
- `@api` / `@setup`: API-backed test data creation and cleanup.
- `@slow`: long-running sandbox payment coverage.
- `@production`: production-readiness checks.
- `@destructive`: tests that create durable data, call test-data APIs, or place orders.

## Project Notes

- `playwright.config.ts` runs Chromium desktop at `1440x900`.
- Tests are headless by default; set `HEADED=true` for local headed runs.
- The package is ESM (`"type": "module"`), so local TypeScript imports use `.js` extensions for NodeNext compatibility.
- Shared runtime settings and environment parsing live in `tests/fixtures/env.ts`.
- Page Object Model classes live in `tests/pom`.
- Upload files are generated at runtime and attached to the Playwright report.

## CI/CD

AWS CodeBuild can use `buildspec.yml`:

- Installs dependencies with `npm ci`.
- Installs Chromium with Playwright system dependencies.
- Runs `npm run typecheck`.
- Runs smoke tests and the non-slow CI suite.
- Publishes `playwright-report` and `test-results` artifacts.

Required secrets such as `TEST_USER_EMAIL`, `TEST_USER_PASSWORD`, `API_TOKEN`, and sandbox payment values should be stored in Parameter Store or Secrets Manager and injected as environment variables.

Payment tests are skipped unless `RUN_PAYMENT_E2E=true`, seeded user credentials are set, and the sandbox gateway fields/selectors required by the current provider are supplied.

GitHub Actions workflows:

- `pr-checks.yml`: lint, typecheck, and smoke coverage for pull requests.
- `smoke.yml`: fast buyer smoke checks on pushes to `develop` and `main`.
- `member-regression.yml`: daily/manual dev member purchase regression with payment flow enabled.
- `nightly-regression.yml`: production-safe scheduled/manual regression against `https://www.musticker.com/kr`.
- `manual-playwright.yml`: manual QA dispatch with suite and browser selection, defaulting to production mode.
- `production-full-suite.yml`: production mode workflow for `https://www.musticker.com/kr`; runs static checks, production availability smoke, and the production-safe full suite on pushes to `main` or `production-mode-test-suite`, daily schedule, and manual dispatch.

Each Playwright workflow uploads raw artifacts. Runs on the repository default branch also publish an Allure report with history to GitHub Pages, matching the protected `github-pages` deployment environment.

Production mode safety:

- Use `npm.cmd run test:prod:smoke` for a fast live-site health check.
- Use `npm.cmd run test:prod:full` for the full production-safe suite.
- Production workflows set `RUN_PAYMENT_E2E=false`, `RUN_ORDER_ALL_PRODUCTS_E2E=false`, and exclude `@payment`, `@slow`, `@api`, `@setup`, and `@destructive`.
- Use `PRODUCTION_TEST_USER_EMAIL` and `PRODUCTION_TEST_USER_PASSWORD` only if QA has a production-safe seeded member. Otherwise seeded login tests skip cleanly.

The full new-member purchase regression is skipped unless `RUN_PAYMENT_E2E=true`. It registers a disposable member through the UI, generates traceable 800x800 PNG files for profile and product artwork uploads, fetches the OTP from the configured tester endpoint by sending `{ "email": "..." }` with `Request-From: glophics-dev`, creates the bank-transfer Toss order from checkout, posts the Toss payment-status webhook using the captured `AO-...-dev` order number, waits for `/orders/completion/details/{numericOrderId}` to return matching paid order details, and verifies `/kr/checkout/confirmation?order_id={numericOrderId}`.

The all-products order test is skipped unless `RUN_ORDER_ALL_PRODUCTS_E2E=true`, `RUN_PAYMENT_E2E=true`, and member credentials are provided. It logs in with the payload credentials or `TEST_USER_EMAIL` / `TEST_USER_PASSWORD`, empties the cart, discovers product detail links from the storefront unless `products` are supplied in the payload, adds every product, and places one bank-transfer order. Example payload:

```json
{
  "credentials": {
    "email": "member@example.com",
    "password": "password"
  },
  "checkout": {
    "fullName": "Musticker E2E",
    "phone": "01012345678"
  },
  "products": [
    {
      "path": "./stickers/die-cut-sticker",
      "productName": "Die Cut Sticker",
      "widthMm": 75,
      "heightMm": 75,
      "quantity": 10
    }
  ]
}
```
