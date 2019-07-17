import { Selector } from 'testcafe';
import { checkLiquidErrors } from '@platform-os/testcafe-helpers';
import Homepage from './page-object';

const homepage = new Homepage();

fixture('Homepage').page(process.env.MP_URL);

test('There are no liquid errors on the page', async t => {
  await checkLiquidErrors({ t, Selector });
});

test('AMP links present', async t => {
  for (var i = 0, len = homepage.AMP_PAGES.length; i < len; i++) {
    await t.expect(Selector('a').withText(homepage.AMP_PAGES[i]).count).gte(1);
  }
});
