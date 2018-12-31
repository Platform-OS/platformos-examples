import 'testcafe';
import LayoutPage from './page-objects/Layout';
import HomePage from './page-objects/Homepage';
import RelatedModels from './page-objects/RelatedModels';
import Documentation from './page-objects/Documentation';

const layoutPage = new LayoutPage ();
const homePage = new HomePage ();
const relatedModels = new RelatedModels ();
const documentation = new Documentation ();

fixture ('Loading related models while avoiding n+1 queries').page (
  layoutPage.URL.staging
);

test ('There are no liquid errors on the page', async t => {
  await t.click (homePage.link.models);
  await layoutPage.checkLiquidErrors ();
});

test ('There is a link to the documentation', async t => {
  await t.click (homePage.link.models).click (relatedModels.link.documentation);
  await t
    .expect (documentation.element.titlePage.innerText)
    .eql (documentation.title.releatedModelsTitle);
});

test ('Loading related models while avoiding n+1 queries. Increase speed 10x', async t => {
  await t
    .click (homePage.link.models)
    .click (relatedModels.link.programmersCompaniesSlow);
  let msSlow = await relatedModels.data.result.innerText;
  await t.click (relatedModels.link.programmersCompaniesCorrect);
  let msCorrect = await relatedModels.data.result.innerText;
  await t.expect (parseInt (msCorrect)).lt (parseInt (msSlow));
});
