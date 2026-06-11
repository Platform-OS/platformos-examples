import { test, expect } from '@playwright/test';
import { checkLiquidErrors } from '../../../tests/playwright/helpers';

test.describe('Simple page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
  });

  test('There are no liquid errors on the page', async ({ page }) => {
    await checkLiquidErrors(page);
  });

  test('Header is correct', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('About us page');
  });

  test('Content is correct', async ({ page }) => {
    await expect(page.locator('p').first()).toHaveText('A paragraph explaining what we do.');
  });

  test('Cache is working', async ({ page }) => {
    const randomString = await page.locator('[data-test="random_string"]').textContent();
    expect(randomString).toHaveLength(10);

    await page.reload();

    const randomStringNew = await page.locator('[data-test="random_string"]').textContent();
    expect(randomStringNew).toBe(randomString);
  });
});
