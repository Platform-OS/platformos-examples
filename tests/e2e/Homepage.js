import 'testcafe';
import LayoutPage from './page-objects/Layout';
import HomePage from './page-objects/Homepage';

const homePage = new HomePage();
const layoutPage = new LayoutPage();

fixture('Homepage').page(layoutPage.URL.staging);

test('There are no liquid errors on the page', async () => {
  await layoutPage.checkLiquidErrors();
});

test('There are links to sign up and log in', async t => {
  await t.expect(homePage.link.register).ok();
  await t.expect(homePage.link.login).ok();
});
