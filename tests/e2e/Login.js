import 'testcafe';
import LayoutPage from './page-objects/Layout';
import HomePage from './page-objects/Homepage';
import LogIn from './page-objects/Login';

const logIn = new LogIn();
const homePage = new HomePage();
const layoutPage = new LayoutPage();

fixture('Homepage').page(layoutPage.URL.staging);

test('Display error message on invalid password', async t => {
  const error = 'Invalid email or password';

  await t.click(homePage.linkLogIn);
  await logIn.signin('test@placek.com', 'wrongpassword');
  await t.expect(logIn.errorText.withText(error).exists).ok();
});

test('Log in to the Dashboard', async t => {
  await t.click(homePage.linkLogIn);
  await logIn.signin('test_user@test.com', 'password');
  await t.expect(layoutPage.alertSuccess.exists).ok();
});
