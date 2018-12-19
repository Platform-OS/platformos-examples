import { Selector } from 'testcafe';
import LayoutPage from './page-objects/Layout';
import HomePage from './page-objects/Homepage';
import RelatedModels from './page-objects/RelatedModels';

const layoutPage = new LayoutPage();
const homePage = new HomePage();
const relatedModels = new RelatedModels();

fixture('Loading related models while avoiding n+1 queries').page(
  layoutPage.URL.staging
);

test('There are no liquid errors on the page', async t => {
  await t.click(homePage.link.models);
  await layoutPage.checkLiquidErrors();
  await t.expect(relatedModels.link.documentation.exists).ok();
});

test('Loading related models while avoiding n+1 queries. Increase speed 10x', async t => {
  await t
    .click(homePage.link.models)
    .expect(relatedModels.table.companies.count)
    .eql(20)
    .expect(relatedModels.table.benchmarkingResults.count)
    .eql(3);
  await t
    .click(relatedModels.link.onlyProgrammers)
    .expect(relatedModels.table.companies.count)
    .eql(20)
    .expect(relatedModels.table.benchmarkingResults.count)
    .eql(3);
  await t
    .click(relatedModels.link.programmersCompaniesSlow)
    .expect(relatedModels.table.companies.count)
    .eql(20)
    .expect(relatedModels.table.benchmarkingResults.count)
    .eql(3);
  await t
    .click(relatedModels.link.programmersCompaniesCorrect)
    .expect(relatedModels.table.companies.count)
    .eql(20)
    .expect(relatedModels.table.benchmarkingResults.count)
    .eql(3);
});
