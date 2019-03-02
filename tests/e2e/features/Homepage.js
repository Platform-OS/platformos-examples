import { Selector } from 'testcafe';
import { checkLiquidErrors } from '@platform-os/testcafe-helpers';

fixture('Homepage').page(process.env.MP_URL);

test('There are no liquid errors on the page', async t => {
  await checkLiquidErrors({ t, Selector });
});
