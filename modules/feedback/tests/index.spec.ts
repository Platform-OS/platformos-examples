import { test, expect } from '@playwright/test';
import { checkLiquidErrors } from '../../../tests/playwright/helpers';
import FeedbackPage from './page-object';

const CREATE_MESSAGE = 'Playwright feedback create test';
const UPDATE_MESSAGE = 'Playwright feedback update test';

test.describe('Feedback', () => {
  let feedback: FeedbackPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/feedback');
    feedback = new FeedbackPage(page);
  });

  test('There are no liquid errors on the page', async ({ page }) => {
    await checkLiquidErrors(page);
  });

  test('Create record works', async ({ page }) => {
    await feedback.createRatingExcellent.click();
    await feedback.createMessage.fill(CREATE_MESSAGE);

    await Promise.all([
      page.waitForResponse(resp => resp.request().method() === 'POST'),
      feedback.createButton.click(),
    ]);

    await feedback.refreshButton.click();
    await page.waitForLoadState('networkidle');

    await expect(feedback.tableRows).toHaveCount(1);
    await expect(feedback.firstRow().rating).toHaveText('Excellent');
    await expect(feedback.firstRow().message).toHaveText(CREATE_MESSAGE);
  });

  test('Update record works', async ({ page }) => {
    await feedback.refreshButton.click();
    await page.waitForLoadState('networkidle');

    const id = await feedback.firstRow().id.textContent();

    await feedback.updateId.fill(id!.trim());
    await feedback.updateRatingMeh.click();
    await feedback.updateMessage.fill(UPDATE_MESSAGE);

    await Promise.all([
      page.waitForResponse(resp => resp.request().method() === 'POST'),
      feedback.updateButton.click(),
    ]);

    await feedback.refreshButton.click();
    await page.waitForLoadState('networkidle');

    await expect(feedback.firstRow().rating).toHaveText('Meh');
    await expect(feedback.firstRow().message).toHaveText(UPDATE_MESSAGE);
  });

  test('Delete record works', async ({ page }) => {
    await feedback.refreshButton.click();
    await page.waitForLoadState('networkidle');

    await expect(feedback.tableRows).toHaveCount(1);

    const id = await feedback.firstRow().id.textContent();

    await feedback.deleteId.fill(id!.trim());

    await Promise.all([
      page.waitForResponse(resp => resp.request().method() === 'POST'),
      feedback.deleteButton.click(),
    ]);

    await feedback.refreshButton.click();
    await page.waitForLoadState('networkidle');

    await expect(feedback.tableRows).toHaveCount(0);
  });
});
