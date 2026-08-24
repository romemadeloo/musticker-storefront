import { environments, isEnvironmentName } from './environments.js';
import type { EnvironmentName } from './environments.js';

const selectedEnvironment = resolveSelectedEnvironment();

export const env = {
  BASE_URL: process.env.BASE_URL ?? selectedEnvironment?.baseUrl ?? 'https://www.musticker.com/kr',
  API_BASE_URL: process.env.API_BASE_URL ?? selectedEnvironment?.apiBaseUrl,
  AUTH_TEST_EMAIL: process.env.AUTH_TEST_EMAIL,
  AUTH_TEST_PASSWORD: process.env.AUTH_TEST_PASSWORD
};

// Which named environment this run is pointed at, for fixtures that hold per-environment data (the
// pricing registry, whose table ids differ per server). E2E_ENVIRONMENT is authoritative when set;
// otherwise BASE_URL is matched back against the registry, because the production-facing scripts
// (test:prod:*, test:regression, and the nightly/full-suite workflows) set BASE_URL instead.
//
// Undefined means "pointed somewhere not in the registry" -- an ad-hoc BASE_URL, say. Callers must
// treat that as unknown rather than assuming production: env-specific expectations cannot be
// asserted against a server we have no recorded data for.
export const activeEnvironment: EnvironmentName | undefined = resolveActiveEnvironmentName();

export function appPath(relativePath = ''): string {
  const base = new URL(env.BASE_URL);
  const basePath = base.pathname.replace(/\/$/, '');
  const cleanPath = relativePath.replace(/^\.\//, '').replace(/^\//, '');

  return cleanPath ? `${basePath}/${cleanPath}` : basePath;
}

export function apiPath(relativePath: string): string {
  const base = new URL(env.API_BASE_URL ?? defaultApiBaseUrl());
  const cleanPath = relativePath.replace(/^\.\//, '').replace(/^\//, '');
  const basePath = base.pathname.replace(/\/$/, '');

  return `${base.origin}${basePath}/${cleanPath}`;
}

function defaultApiBaseUrl(): string {
  const base = new URL(env.BASE_URL);
  const apiHost = base.hostname.startsWith('dev.') ? 'dev-api.musticker.com' : 'api.musticker.com';

  return `${base.protocol}//${apiHost}/index.php`;
}

function normalizeBaseUrl(value: string): string {
  return value.replace(/\/+$/, '').toLowerCase();
}

function resolveActiveEnvironmentName(): EnvironmentName | undefined {
  const requested = process.env.E2E_ENVIRONMENT;
  if (requested) {
    // Already validated by resolveSelectedEnvironment(), which throws on an unknown name.
    return requested as EnvironmentName;
  }

  const target = normalizeBaseUrl(env.BASE_URL);
  const names = Object.keys(environments) as EnvironmentName[];

  return names.find((name) => normalizeBaseUrl(environments[name].baseUrl) === target);
}

function resolveSelectedEnvironment(): { baseUrl: string; apiBaseUrl: string } | undefined {
  const requested = process.env.E2E_ENVIRONMENT;
  if (!requested) {
    return undefined;
  }

  if (!isEnvironmentName(requested)) {
    throw new Error(
      `Unsupported E2E_ENVIRONMENT "${requested}". Use one of: ${Object.keys(environments).join(', ')}.`
    );
  }

  return environments[requested];
}
