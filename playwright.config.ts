import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: process.env.MPKIT_URL,
    headless: true,
  },
  workers: 1,
  reporter: [['list']],
  projects: [
    {
      name: 'setup test data',
      testMatch: 'modules/**/tests/setup.spec.ts',
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup test data'],
      testMatch: ['modules/**/tests/index.spec.ts'],
    },
  ],
});
