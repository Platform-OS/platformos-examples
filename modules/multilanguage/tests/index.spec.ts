import { test, expect } from '@playwright/test';
import { checkLiquidErrors } from '../../../tests/playwright/helpers';
import MultiLanguagePage from './page-object';

test.describe('Multilanguage page - translations', () => {
  let ml: MultiLanguagePage;

  test.beforeEach(async ({ page }) => {
    ml = new MultiLanguagePage(page);
  });

  test('There are no liquid errors on the page', async ({ page }) => {
    await page.goto('/multilanguage');
    await checkLiquidErrors(page);
  });

  test('Default - no language - en fallback', async ({ page }) => {
    await page.goto('/multilanguage?name=John&url=https://documentation.platformos.com');

    await expect(page.locator('footer')).toBeVisible();
    await expect(ml.result(1)).toContainText('Hello world!');
    await expect(ml.result(2)).toContainText('Ford Mustang');
    await expect(ml.result(2)).toContainText('Corvette');
    await expect(ml.result(2)).toContainText('Gran Torino');
    await expect(ml.result(3)).toContainText('Hello John');
    await expect(ml.result(3)).toContainText('https://documentation.platformos.com');
    await expect(ml.result(4)).toHaveText('');
    await expect(ml.result(5)).toHaveText('en');
  });

  test('English - forced by query param', async ({ page }) => {
    await page.goto('/multilanguage?language=en');

    await expect(ml.result(1)).toContainText('Hello world!');
    await expect(ml.result(4)).toHaveText('en');
    await expect(ml.result(5)).toHaveText('en');
  });

  test('Polish - translate', async ({ page }) => {
    await page.goto('/multilanguage?language=pl&url=https://nask.pl');

    await expect(ml.result(1)).toContainText('Witaj świecie!');
    await expect(ml.result(2)).toContainText('Polonez');
    await expect(ml.result(2)).toContainText('Maluch');
    await expect(ml.result(2)).toContainText('Tarpan');
    await expect(ml.result(3)).toContainText('https://nask.pl');
    await expect(ml.result(4)).toHaveText('pl');
    await expect(ml.result(5)).toHaveText('pl');
  });

  test('Unknown language - translate', async ({ page }) => {
    await page.goto('/multilanguage?language=js&name=John&url=https://documentation.platformos.com');

    await expect(ml.result(1)).toContainText('console.log');
    await expect(ml.result(2)).toContainText('Promise');
    await expect(ml.result(2)).toContainText('reduce');
    await expect(ml.result(2)).toContainText('module');
    await expect(ml.result(3)).toContainText('John - https://documentation.platformos.com');
    await expect(ml.result(4)).toHaveText('js');
    await expect(ml.result(5)).toHaveText('js');
  });

  test('Japanese - UTF-8, emoji works', async ({ page }) => {
    await page.goto('/multilanguage?language=jp&name=おっす&url=https://🇯🇵.com');

    await expect(ml.result(1)).toContainText('今日は!');
    await expect(ml.result(3)).toContainText('おっす');
    await expect(ml.result(3)).toContainText('🇯🇵');
    await expect(ml.result(4)).toHaveText('jp');
    await expect(ml.result(5)).toHaveText('jp');
  });

  test('Unknown language has layout', async ({ page }) => {
    await page.goto('/multilanguage?language=js&name=John&url=https://documentation.platformos.com');

    await expect(page.locator('footer')).toBeVisible();
  });

  test('Authorization policy flash_alert translation works', async ({ page }) => {
    await page.goto('/multilanguage-unauthorized');
    await expect(page.locator('.alert.alert-warning')).toContainText(
      'You do not have permission to access this page'
    );

    await page.goto('/multilanguage-unauthorized?language=pl');
    await expect(page.locator('.alert.alert-warning')).toContainText(
      'Nie masz dostępu do tej strony.'
    );
  });
});
