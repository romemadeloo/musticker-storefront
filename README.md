# Musticker Storefront E2E

Playwright TypeScript tests for `https://dev.musticker.com/kr` using Page Object Model classes, custom fixtures, and native Playwright tags.

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
- `TEST_USER_EMAIL`, `TEST_USER_PASSWORD`: seeded member credentials for auth and payment flows.
- `API_BASE_URL`, `API_TOKEN`, `TEST_DATA_USER_ENDPOINT`, `TEST_DATA_USER_DELETE_ENDPOINT`: API setup data management.
- `RUN_PAYMENT_E2E=true`: enables the sandbox payment test when credentials are also configured.
- `PAYMENT_METHOD`, `PAYMENT_CARD_NUMBER`, `PAYMENT_CARD_EXPIRY`, `PAYMENT_CARD_CVC`, `PAYMENT_CARD_PASSWORD`, `PAYMENT_BIRTH_DATE`: sandbox payment data.
- `PAYMENT_GATEWAY_*_SELECTOR`: optional gateway field and confirm selectors for provider-specific payment forms.

## Commands

```powershell
npm.cmd run test:e2e
npm.cmd run test:e2e:list
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

## Project Notes

- `playwright.config.ts` runs Chromium desktop at `1440x900`.
- Tests are headless by default; set `HEADED=true` for local headed runs.
- The package is ESM (`"type": "module"`), so local TypeScript imports use `.js` extensions for NodeNext compatibility.
- Shared runtime settings and environment parsing live in `tests/fixtures/env.ts`.
- Page Object Model classes live in `tests/pom`.
- Upload fixtures live in `tests/assets`.

## CI/CD

AWS CodeBuild can use `buildspec.yml`:

- Installs dependencies with `npm ci`.
- Installs Chromium with Playwright system dependencies.
- Runs `npm run typecheck`.
- Runs smoke tests and the non-slow CI suite.
- Publishes `playwright-report` and `test-results` artifacts.

Required secrets such as `TEST_USER_EMAIL`, `TEST_USER_PASSWORD`, `API_TOKEN`, and sandbox payment values should be stored in Parameter Store or Secrets Manager and injected as environment variables.

Payment tests are skipped unless `RUN_PAYMENT_E2E=true`, seeded user credentials are set, and the sandbox gateway fields/selectors required by the current provider are supplied.
