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
      name: 'admincms setup',
      testMatch: 'modules/admincms/tests/setup.spec.ts',
    },
    {
      name: 'admincms teardown',
      testMatch: 'modules/admincms/tests/teardown.spec.ts',
    },
    {
      name: 'admincms',
      use: chrome,
      dependencies: ['admincms setup'],
      teardown: 'admincms teardown',
      testMatch: 'modules/admincms/tests/index.spec.ts',
    },
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
    {
      name: 'n_plus_one',
      use: chrome,
      testMatch: 'modules/n_plus_one/tests/index.spec.ts',
    },
    {
      name: 'pdf_generation setup',
      testMatch: 'modules/pdf_generation/tests/setup.spec.ts',
    },
    {
      name: 'pdf_generation',
      use: chrome,
      dependencies: ['pdf_generation setup'],
      testMatch: 'modules/pdf_generation/tests/index.spec.ts',
    },
    {
      name: 'simplepage',
      use: chrome,
      testMatch: 'modules/simplepage/tests/index.spec.ts',
    },
    {
      name: 'users setup',
      testMatch: 'modules/users/tests/setup.spec.ts',
    },
    {
      name: 'users',
      use: chrome,
      dependencies: ['users setup'],
      testMatch: 'modules/users/tests/index.spec.ts',
    },
  ],
});
