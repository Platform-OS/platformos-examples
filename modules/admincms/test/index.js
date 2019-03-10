import { Selector } from 'testcafe';
import { checkLiquidErrors } from '@platform-os/testcafe-helpers';
import Module from './page-object';

const module = new Module();

fixture('Module').page(`${process.env.MP_URL}/admincms`);

test('There are no liquid errors on the page', async t => {
  await checkLiquidErrors({ t, Selector });
});

test('There is list of Customizations', async t => {
  let tableRowsCount = module.table.propertiesRows;
  let count = await tableRowsCount.count;

  await t.expect(count).gt(0);

  for (let i = 0; i < count; i++) {
    const row = tableRowsCount.nth(i);
    await t.expect(await row.innerText).match(/("email"=>"|"rate"=>")/);
  }
});

test('There is list of Pages with formats', async t => {
  let tableRowsCount = module.table.pagesRows;
  let count = await tableRowsCount.count;

  await t.expect(count).gt(0);

  for (let i = 0; i < count; i++) {
    const row = tableRowsCount.nth(i);
    await t.expect(row.innerText).match(/(html|json)/);
  }
});

test('List of instance assets is present with URLs to CDN', async t => {
  let tableRowsCount = module.table.assetsRows;
  let count = await tableRowsCount.count;

  for (let i = 0; i < count; i++) {
    const row = tableRowsCount.nth(i);
    await t.expect(row.innerText).notMatch(/.*\/assets\/$/);
  }
});
