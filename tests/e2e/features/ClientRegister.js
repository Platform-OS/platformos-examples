import { Selector } from 'testcafe';
import LayoutPage from '../page-objects/Layout';
import HomePage from '../page-objects/Homepage';
import Register from '../page-objects/Register';
import LogIn from '../page-objects/Login';
import Notifications from '../page-objects/Notifications';
import { checkLiquidErrors } from '@platform-os/testcafe-helpers';

const homePage = new HomePage();
const layoutPage = new LayoutPage();
const register = new Register();
const logIn = new LogIn();
const notifications = new Notifications();

const userData = {
  NAME: 'test_client_user',
  USER_EMAIL: `test+${+new Date()}@example.com`,
  PASSWORD: 'password',
  TELEPHONE_NUMBER: '00123456789'
};

const userName = userData.NAME;
const userEmail = userData.USER_EMAIL;
const userPass = userData.PASSWORD;

fixture('Register as client').page(process.env.MP_URL);

test('There are no liquid errors on the page', async t => {
  await checkLiquidErrors({ t, Selector });
});

test('Create client account', async t => {
  await t
    .click(homePage.link.register)
    .click(register.link.clienRegister)
    .typeText(register.input.firstname, userName)
    .typeText(register.input.email, userEmail)
    .typeText(register.input.password, userPass)
    .click(register.button.submit);
  await t.expect(notifications.messageType.success.innerText).eql(notifications.text.register);
});

test('Log in as a client', async t => {
  await t.click(homePage.link.login);
  await logIn.login(userEmail, userPass);
  await t.expect(notifications.messageType.success.innerText).eql(notifications.text.login);
});

test('Display errors message on the form', async t => {
  await t
    .click(homePage.link.register)
    .click(register.link.clienRegister)
    .click(register.button.submit);
  await t
    .expect(register.error.firstname.innerText)
    .eql(layoutPage.formErrors.errorText)
    .expect(register.error.email.innerText)
    .eql(layoutPage.formErrors.errorText)
    .expect(register.error.password.innerText)
    .eql(layoutPage.formErrors.errorIsTooShort);
});
