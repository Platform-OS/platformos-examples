import 'testcafe';
import LayoutPage from './page-objects/Layout';
import HomePage from './page-objects/Homepage';
import LogIn from './page-objects/Login';

const logIn = new LogIn();
const homePage = new HomePage();
const layoutPage = new LayoutPage();

fixture('Homepage').page(layoutPage.URL.staging);

test('Log in to the Dashboard', async t => {
  await t.click(homePage.linkLogIn);
  await logIn.signin('test_user@test.com', 'password');
  await t.expect(layoutPage.alertSuccess.exists).ok();
});
