import { Selector } from 'testcafe';
import RelatedModels from '../page-objects/RelatedModels';
import { checkLiquidErrors } from '@platform-os/testcafe-helpers';

const relatedModels = new RelatedModels();

fixture('Measuring execution time of liquid code fragments').page(process.env.MP_URL);

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

test.before(async t => {
  await t.navigateTo('/companies/index');
})('Measuring execution time of liquid code fragments (time_diff)', async t => {
  await t.click(relatedModels.link.programmersCompaniesSlow);
  let msSlow = await relatedModels.data.result.innerText;

  await t.click(relatedModels.link.programmersCompaniesCorrect);
  let msCorrect = await relatedModels.data.result.innerText;

  /*
    I know i know, this is not performance tetsing,
    but maybe it will detect some tragic performance regression one day. 
  */
  await t.expect(parseInt(msCorrect)).lt(parseInt(msSlow * 2));
});
