import 'testcafe';
import LayoutPage from '../page-objects/Layout';
import HomePage from '../page-objects/Homepage';
import RelatedModels from '../page-objects/RelatedModels';
import Documentation from '../page-objects/Documentation';

const layoutPage = new LayoutPage();
const homePage = new HomePage();
const relatedModels = new RelatedModels();
const documentation = new Documentation();

fixture('Loading related models while avoiding n+1 queries').page(
  layoutPage.URL.staging
);

test.skip('There is a link to the documentation', async t => {
  await t.click(homePage.link.models).click(relatedModels.link.documentation);
  await t
    .expect(documentation.element.titlePage.innerText)
    .eql(documentation.title.releatedModelsTitle);
});