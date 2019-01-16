import 'testcafe';
import LayoutPage from '../page-objects/Layout';
import HomePage from '../page-objects/Homepage';
import Module from '../page-objects/Module';

const layoutPage = new LayoutPage();
const homePage = new HomePage();
const module = new Module();

fixture('Module').page(layoutPage.URL.staging);

test('There are no liquid errors on the page', async t => {
  await t.click(homePage.link.module);
  await layoutPage.checkLiquidErrors();
});

test('There are should be list of Customizations', async t => {
  await t.click(homePage.link.module);

  let tableRowsCount = module.table.propertiesRows;
  let count = await tableRowsCount.count;

  await t.expect(count).gt(0);

  for (let i = 0; i < count; i++) {
    const row = tableRowsCount.nth(i);
    await t.expect(row.innerText).match(/"email"=>"/);
  }
});

test('There are should be list of Pages', async t => {
  await t.click(homePage.link.module);

  let tableRowsCount = module.table.pagesRows;
  let count = await tableRowsCount.count;

  await t.expect(count).gt(0);

  for (let i = 0; i < count; i++) {
    const row = tableRowsCount.nth(i);
    await t.expect(row.innerText).match(/html/);
  }
});

test('There are should be list of instance assets', async t => {
  await t.click(homePage.link.module);

  let tableRowsCount = module.table.assetsRows;
  let count = await tableRowsCount.count;

  for (let i = 0; i < count; i++) {
    const row = tableRowsCount.nth(i);
    await t.expect(row.innerText).match(/.*cloudfront\.net.*/);
  }
});
