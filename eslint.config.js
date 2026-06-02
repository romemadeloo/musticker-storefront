// eslint.config.js

import js from "@eslint/js";
import tseslint from "typescript-eslint";
import playwright from "eslint-plugin-playwright";

export default [
  {
    ignores: [
      "allure-report/**",
      "allure-results/**",
      "playwright-report/**",
      "test-results/**",
    ],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ["tests/**/*.ts"],
    plugins: {
      playwright,
    },
    rules: {
      ...playwright.configs.recommended.rules,
    },
  },

  {
    rules: {
      // General rules you probably want
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
];
