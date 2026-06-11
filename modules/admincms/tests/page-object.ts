import { Page, Locator } from '@playwright/test';

export default class Module {
  table: (text: string) => Locator;

  constructor(page: Page) {
    this.table = (text: string) => page.locator(`[data-result="${text}"]`);
  }
}
