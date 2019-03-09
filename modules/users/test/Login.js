import { Selector } from 'testcafe';
import LogIn from './page-objects/Login';
import { checkLiquidErrors, getBtAlertText } from '@platform-os/testcafe-helpers';

const logIn = new LogIn();

fixture('Log in').page(process.env.MP_URL);

test('There are no liquid errors on the page', async t => {
  await checkLiquidErrors({ t, Selector });
});

test('Display error message on invalid password', async t => {
  await logIn.login('test-invalid@example.com', 'wrongpassword');
  await t.expect(logIn.error.password.innerText).contains(logIn.formErrors.errorInvalidPassText);
});

test('Log in to the Dashboard', async t => {
  await logIn.login('test_user@test.com', 'password');
  await t.expect(await getBtAlertText({ Selector })).contains(logIn.text.login);
});

test('Log out', async t => {
  await logIn.login('test_user@test.com', 'password');

  await logIn.logout(t);

  await t.expect(await getBtAlertText({ Selector })).contains(logIn.text.logout);
});
