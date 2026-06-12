import { test } from '@playwright/test';
import { checkLiquidErrors } from '../../../tests/playwright/helpers';

test.describe('n+1 - related records load much faster', () => {
  test('There are no liquid errors on the page', async ({ page }) => {
    await page.goto('/companies/index');
    await checkLiquidErrors(page);

    await page.goto('/programmers/index');
    await checkLiquidErrors(page);

    await page.goto('/programmers/with_companies_1');
    await checkLiquidErrors(page);

    await page.goto('/programmers/with_companies_2');
    await checkLiquidErrors(page);
  });
});
