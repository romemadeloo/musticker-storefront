import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';
import 'dotenv/config';

import { AUTH_STORAGE_STATE, canRunPaymentE2E, normalizeBaseURL, seededUser, env } from './fixtures/env.js';
import { LoginPage } from './pom/login-page.js';

const emptyStorageState = {
  cookies: [],
  origins: []
};

async function ensureEmptyStorageState(): Promise<void> {
  await fs.mkdir(path.dirname(AUTH_STORAGE_STATE), { recursive: true });
  await fs.writeFile(AUTH_STORAGE_STATE, JSON.stringify(emptyStorageState, null, 2));
}

export default async function globalSetup(): Promise<void> {
  await fs.mkdir(path.dirname(AUTH_STORAGE_STATE), { recursive: true });

  if (process.env.SKIP_SEEDED_AUTH_SETUP === 'true') {
    await ensureEmptyStorageState();
    return;
  }

  if (!canRunPaymentE2E()) {
    await ensureEmptyStorageState();
    return;
  }

  const browser = await chromium.launch();
  const context = await browser.newContext({
    baseURL: normalizeBaseURL(env.BASE_URL),
    viewport: { width: 1440, height: 900 },
    locale: 'ko-KR',
    timezoneId: 'Asia/Seoul'
  });
  const page = await context.newPage();

  try {
    const loginPage = new LoginPage(page);
    const user = seededUser();

    await loginPage.goto();
    await loginPage.login(user.email, user.password);
    await loginPage.expectLoggedIn();
    await context.storageState({ path: AUTH_STORAGE_STATE });
  } finally {
    await browser.close();
  }
}
