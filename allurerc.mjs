import { defineConfig } from 'allure';
import process from 'node:process';

const shouldPublish = process.env.ALLURE_PUBLISH === 'true' && !!process.env.ALLURE_SERVICE_ACCESS_TOKEN;

export default defineConfig({
  name: process.env.ALLURE_REPORT_NAME ?? 'Musticker Storefront E2E',
  output: process.env.ALLURE_REPORT_DIR ?? 'allure-report',
  historyPath: process.env.ALLURE_HISTORY_PATH,
  historyLimit: Number(process.env.ALLURE_HISTORY_LIMIT ?? 50),
  plugins: {
    awesome: {
      options: {
        publish: shouldPublish,
        reportLanguage: 'en'
      }
    }
  },
  allureService: shouldPublish
    ? {
        accessToken: process.env.ALLURE_SERVICE_ACCESS_TOKEN
      }
    : undefined
});
