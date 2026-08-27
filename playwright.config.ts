import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';
import type { ReporterDescription } from '@playwright/test';

import { env } from './tests/fixtures/env.js';

const ciReporters: ReporterDescription[] = [
  ['list'],
  ['html', { open: 'never' }],
  ['junit', { outputFile: 'test-results/junit.xml' }]
];

const localReporters: ReporterDescription[] = [
  ['html', { open: 'never' }],
  ['list']
];

function reportersWithAllure(reporters: ReporterDescription[]): ReporterDescription[] {
  if (!process.env.ALLURE_RESULTS_DIR) {
    return reporters;
  }

  return [...reporters, ['allure-playwright', { resultsDir: process.env.ALLURE_RESULTS_DIR }]];
}

// A sharded run cannot produce a meaningful HTML report per shard -- each one only knows about its
// own slice. `blob` emits a merge-able intermediate instead, which `npx playwright merge-reports`
// turns back into one HTML report covering every shard (see .github/actions/merge-shard-reports).
function reportersForShardedRun(reporters: ReporterDescription[]): ReporterDescription[] {
  if (process.env.PW_BLOB_REPORT !== 'true') {
    return reporters;
  }

  // `html` and `junit` are dropped because a per-shard file of either cannot be combined; `list` and
  // `allure-playwright` are kept, the latter because Allure writes one independent file per test, so
  // the shards' `allure-results` directories merge by concatenation.
  const mergeable = reporters.filter(([name]) => name !== 'html' && name !== 'junit');

  return [...mergeable, ['blob', { outputDir: process.env.PW_BLOB_OUTPUT_DIR ?? 'blob-report' }]];
}

const desktopProjects = [
  {
    name: 'chromium-desktop',
    grepInvert: /@mobile/,
    use: {
      ...devices['Desktop Chrome'],
      viewport: { width: 1440, height: 900 }
    }
  },
  {
    name: 'firefox-desktop',
    grepInvert: /@mobile/,
    use: {
      ...devices['Desktop Firefox'],
      viewport: { width: 1440, height: 900 }
    }
  },
  {
    name: 'webkit-desktop',
    grepInvert: /@mobile/,
    use: {
      ...devices['Desktop Safari'],
      viewport: { width: 1440, height: 900 }
    }
  }
];

const mobileProject = {
  name: 'chromium-mobile',
  grep: /@mobile/,
  use: {
    ...devices['Pixel 7']
  }
};

const allProjects = [...desktopProjects, mobileProject];

function selectedProjects(): typeof allProjects {
  const requestedProject = process.env.E2E_BROWSER_PROJECT ?? 'chromium-desktop';

  if (requestedProject === 'all-desktop') {
    return desktopProjects;
  }

  const project = allProjects.find((candidate) => candidate.name === requestedProject);

  if (!project) {
    throw new Error(
      `Unsupported E2E_BROWSER_PROJECT "${requestedProject}". Use chromium-desktop, firefox-desktop, webkit-desktop, chromium-mobile, or all-desktop.`
    );
  }

  return [project];
}

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 60_000,
  expect: {
    timeout: 10_000
  },
  // Unconditional rather than CI-only so a local run has the same isolation semantics as CI. With
  // the local default of one worker this changes nothing observable; it removes a divergence that
  // let order-dependent tests pass locally and fail in CI.
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 2 : 1,
  reporter: reportersForShardedRun(reportersWithAllure(process.env.CI ? ciReporters : localReporters)),
  // Deletes the throwaway members MS-V2-087/088/094 register. A no-op for every other run.
  globalTeardown: './tests/setup/global-teardown.ts',
  use: {
    baseURL: env.BASE_URL,
    headless: process.env.HEADED !== 'true',
    locale: 'ko-KR',
    timezoneId: 'Asia/Seoul',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: selectedProjects(),
  outputDir: 'test-results'
});
