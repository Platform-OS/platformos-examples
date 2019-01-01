import 'testcafe';
import LayoutPage from './page-objects/Layout';
import HomePage from './page-objects/Homepage';
import RelatedModels from './page-objects/RelatedModels';
import TimeDiff from './page-objects/TimeDiff';

const layoutPage = new LayoutPage();
const homePage = new HomePage();
const relatedModels = new RelatedModels();
const timeDiff = new TimeDiff();

fixture('Measuring execution time of liquid code fragments').page(
  layoutPage.URL.staging
);

test('There are no liquid errors on the page', async t => {
  await t.click(homePage.link.timeDiff);
  await layoutPage.checkLiquidErrors();
});

test('There is a link to documentation', async t => {
  await t
    .click(homePage.link.timeDiff)
    .expect(timeDiff.link.documentation.exists)
    .ok();
});

test('Measuring execution time of liquid code fragments (time_diff)', async t => {
  await t
    .click(homePage.link.timeDiff)
    .click(relatedModels.link.programmersCompaniesSlow);
  let msSlow = await relatedModels.data.result.innerText;
  await t.click(relatedModels.link.programmersCompaniesCorrect);
  let msCorrect = await relatedModels.data.result.innerText;
  await t.expect(parseInt(msCorrect)).lt(parseInt(msSlow));
});