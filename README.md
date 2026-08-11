# Musticker Storefront E2E v2

Playwright TypeScript tests for the Musticker storefront v2 suite described in `test-case.md`.

The default target is production-safe:

```powershell
npm.cmd install
npx.cmd playwright install chromium
npm.cmd run test:e2e:list
```

## Commands

```powershell
npm.cmd run test:e2e
npm.cmd run test:e2e:list
npm.cmd run test:prod:smoke
npm.cmd run test:prod:full
npm.cmd run test:prod:mobile
npm.cmd run test:dev:smoke
npm.cmd run test:dev:full
npm.cmd run test:dev:mobile
npm.cmd run test:smoke
npm.cmd run test:regression
npm.cmd run test:purchasing
npm.cmd run test:validation
npm.cmd run test:visual
npm.cmd run test:api
npm.cmd run test:ci
npm.cmd run typecheck
npm.cmd run lint
```

## Environments

| Environment | Branch | Storefront (`BASE_URL`) | API (`API_BASE_URL`) |
| --- | --- | --- | --- |
| Production | `production` | `https://www.musticker.com/kr` | `https://api.musticker.com/index.php` |
| Development/staging | `develop` | `https://dev-3.musticker.com/kr` | `https://dev-3-api.musticker.com/index.php` |

`smoke.yml` picks the environment automatically based on which branch triggered the push (`develop` → dev-3, `production` → production). Locally, use `npm run test:dev:*` for the dev-3 environment and `npm run test:prod:*` for production.

## Environment Variables

- `BASE_URL`: storefront URL. Defaults to `https://www.musticker.com/kr`.
- `API_BASE_URL`: API origin/path for direct API checks. Defaults from `BASE_URL` to `https://api.musticker.com/index.php` or `https://dev-api.musticker.com/index.php`. Set explicitly for the dev-3 environment since its API host (`dev-3-api.musticker.com`) doesn't match that default `dev.`-prefix heuristic.
- `E2E_BROWSER_PROJECT`: `chromium-desktop`, `firefox-desktop`, `webkit-desktop`, `chromium-mobile`, or `all-desktop`.
- `RUN_VISUAL_E2E=true`: enables visual snapshot tests after baselines are approved.
- `RUN_PAYMENT_E2E=true`: enables the guarded destructive checkout placeholder.

## Test Categories

- `@smoke`: v2 critical public storefront checks.
- `@regression`: v2 category, FAQ, accessibility, and broader storefront checks.
- `@production`: production-safe tests.
- `@mobile`: mobile-only critical path.
- `@purchasing`: production-safe product configuration checks.
- `@validation`: inquiry validation/contract checks.
- `@api`: production-safe read-only API contract checks.
- `@visual`: gated screenshot comparisons.
- `@destructive`: guarded checkout coverage from `MS-V2-025`.

## Structure

- `tests/e2e`: v2 specs only.
- `tests/pom`: v2 page objects plus shared header/search/cart helpers.
- `tests/fixtures`: v2 test data, environment helpers, and guarded Playwright fixture.
- `test-case.md`: source test-case matrix.
