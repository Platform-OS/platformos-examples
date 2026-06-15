import { test, expect } from '@playwright/test';
import { checkLiquidErrors } from '../../../tests/playwright/helpers';
import PdfGenerationPage from './page-object';

test.describe('PDF Requests', () => {
  let pdfPage: PdfGenerationPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/pdf-generation');
    pdfPage = new PdfGenerationPage(page);
  });

  test('There are no liquid errors on the page', async ({ page }) => {
    await checkLiquidErrors(page);
  });

  test('Create PDF file', async ({ page }) => {
    await Promise.all([
      page.waitForURL('/pdf-generation'),
      pdfPage.saveButton.click(),
    ]);

    // PDF is generated asynchronously — reload until the link appears
    await expect(async () => {
      await page.reload();
      await expect(pdfPage.pdfLink).toBeVisible();
    }).toPass({ timeout: 30000 });

    await expect(pdfPage.pdfLink).toHaveAttribute('href', /\.pdf/);

    await pdfPage.deleteButton.click();
  });
});
