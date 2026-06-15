import { Page, Locator } from '@playwright/test';

export default class AdminCmsPage {
  readonly page: Page;
  readonly records: Locator;
  readonly recordRows: Locator;
  readonly pages: Locator;
  readonly assets: Locator;
  readonly assetRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.records = page.locator('[data-result="records"]');
    this.recordRows = this.records.locator('tbody').getByRole('row');
    this.pages = page.locator('[data-result="pages"]');
    this.assets = page.locator('[data-result="assets"]');
    this.assetRows = this.assets.locator('tbody').getByRole('row');
  }

  recordCells(rowIndex: number): Locator {
    return this.recordRows.nth(rowIndex).getByRole('cell');
  }

  assetCells(rowIndex: number): Locator {
    return this.assetRows.nth(rowIndex).getByRole('cell');
  }
}
