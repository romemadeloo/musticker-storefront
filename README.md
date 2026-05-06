# Musticker Storefront E2E

Playwright TypeScript tests for `https://dev.musticker.com/kr` using Page Object Model classes and native Playwright tags.

## Setup

```powershell
npm.cmd install
npx.cmd playwright install chromium
npm.cmd run test:e2e:list
```

Configure `.env` from `.env.example` for seeded auth, sandbox payment, or API setup runs. Tests that require missing environment values are skipped with an explicit reason.

## Test Categories

- `@smoke`: fast critical checks such as home/header loading and seeded login.
- `@regression`: broad storefront validation for search, auth, product configuration, cart, and checkout.
- `@e2e`: complete user journeys that cross multiple pages or systems.
- `@api` / `@setup`: API-backed test data creation and cleanup.
- `@slow`: long-running sandbox payment coverage.

## Commands

```powershell
npm.cmd run test:e2e
npm.cmd run test:smoke
npm.cmd run test:regression
npm.cmd run test:e2e:journeys
npm.cmd run test:api
npm.cmd run test:ci
npm.cmd run test:e2e:headed
npm.cmd run test:e2e:ui
npm.cmd run test:e2e:payment
```

Direct Playwright tag examples:

```powershell
npx.cmd playwright test --grep @smoke
npx.cmd playwright test --grep @regression
npx.cmd playwright test --grep "(?=.*@regression)(?=.*@slow)"
npx.cmd playwright test --grep-invert @slow
```

## CI/CD

`playwright.config.ts` is pipeline-ready:

- Chromium desktop only at `1440x900`.
- Headless by default; set `HEADED=true` for local headed runs.
- Parallel workers enabled in CI with retries, traces on retry, and screenshots/videos on failure.
- HTML, list, and JUnit reporters in CI.

AWS CodeBuild can use `buildspec.yml`. Required secrets such as `TEST_USER_EMAIL`, `TEST_USER_PASSWORD`, `API_TOKEN`, and sandbox payment values should be stored in Parameter Store or Secrets Manager and injected as environment variables.

Payment tests are skipped unless `RUN_PAYMENT_E2E=true`, seeded user credentials are set, and the sandbox gateway fields/selectors required by the current provider are supplied.
