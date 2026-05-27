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
    const rows = module.table.propertiesRows;
    const count = await rows.count();

    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const text = await rows.nth(i).innerText();
      expect(text).toMatch(/("email":"|"rate":")/);
    }
  });

  test('There is list of Pages with formats', async () => {
    const rows = module.table.pagesRows;
    const count = await rows.count();

    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const text = await rows.nth(i).innerText();
      expect(text).toMatch(/(html|json)/);
    }
  });

  test('List of instance assets is present with URLs to CDN', async () => {
    const rows = module.table.assetsRows;
    const count = await rows.count();

    for (let i = 0; i < count; i++) {
      const text = await rows.nth(i).innerText();
      expect(text).not.toMatch(/.*\/assets\/$/);
    }
  });
});
