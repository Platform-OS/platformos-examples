import { Selector } from 'testcafe';
import { checkLiquidErrors } from '@platform-os/testcafe-helpers';
import Homepage from './page-object';

const homepage = new Homepage();

fixture('Homepage').page(process.env.MP_URL);

test('There are no liquid errors on the page', async t => {
  await checkLiquidErrors({ t, Selector });
});

test('AMP links present', async t => {
  homepage.AMP_PAGES.forEach(async link => {
    const body = Selector('body');
    await t.expect(await body.textContent).contains(link);
  });
});

test('Other links present', async t => {
  homepage.LINKS.forEach(async linkText => {
    const link = await Selector('a').withText(linkText);
    await t.expect(await link.count).gte(1);
  });
});
