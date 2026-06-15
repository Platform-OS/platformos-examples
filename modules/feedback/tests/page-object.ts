import { Page, Locator } from '@playwright/test';

export default class FeedbackPage {
  readonly page: Page;

  readonly createRatingExcellent: Locator;
  readonly createMessage: Locator;
  readonly createButton: Locator;

  readonly updateId: Locator;
  readonly updateRatingMeh: Locator;
  readonly updateMessage: Locator;
  readonly updateButton: Locator;

  readonly deleteId: Locator;
  readonly deleteButton: Locator;

  readonly refreshButton: Locator;
  readonly tableRows: Locator;

  constructor(page: Page) {
    this.page = page;

    this.createRatingExcellent = page.locator('[data-form="create"] label').filter({ hasText: 'Excellent' });
    this.createMessage = page.locator('#create_message');
    this.createButton = page.locator('[data-form="create"] button');

    this.updateId = page.locator('[data-form="update"] [name="record_id"]');
    this.updateRatingMeh = page.locator('[data-form="update"] label').filter({ hasText: 'Meh' });
    this.updateMessage = page.locator('#update_message');
    this.updateButton = page.locator('[data-form="update"] button');

    this.deleteId = page.locator('[data-form="delete"] [name="record_id"]');
    this.deleteButton = page.locator('[data-form="delete"] button');

    this.refreshButton = page.getByRole('button', { name: 'Refresh content from the server' });
    this.tableRows = page.locator('[data-body="readTable"] tr');
  }

  firstRow() {
    const row = this.tableRows.first();
    return {
      id: row.locator('td').nth(0),
      rating: row.locator('td').nth(3),
      message: row.locator('td').nth(4),
    };
  }
}
