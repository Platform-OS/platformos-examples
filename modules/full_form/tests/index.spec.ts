import { test, expect } from '@playwright/test';
import { checkLiquidErrors } from '../../../tests/playwright/helpers';
import FullFormPage from './page-object';

test.describe('FullForm', () => {
  let form: FullFormPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/full-form-example');
    form = new FullFormPage(page);
  });

  test('There are no liquid errors on the page', async ({ page }) => {
    await checkLiquidErrors(page);
  });

  test('Form submitted successfully', async ({ page }) => {
    await form.emailInput.fill('test@example.com');
    await form.submitButton.click();
    await expect(page.locator('.alert').filter({ hasText: 'success' })).toBeVisible();
  });

  test('Form validation', async ({ page }) => {
    await form.submitButton.click();
    await expect(page.locator('.alert').filter({ hasText: 'fail' })).toBeVisible();
    await expect(page.locator('p').filter({ hasText: 'Hello from default payload!' })).toBeVisible();
  });
});
