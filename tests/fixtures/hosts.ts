// Host patterns shared by the response/console guard (e2e-test.ts) and the navigation retry
// (navigation.ts). Kept in one place so the dev-environment naming scheme cannot drift between
// them -- environments.ts is the source of truth for the hosts these must cover.

// Matches api.musticker.com plus every numbered/static dev API host from environments.ts
// (dev-api, dev-2-api, dev-3-api, dev-4-api, dev-static-1-api, ...).
export const DEV_API_HOST = '(?:dev(?:-static)?(?:-\\d+)?-)?api\\.musticker\\.com';

// Matches musticker.com plus every numbered/static dev storefront origin (dev., dev-2., dev-3.,
// dev-4., dev-static-1., ...) in addition to www.
export const DEV_STOREFRONT_HOST = '(?:www|dev(?:-static)?(?:-\\d+)?)\\.musticker\\.com';
