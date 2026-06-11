# Musticker Storefront Production Test Plan

## Purpose

This plan defines the QA and automation strategy for the Musticker storefront E2E suite in production mode. The suite is designed to give QA and developers fast confidence on the live buyer experience while keeping production data, payments, and customer-facing state safe.

Production target:

```text
https://www.musticker.com/kr
```

## Branch

Production-mode QA automation work lives on:

```text
production-mode-test-suite
```

## Test Structure

```text
tests/
  e2e/
    api/            Gated API test data setup and cleanup checks
    auth/           Login, account menu, registration entry points, and member access checks
    discovery/      Search and product discovery behavior
    purchasing/     Product configuration, upload, cart, checkout, and gated payment coverage
    regression/     Long, cross-feature, gated business-critical journeys
    smoke/          Fast storefront availability, navigation, and production-readiness checks
    validation/     Negative, validation, and expected error-handling scenarios
  fixtures/         Environment parsing, API clients, generated uploads, guards, and shared data
  pom/              Page objects and reusable UI component models
```

## Test Levels

| Level | Purpose | Production Safe | Default Trigger |
| --- | --- | --- | --- |
| Static quality | TypeScript and ESLint checks before any browser run | Yes | Pull request and production workflow |
| Availability smoke | Confirms critical production routes return usable HTML and the home page renders | Yes | Production workflow |
| Buyer smoke | Confirms home, navigation, search, product configuration, and cart behavior | Yes | Production workflow and manual QA |
| Production-safe full suite | Runs all non-destructive UI/API-free coverage against production | Yes | Production workflow |
| Gated sandbox payment | Verifies checkout and payment only when explicitly enabled in a controlled environment | No for live production | Manual only |
| All-products order | Places a broad order and must be run only by explicit QA decision in a safe environment | No for live production | Manual only |

## Coverage Matrix

| Area | Coverage | Primary Tags | Production Mode |
| --- | --- | --- | --- |
| Production availability | Critical route status, HTML responses, home page shell | `@production`, `@smoke`, `@availability` | Included |
| Smoke/navigation | Home page load, header navigation, review carousel | `@smoke`, `@navigation` | Included |
| Auth | Seeded member login when credentials exist, guest account menu registration entry | `@auth`, `@regression` | Guest-safe checks included; seeded login optional |
| Validation/error handling | Invalid login, required registration fields, non-member lookup validation, invalid upload format, product custom option gating | `@validation`, `@error-handling` | Included |
| Discovery | Search dialog empty state, search results, result navigation, Escape and close-button behavior | `@discovery`, `@search` | Included |
| Purchasing | Product configuration, upload-later cart flow, supported file upload, cart removal | `@purchasing`, `@cart`, `@product` | Included until checkout/payment |
| Payment checkout | Seeded user sandbox checkout | `@payment`, `@slow`, `@destructive` | Excluded by default |
| New member purchase regression | Disposable member registration through Toss bank-transfer confirmation | `@regression`, `@e2e`, `@payment`, `@slow`, `@destructive` | Excluded by default |
| Order all products | Explicitly gated single order containing every discovered or supplied product | `@order-all-products`, `@payment`, `@slow`, `@destructive` | Excluded by default |
| API setup | Create/delete disposable API test user | `@api`, `@setup`, `@destructive` | Excluded by default |

## Run Commands

| Goal | Command |
| --- | --- |
| List discovered tests | `npm run test:e2e:list` |
| Local smoke against configured `BASE_URL` | `npm run test:smoke` |
| Production smoke | `npm run test:prod:smoke` |
| Production-safe full suite | `npm run test:prod:full` |
| Auth-focused suite | `npm run test:auth` |
| Purchasing-focused suite | `npm run test:purchasing` |
| Validation/error handling | `npm run test:validation` or `npm run test:error-handling` |
| Full regression-tagged suite | `npm run test:regression` |
| API setup checks | `npm run test:api` |
| Sandbox payment checkout | `npm run test:e2e:payment` |
| New member purchase regression | `npm run test:e2e:member-regression` |
| Order all products only | `npm run test:e2e:order-all-products` |
| All tests for the configured environment | `npm run test:e2e` |

## GitHub Actions

| Workflow | Trigger | Purpose |
| --- | --- | --- |
| `pr-checks.yml` | Pull requests to `develop` or `main` | Runs lint, TypeScript, and smoke tests. |
| `smoke.yml` | Push to `develop` or `main` | Runs fast buyer-facing smoke coverage. |
| `nightly-regression.yml` | Daily at 02:00 Asia/Manila, plus manual dispatch | Runs production-safe regression coverage against `https://www.musticker.com/kr`. |
| `manual-playwright.yml` | Manual QA dispatch | Lets QA choose suite, grep, and browser project with production as the default target. |
| `production-full-suite.yml` | Push to `main` or `production-mode-test-suite`, daily schedule, and manual dispatch | Runs production static checks, availability smoke, and the production-safe full suite against `https://www.musticker.com/kr`. |

Each Playwright workflow publishes Playwright artifacts, test results, traces, screenshots, videos on failure, and Allure output when results exist.

## Production Safety Rules

- Production workflows must default `RUN_PAYMENT_E2E=false`.
- Production workflows must exclude `@payment`, `@slow`, `@api`, `@setup`, and `@destructive` tests unless QA intentionally runs a manual controlled flow.
- Tests may add products to an isolated browser cart, but production-safe tests must remove what they add or stop before payment.
- Tests must not create production users, call production test-data APIs, post payment webhooks, or place orders by default.
- Seeded credentials are optional in production. If absent, seeded-user tests skip with a clear reason.
- Any test that creates durable data must carry `@destructive` and an explicit environment gate.

## Environment Requirements

Default development target:

```text
BASE_URL=https://dev.musticker.com/kr
```

Production target:

```text
BASE_URL=https://www.musticker.com/kr
```

Seeded-user tests require:

```text
TEST_USER_EMAIL=<seeded member email>
TEST_USER_PASSWORD=<seeded member password>
```

Payment and order-producing tests require all of the following and should stay pointed at non-production or sandbox infrastructure:

```text
RUN_PAYMENT_E2E=true
TEST_USER_EMAIL=<seeded member email>
TEST_USER_PASSWORD=<seeded member password>
PAYMENT_METHOD=<sandbox payment method>
```

Order-all-products testing also requires:

```text
RUN_ORDER_ALL_PRODUCTS_E2E=true
RUN_PAYMENT_E2E=true
```

API setup tests require:

```text
API_BASE_URL=<api base url>
API_TOKEN=<api token>
TEST_DATA_USER_ENDPOINT=<create user endpoint>
TEST_DATA_USER_DELETE_ENDPOINT=<delete user endpoint, if different>
```

## QA Execution Strategy

Run `npm run test:prod:smoke` first when validating production availability.

Run `npm run test:prod:full` for a full production-safe release check. This should remain safe to run repeatedly against the live storefront.

Run focused suites during feature work:

- Auth changes: `npm run test:auth`
- Product/cart/checkout changes: `npm run test:purchasing`
- Form or upload validation changes: `npm run test:validation`
- Search/navigation changes: `npm run test:smoke` plus `playwright test --grep @search`

Run payment, member-registration, webhook, and all-products order flows only when QA has selected a controlled environment and confirmed the necessary credentials and sandbox integrations.

## Automation Best Practices

- Keep tests behavior-driven and user-facing; use page objects for reusable UI behavior.
- Prefer resilient selectors such as roles and test IDs before localized text.
- Keep smoke tests short, independent, and low data-dependency.
- Gate destructive, payment, API setup, and durable-data scenarios with explicit tags and environment variables.
- Use generated traceable upload files for artwork/profile upload evidence.
- Treat unexpected console errors and failed HTTP responses as failures unless explicitly allowed for a known scenario.
- Avoid shared mutable state across tests. Create disposable data in non-production or use seeded accounts only for read-safe flows.
- Add validation tests when behavior protects users from bad input or expected errors.
- Attach diagnostics in CI: Playwright HTML, traces, screenshots, videos, JUnit, and Allure.

## Recommended Next Coverage

- Checkout form required-field validation before placing orders.
- Coupon and points edge cases with seeded non-production account balances.
- Order history lookup for member and non-member flows.
- Empty-cart drawer behavior from the header once the storefront exposes the drawer consistently.
- Mobile production smoke coverage after mobile layout selectors stabilize.
- Accessibility smoke checks for key pages if an accessibility library is added.
