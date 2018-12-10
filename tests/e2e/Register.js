import 'testcafe';
import LayoutPage from './page-objects/Layout';
import HomePage from './page-objects/Homepage';
import Register from './page-objects/Register';
import LogIn from './page-objects/Login';

const homePage = new HomePage();
const layoutPage = new LayoutPage();
const register = new Register();
const logIn = new LogIn();

const userData = {
  NAME: 'test_user',
  USER_EMAIL: `test+${+new Date()}@example.com`,
  PASSWORD: 'password',
  TELEPHONE_NUMBER: '00123456789',
};

const userName = userData.NAME;
const userEmail = userData.USER_EMAIL;
const userPass = userData.PASSWORD;
const userPhone = userData.TELEPHONE_NUMBER;

fixture('Register').page(layoutPage.URL.staging);

test('There are no liquid errors on the page', async () => {
  await layoutPage.checkLiquidErrors();
});

test('Create developer account', async t => {
  await t
    .click(homePage.linkRegister)
    .click(register.developerSignUp)
    .typeText(register.firstname, userName)
    .typeText(register.email, userEmail)
    .typeText(register.password, userPass)
    .typeText(register.mobileNumber, userPhone)
    .click(register.submitButton)
    .expect(layoutPage.alertSuccess.exists)
    .ok();
});

test('Log in as a developer', async t => {
  await t.click(homePage.linkLogIn);
  await logIn.login(userEmail, userPass);
  await t.expect(layoutPage.alertSuccess.exists).ok();
});

test('Display errors message on the form', async t => {
  await t
    .click(homePage.linkRegister)
    .click(register.developerSignUp)
    .click(register.submitButton)
    .expect(register.errorFormFirstName.innerText)
    .eql(layoutPage.formErrors.errorText)
    .expect(register.errorFormEmail.innerText)
    .eql(layoutPage.formErrors.errorText)
    .expect(register.errorFormPassword.innerText)
    .eql(layoutPage.formErrors.errorIsTooShort)
    .expect(register.errorFormMobileNumber.innerText)
    .eql(layoutPage.formErrors.errorText);
});
