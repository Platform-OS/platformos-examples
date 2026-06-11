import { test, expect } from '@playwright/test';
import { checkLiquidErrors } from '../../../tests/playwright/helpers';
import AdminCmsPage from './page-object';

test.describe('AdminCMS', () => {
  let admincms: AdminCmsPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/admincms');
    admincms = new AdminCmsPage(page);
  });

  test('There are no liquid errors on the page', async ({ page }) => {
    await checkLiquidErrors(page);
  });

  test('There is list of Records', async () => {
    const count = await admincms.recordRows.count();

    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      await expect(admincms.recordCells(i).nth(1)).toHaveText(/^\{.+\}/);
    }
  });

  test('There is list of Pages with formats', async () => {
    const slugList = [
      'dynamic-cache',
      'dynamic-records',
      'fragment-cache-long-running',
      'fragment-cache-simple',
      'contacts/clean',
      'contacts(/:id)',
      'contacts/edit/:id',
      'direct-s3-upload/images',
      'direct-s3-upload/images/record_create',
      'fragment-lazy-load/lazy-external',
      'fragment-lazy-load/lazy-inline',
      'fragment-lazy-load',
      'fragment-lazy-load/slow-code',
      'admincms'
    ];

    for (const slug of slugList) {
      await expect(admincms.pages.getByRole('cell', { name: slug, exact: true })).toHaveCount(1);
    }
  });

  test('List of instance assets is present with URLs to CDN', async () => {
    const count = await admincms.assetRows.count();

    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      await expect(admincms.assetCells(i).nth(0)).not.toBeEmpty();
      await expect(admincms.assetCells(i).nth(1)).toHaveText(/^https:\/\//);
    }
  });
});
