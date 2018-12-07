import 'testcafe';
import LayoutPage from './page-objects/Layout';
import HomePage from './page-objects/Homepage';
import SignIn from './page-objects/Signin';

const signIn = new SignIn();
const homePage = new HomePage();
const layoutPage = new LayoutPage();

fixture('Homepage').page(layoutPage.URL.staging);

test('Log in to the Dashboard', async t => {
  await t.click(homePage.linkLogIn);
  await signIn.signin('test_user@test.com', 'password');
  await t.expect(layoutPage.alertSuccess.exists).ok();
});
