import { Page, Locator } from '@playwright/test';

export default class PdfGenerationPage {
  readonly saveButton: Locator;
  readonly pdfLink: Locator;
  readonly deleteButton: Locator;

  constructor(page: Page) {
    this.saveButton = page.locator('button.btn.btn-primary.btn-lg');
    this.pdfLink = page.locator('td a[href]');
    this.deleteButton = page.locator('button.btn.btn-link');
  }
}
