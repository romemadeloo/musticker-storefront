export const env = {
  BASE_URL: process.env.BASE_URL ?? 'https://www.musticker.com/kr'
};

export function appPath(relativePath = ''): string {
  const base = new URL(env.BASE_URL);
  const basePath = base.pathname.replace(/\/$/, '');
  const cleanPath = relativePath.replace(/^\.\//, '').replace(/^\//, '');

  return cleanPath ? `${basePath}/${cleanPath}` : basePath;
}

