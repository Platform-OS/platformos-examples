import { Selector } from 'testcafe';
import LayoutPage from '../page-objects/Layout';
import LogIn from '../page-objects/Login';
import Register from '../page-objects/Register';
import Notifications from '../page-objects/Notifications';
import HomePage from '../page-objects/Homepage';

const logIn = new LogIn();
const register = new Register();
const layoutPage = new LayoutPage();
const notifications = new Notifications();
const homePage = new HomePage();

fixture('Log in').page(process.env.MP_URL);

test('Display error message on invalid password', async t => {
  await logIn.login('test@placek.com', 'wrongpassword');
  await t.expect(register.error.password.innerText).eql(layoutPage.formErrors.errorInvalidPassText);
});

test('Log in to the Dashboard', async t => {
  await logIn.login('test_user@test.com', 'password');
  await t.expect(notifications.messageType.success.innerText).eql(notifications.text.login);
});

test('Log out', async t => {
  await logIn.login('test_user@test.com', 'password');
  await t.expect(notifications.messageType.success.innerText).eql(notifications.text.login);
  await t
    .click(homePage.button.logout)
    .expect(notifications.messageType.success.innerText)
    .eql(notifications.text.logout);
});
