import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testMatch: ['modules/**/test/index.spec.ts'],
  use: {
    baseURL: process.env.MPKIT_URL,
    headless: true,
    ...devices['Desktop Chrome'],
  },
  workers: 1,
  reporter: [['list']],
});
