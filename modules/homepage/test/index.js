import { Selector } from 'testcafe';
import { checkLiquidErrors } from '@platform-os/testcafe-helpers';
import Homepage from './page-object';

const homepage = new Homepage();

fixture('Homepage').page(process.env.MP_URL);

test('There are no liquid errors on the page', async t => {
  await checkLiquidErrors({ t, Selector });
});

test('AMP links present', async t => {
  homepage.AMP_PAGES.forEach(async href => {
    const body = await Selector('body');
    const a = await Selector(`a[href=${href}]`);

    await t.expect(await body.textContent).contains(await a.textContent);
  });
});
