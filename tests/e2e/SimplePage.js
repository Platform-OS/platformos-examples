import 'testcafe';
import LayoutPage from './page-objects/Layout';
import SimplePage from './page-objects/SimplePage';
import HomePage from './page-objects/Homepage';
import Documentation from './page-objects/Documentation';

const layoutPage = new LayoutPage();
const simplePage = new SimplePage();
const homePage = new HomePage();
const documentation = new Documentation();

fixture('Simple page').page(layoutPage.URL.staging);

test('There are no liquid errors on the page', async t => {
  await t.click(homePage.link.simplePage);
  await layoutPage.checkLiquidErrors();
});

test('There is a link to the documentation', async t => {
  await t.click(homePage.link.simplePage);
  await t.click(simplePage.link.documentation);
  layoutPage.checkURL(documentation.URL.production + '/tutorials/pages/pages');
});

test('About us page', async t => {
  await t
    .click(homePage.link.simplePage)
    .expect(simplePage.link.documentation.exists)
    .ok();
  await t
    .expect(simplePage.element.headerPage.innerText)
    .eql('About us page')
    .expect(simplePage.element.info.innerText)
    .eql('A paragraph explaining what we do.');
});
