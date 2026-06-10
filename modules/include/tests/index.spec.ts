import { test, expect } from '@playwright/test';
import { checkLiquidErrors } from '../../../tests/playwright/helpers';
import IncludePage from './page-object';

test.describe('Include tag and exports tag', () => {
  let includePage: IncludePage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/include');
    includePage = new IncludePage(page);
  });

  test('There are no liquid errors on the page', async ({ page }) => {
    await checkLiquidErrors(page);
  });

  test('Simple include', async () => {
    await expect(includePage.result(1)).toContainText('This is first partial');
    await expect(includePage.result(1)).toContainText('This is second partial');
  });

  test('Local variable using with', async () => {
    await expect(includePage.result(2)).toContainText('{"maker":"Honda","model":"CRX"}');
  });

  test('Iterating over collection using for', async () => {
    await expect(includePage.result(3)).toContainText(
      '{"maker":"Honda","model":"CRX"}{"maker":"Subaru","model":"Forester"}{"maker":"Lexus","model":"LFA"}'
    );
  });

  test('Private variables - Demonstration', async () => {
    await expect(includePage.result(4)).not.toContainText('Honda');
  });

  test('Private variables - Exporting variable', async () => {
    await expect(includePage.result(5)).toContainText(
      'Car: {"honda":{"maker":"Honda","model":"CRX","year":"1991"}}'
    );
  });

  test('Nested objects are working inside exports', async () => {
    await expect(includePage.result(6)).toContainText('Honda');
  });
});
