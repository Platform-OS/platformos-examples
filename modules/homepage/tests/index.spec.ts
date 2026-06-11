import { test, expect } from '@playwright/test';
import { checkLiquidErrors } from '../../../tests/playwright/helpers';
import { AMP_PAGES } from './page-object';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('There are no liquid errors on the page', async ({ page }) => {
    await checkLiquidErrors(page);
  });

  test('AMP links present', async ({ page }) => {
    for (const text of AMP_PAGES) {
      await expect(page.getByRole('link', { name: text })).toBeVisible();
    }
  });
});
