import 'testcafe';
import LayoutPage from '../page-objects/Layout';
import SimplePage from '../page-objects/SimplePage';
import HomePage from '../page-objects/Homepage';
import Documentation from '../page-objects/Documentation';

const layoutPage = new LayoutPage();
const simplePage = new SimplePage();
const homePage = new HomePage();
const documentation = new Documentation();

fixture('Simple page').page(layoutPage.URL.staging);

test.skip('There is a link to the documentation', async t => {
  await t.click(homePage.link.simplePage).click(simplePage.link.documentation);
  await t.expect(documentation.element.titlePage.innerText).eql(documentation.title.pagesTitle);
});
