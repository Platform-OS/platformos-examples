import { defineConfig, devices } from '@playwright/test';

const chrome = { ...devices['Desktop Chrome'] };

export default defineConfig({
  use: {
    baseURL: process.env.MPKIT_URL,
    headless: true,
  },
  workers: 1,
  reporter: [['list']],
  projects: [
    {
      name: 'contacts setup',
      testMatch: 'modules/contacts/tests/setup.spec.ts',
    },
    {
      name: 'contacts',
      use: chrome,
      dependencies: ['contacts setup'],
      testMatch: 'modules/contacts/tests/index.spec.ts',
    },
    {
      name: 'feedback setup',
      testMatch: 'modules/feedback/tests/setup.spec.ts',
    },
    {
      name: 'feedback',
      use: chrome,
      dependencies: ['feedback setup'],
      testMatch: 'modules/feedback/tests/index.spec.ts',
    },
    {
      name: 'full_form',
      use: chrome,
      testMatch: 'modules/full_form/tests/index.spec.ts',
    },
    {
      name: 'homepage',
      use: chrome,
      testMatch: 'modules/homepage/tests/index.spec.ts',
    },
    {
      name: 'include',
      use: chrome,
      testMatch: 'modules/include/tests/index.spec.ts',
    },
    {
      name: 'multilanguage',
      use: chrome,
      testMatch: 'modules/multilanguage/tests/index.spec.ts',
    },
  ],
});
