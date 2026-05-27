import { expect, Page } from '@playwright/test';

export async function checkLiquidErrors(page: Page): Promise<void> {
  const bodyText = await page.locator('body').textContent();
  expect(bodyText).not.toContain('Liquid Error');
  expect(bodyText).not.toContain('RenderFormTag Error:');
  expect(bodyText).not.toContain('QueryGraphTag Error:');
  expect(bodyText).not.toContain('ExecuteQueryTagError:');
}

export async function getBtAlertText(page: Page, type = 'success'): Promise<string | null> {
  return page.locator(`.alert.alert-${type}`).textContent();
}
