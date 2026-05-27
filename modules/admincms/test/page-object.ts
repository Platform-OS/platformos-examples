import { type Page, type Locator } from '@playwright/test';

export default class Module {
  table: {
    propertiesRows: Locator;
    pagesRows: Locator;
    assetsRows: Locator;
  };

  constructor(page: Page) {
    this.table = {
      propertiesRows: page.locator('[data-result="records"] td:nth-of-type(2)'),
      pagesRows: page.locator('[data-result="pages"] td:nth-of-type(2)'),
      assetsRows: page.locator('[data-result="assets"] td:nth-of-type(2)'),
    };
  }
}
