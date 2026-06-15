import { Page, Locator } from '@playwright/test';

export default class IncludePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  result(n: number): Locator {
    return this.page.locator(`[data-result="${n}"]`);
  }
}
