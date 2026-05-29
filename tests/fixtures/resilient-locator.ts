import type { Locator } from '@playwright/test';

export type LocatorCandidate = {
  name: string;
  locator: Locator;
};

export async function firstLocatorWithCount(candidates: LocatorCandidate[], timeout = 0): Promise<Locator> {
  const tried = candidates.map((candidate) => candidate.name);
  const startedAt = Date.now();

  while (true) {
    for (const candidate of candidates) {
      if ((await candidate.locator.count()) > 0) {
        return candidate.locator;
      }
    }

    const elapsed = Date.now() - startedAt;
    if (timeout <= 0 || elapsed >= timeout) {
      break;
    }

    await new Promise((resolve) => setTimeout(resolve, Math.min(100, timeout - elapsed)));
  }

  throw new Error(`No locator candidate matched. Tried: ${tried.join(', ')}`);
}

export async function firstVisibleLocator(candidates: LocatorCandidate[], timeout = 2_000): Promise<Locator> {
  const tried: string[] = [];

  for (const candidate of candidates) {
    tried.push(candidate.name);

    const locator = candidate.locator.first();
    if (await locator.waitFor({ state: 'visible', timeout }).then(() => true).catch(() => false)) {
      return locator;
    }
  }

  throw new Error(`No visible locator candidate matched. Tried: ${tried.join(', ')}`);
}
