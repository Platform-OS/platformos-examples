import { test, expect } from '@playwright/test';
import { checkLiquidErrors } from '../../../tests/playwright/helpers';
import Module from './page-object';

test.describe('Module', () => {
  let module: Module;

  test.beforeEach(async ({ page }) => {
    await page.goto('/admincms');
    module = new Module(page);
  });

  test('There are no liquid errors on the page', async ({ page }) => {
    await checkLiquidErrors(page);
  });

  test('There is list of Records', async () => {
    const rows = module.table('records').getByRole('row');
    const count = await rows.count();

    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const cells = rows.nth(i).getByRole('cell');
      await expect(cells.nth(0)).not.toBeEmpty();
      await expect(cells.nth(1)).toHaveText(/^\{.+\}/);
    }
  });

  test('There is list of Pages with formats', async () => {
    const slugList = [
      'dynamic-cache',
      'dynamic-records',
      'fragment-cache-long-running',
      'fragment-cache-simple',
      'contacts/clean',
      'contacts',
      'contacts/edit',
      'direct-s3-upload/images',
      'direct-s3-upload/images/record_create',
      'fragment-lazy-load/lazy-external',
      'fragment-lazy-load/lazy-inline',
      'fragment-lazy-load',
      'fragment-lazy-load/slow-code',
      'admincms'
    ];

    const table = module.table('pages');

    for (const slug of slugList) {
      await expect(table.getByRole('cell', { name: slug, exact: true })).toHaveCount(1);
    }
  });

  test('List of instance assets is present with URLs to CDN', async () => {
    const rows = module.table('assets').getByRole('row');
    const count = await rows.count();

    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const cells = rows.nth(i).getByRole('cell');
      await expect(cells.nth(0)).not.toBeEmpty();
      await expect(cells.nth(1)).toHaveText(/^https:\/\//);
    }
  });
});
