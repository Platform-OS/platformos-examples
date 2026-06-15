import { Page, Locator } from '@playwright/test';

const AMP_PAGES = ['E-commerce', 'Product page', 'Gallery', 'Blog', 'Travel'];

export { AMP_PAGES };

export default class HomepagePage {
  readonly page: Page;
  readonly ampSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ampSection = page.locator('h2').filter({ hasText: 'Example Google AMP websites' });
  }
}
