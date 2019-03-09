import { Selector } from 'testcafe';
import Register from './page-objects/Register';
import LogIn from './page-objects/Login';
import { checkLiquidErrors, getBtAlertText } from '@platform-os/testcafe-helpers';

const register = new Register();
const logIn = new LogIn();

const userData = {
  name: `test_dev_user+${+new Date()}`,
  user_email: `test+${+new Date()}@example.com`,
  password: 'password',
  phone: '00123456789'
};

const { name, user_email, password, phone } = userData;

fixture('Register as developer').page(process.env.MP_URL);

test('There are no liquid errors on the page', async t => {
  await checkLiquidErrors({ t, Selector });
});

test('Create developer account', async t => {
  await t.navigateTo('/sign-up');

  await t
    .click(register.link.devRegister)
    .typeText(register.input.firstname, name)
    .typeText(register.input.email, user_email)
    .typeText(register.input.password, password)
    .typeText(register.input.phone, phone)
    .click(register.button.submit);

  await t.expect(await getBtAlertText({ Selector })).contains(register.alerts.success);
}).after(async t => {
  // Check if login works. In After hook to not throw off tests when running concurrently
  await logIn.login(user_email, password);
  await t.expect(await register.button.logout.exists).ok();
});

test('Display errors message on the form', async t => {
  await t.navigateTo('/developer/sign-up');

  await t.click(register.button.submit);

  await t
    .expect(register.error.firstname.innerText)
    .eql(register.formErrors.errorText)
    .expect(register.error.email.innerText)
    .eql(register.formErrors.errorText)
    .expect(register.error.password.innerText)
    .eql(register.formErrors.errorIsTooShort)
    .expect(register.error.phone.innerText)
    .eql(register.formErrors.errorText);
});
