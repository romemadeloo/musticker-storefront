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
npm.cmd run test:env:smoke
npm.cmd run test:env:full
npm.cmd run test:env:mobile
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

musticker runs one production server and 5 development/staging servers, each with its own git branch of the same name. Branch names match the keys in `tests/fixtures/environments.ts` exactly.

| Environment | Branch | Storefront (`BASE_URL`) | API (`API_BASE_URL`) |
| --- | --- | --- | --- |
| Production | `production` | `https://www.musticker.com/kr` | `https://api.musticker.com/index.php` |
| Static/QA | `development-static` | `https://dev-static-1.musticker.com/kr` | `https://dev-static-1-api.musticker.com/index.php` |
| Dev 1 | `development-1` | `https://dev.musticker.com/kr` | `https://dev-api.musticker.com/index.php` |
| Dev 2 | `development-2` | `https://dev-2.musticker.com/kr` | `https://dev-2-api.musticker.com/index.php` |
| Dev 3 | `development-3` | `https://dev-3.musticker.com/kr` | `https://dev-3-api.musticker.com/index.php` |
| Dev 4 | `development-4` | `https://dev-4.musticker.com/kr` | `https://dev-4-api.musticker.com/index.php` |

`smoke.yml` and `pr-checks.yml` pick the environment automatically from the branch name (`E2E_ENVIRONMENT: ${{ github.ref_name }}`) — no per-branch conditionals needed. `manual-playwright.yml` exposes the same 6 as a workflow-dispatch dropdown.

Locally, either:

```powershell
$Env:E2E_ENVIRONMENT = "development-2"
npm.cmd run test:env:smoke
```

or set `BASE_URL`/`API_BASE_URL` directly (these always take precedence over `E2E_ENVIRONMENT`). `npm run test:prod:*` remains a production-only shortcut.

> `development-1`'s frontend host (`dev.musticker.com`) did not resolve during setup on 2026-08-11, while its API host (`dev-api.musticker.com`) responded correctly. Confirm that hostname before relying on `development-1` storefront (non-API) tests.

## Environment Variables

- `E2E_ENVIRONMENT`: selects a named environment from `tests/fixtures/environments.ts` (see table above). Ignored for any URL that `BASE_URL`/`API_BASE_URL` already sets explicitly.
- `BASE_URL`: storefront URL override. Defaults to `https://www.musticker.com/kr` if neither this nor `E2E_ENVIRONMENT` is set.
- `API_BASE_URL`: API origin/path override for direct API checks. Falls back to `E2E_ENVIRONMENT`'s API URL, then to a `BASE_URL`-derived guess (only correct for hostnames starting with `dev.`).
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
