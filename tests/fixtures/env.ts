export const env = {
  BASE_URL: process.env.BASE_URL ?? 'https://www.musticker.com/kr',
  API_BASE_URL: process.env.API_BASE_URL,
  AUTH_TEST_EMAIL: process.env.AUTH_TEST_EMAIL,
  AUTH_TEST_PASSWORD: process.env.AUTH_TEST_PASSWORD
};

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
