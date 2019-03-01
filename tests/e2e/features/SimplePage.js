import 'testcafe';
import LayoutPage from '../page-objects/Layout';
import SimplePage from '../page-objects/SimplePage';

const layoutPage = new LayoutPage();
const simplePage = new SimplePage();

fixture('Simple page').page(`${layoutPage.URL.staging}/about`);

test('There are no liquid errors on the page', async () => {
  await layoutPage.checkLiquidErrors();
});

test('Header and content is correct', async t => {
  await t
    .expect(simplePage.element.headerPage.innerText)
    .eql('About us page')
    .expect(simplePage.element.info.innerText)
    .eql('A paragraph explaining what we do.');
});
