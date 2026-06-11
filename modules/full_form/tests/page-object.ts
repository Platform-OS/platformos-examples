import { Page, Locator } from '@playwright/test';

export default class FullFormPage {
  readonly emailInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.emailInput = page.locator('#form_email');
    this.submitButton = page.locator('button.btn-primary');
  }
}
