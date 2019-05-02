import { Selector } from 'testcafe';
import PageObject from './page-object';
import { checkLiquidErrors } from '@platform-os/testcafe-helpers';

const page = new PageObject();

fixture('n+1 - related models load much faster').page(process.env.MP_URL);

test('There are no liquid errors on the page', async t => {
  await t.navigateTo('/companies/index');
  await checkLiquidErrors({ t, Selector });
  await t.navigateTo('/programmers/index');
  await checkLiquidErrors({ t, Selector });
  await t.navigateTo('/programmers/with_companies_1');
  await checkLiquidErrors({ t, Selector });
  await t.navigateTo('/programmers/with_companies_2');
  await checkLiquidErrors({ t, Selector });
});
