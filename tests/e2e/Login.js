import 'testcafe';
import LayoutPage from './page-objects/Layout';
import LogIn from './page-objects/Login';
import Register from './page-objects/Register';

const logIn = new LogIn();
const register = new Register();
const layoutPage = new LayoutPage();

fixture('Log in').page(layoutPage.URL.staging);

test('Display error message on invalid password', async t => {
  await logIn.login('test@placek.com', 'wrongpassword');
  await t
    .expect(register.error.password.innerText)
    .eql(layoutPage.formErrors.errorInvalidPassText);
});

test('Log in to the Dashboard', async t => {
  await logIn.login('test_user@test.com', 'password');
  await t.expect(layoutPage.alertSuccess.exists).ok();
});
