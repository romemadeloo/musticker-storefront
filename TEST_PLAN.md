# Musticker Storefront Test Plan

## Purpose

This plan defines the Playwright E2E strategy for the Musticker storefront. The suite is organized by business risk and execution intent so QA can run fast confidence checks, focused feature checks, and broader regression coverage without mixing unrelated scenarios.

## Test Structure

```text
tests/
  e2e/
    api/            API-backed test data setup and cleanup checks
    auth/           Login, account menu, registration entry points, and member access happy paths
    discovery/      Search and product discovery behavior
    purchasing/     Product configuration, upload, cart, checkout, and payment happy paths
    regression/     Long, cross-feature business-critical journeys
    smoke/          Fast storefront availability and navigation checks
    validation/     Negative, validation, and expected error-handling scenarios
  fixtures/         Environment, API clients, generated upload files, guards, and shared data
  pom/              Page objects and reusable UI component models
```

## Coverage Matrix

| Area | Current Coverage | Primary Tags |
| --- | --- | --- |
| Smoke | Home page load, header navigation | `@smoke`, `@navigation` |
| Auth | Seeded member login, guest account menu registration entry | `@auth`, `@regression` |
| Validation/Error Handling | Invalid login, required registration fields, non-member lookup validation, invalid upload format, product custom option gating | `@validation`, `@error-handling` |
| Discovery | Search dialog empty state, search results, result navigation, Escape and close-button behavior | `@discovery`, `@search` |
| Purchasing | Product configuration, upload-later cart flow, supported file upload, sandbox payment checkout | `@purchasing`, `@cart`, `@product`, `@payment` |
| Regression | Disposable member registration through paid bank-transfer order confirmation | `@regression`, `@e2e`, `@slow` |
| API Setup | Create/delete disposable API test user | `@api`, `@setup` |

## Run Commands

| Goal | Command |
| --- | --- |
| List discovered tests | `npm run test:e2e:list` |
| Fast smoke suite | `npm run test:smoke` |
| Auth-focused suite | `npm run test:auth` |
| Purchasing-focused suite | `npm run test:purchasing` |
| Validation/error handling | `npm run test:validation` or `npm run test:error-handling` |
| Full regression-tagged suite | `npm run test:regression` |
| E2E journey tests | `npm run test:e2e:journeys` |
| API setup checks | `npm run test:api` |
| Payment checkout | `npm run test:e2e:payment` |
| New member purchase regression | `npm run test:e2e:member-regression` |
| All tests | `npm run test:e2e` |

## CI Workflows

| Workflow | Trigger | Purpose |
| --- | --- | --- |
| `pr-checks.yml` | Pull requests to `develop` or `main` | Runs lint, TypeScript, and `@smoke` tests. |
| `smoke.yml` | Push to `develop` or `main` | Runs fast buyer-facing smoke coverage for navigation, search, product configuration, and cart. |
| `nightly-regression.yml` | Daily at 02:00 Asia/Manila, plus manual dispatch | Runs full regression-tagged coverage, including checkout/payment-enabled flows when the environment is configured. |
| `manual-playwright.yml` | Manual QA dispatch | Lets QA choose smoke, buyer-flow, regression, admin, custom grep, and Chromium/Firefox/WebKit/all desktop projects. |

Each Playwright workflow writes Allure results, generates an `allure-report/`, and uploads it with the Playwright artifacts. The shared artifact packaging lives in `.github/actions/playwright-artifacts/action.yml`.

## Environment Requirements

Default storefront target:

```text
BASE_URL=https://dev.musticker.com/kr
```

Seeded-user tests require:

```text
TEST_USER_EMAIL=<seeded member email>
TEST_USER_PASSWORD=<seeded member password>
```

Payment tests require:

```text
RUN_PAYMENT_E2E=true
TEST_USER_EMAIL=<seeded member email>
TEST_USER_PASSWORD=<seeded member password>
PAYMENT_METHOD=<sandbox payment method>
```

API setup tests require:

```text
API_BASE_URL=<api base url>
API_TOKEN=<api token>
TEST_DATA_USER_ENDPOINT=<create user endpoint>
TEST_DATA_USER_DELETE_ENDPOINT=<delete user endpoint, if different>
```

New-member purchase regression uses the OTP and Toss webhook configuration from `tests/fixtures/env.ts`. Keep these values pointed at non-production environments only.

## QA Execution Strategy

Run `npm run test:smoke` before deeper testing to confirm the environment is usable.

Run focused suites during feature work:

- Auth changes: `npm run test:auth`
- Product/cart/checkout changes: `npm run test:purchasing`
- Form or upload validation changes: `npm run test:validation`
- Search/navigation changes: `npm run test:smoke` plus `playwright test --grep @search`

Run `npm run test:regression` before release candidates. Include `npm run test:e2e:payment` and `npm run test:e2e:member-regression` only when sandbox payment, OTP, webhook, and seeded data are configured.

## Best Practices

- Keep tests user-facing and behavior-driven; prefer page objects for reusable UI behavior.
- Add tags by business intent, not only by folder. A test can be both `@smoke` and `@auth`.
- Keep smoke tests short, independent, and low data-dependency.
- Keep destructive or paid-flow coverage behind explicit env gates like `RUN_PAYMENT_E2E=true`.
- Use generated traceable upload files for artwork/profile upload evidence.
- Treat unexpected console errors and failed HTTP responses as failures unless explicitly allowed in the fixture for a known scenario.
- Avoid sharing mutable state across tests. Create disposable data or use seeded accounts only for read-safe flows.
- Add negative tests to `validation/` when behavior protects the user from bad input or expected errors.

## Recommended Next Coverage

- Checkout form required-field validation before placing orders.
- Coupon and points edge cases with seeded account balances.
- Order history lookup for member and non-member flows.
- Empty-cart drawer behavior from the header once the current dev storefront exposes the drawer consistently.
- Mobile viewport smoke coverage once mobile layouts stabilize.
- Accessibility smoke checks for key pages if an accessibility library is added.
