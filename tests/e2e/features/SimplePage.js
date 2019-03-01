import 'testcafe';
import LayoutPage from '../page-objects/Layout';
import SimplePage from '../page-objects/SimplePage';
import HomePage from '../page-objects/Homepage';

const layoutPage = new LayoutPage();
const simplePage = new SimplePage();
const homePage = new HomePage();

fixture('Simple page').page(layoutPage.URL.staging);

test('There are no liquid errors on the page', async t => {
  await t.click(homePage.link.simplePage);
  await layoutPage.checkLiquidErrors();
});

test('Header and content is correct', async t => {
  await t
    .expect(simplePage.element.headerPage.innerText)
    .eql('About us page')
    .expect(simplePage.element.info.innerText)
    .eql('A paragraph explaining what we do.');
});
