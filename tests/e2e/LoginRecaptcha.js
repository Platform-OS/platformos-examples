import 'testcafe';
import Register from './page-objects/Register';
import LogInRecaptcha from './page-objects/LoginRecaptcha';
import LayoutPage from './page-objects/Layout';

const logInRecaptcha = new LogInRecaptcha();
const register = new Register();
const layoutPage = new LayoutPage();

fixture('Log In Recaptcha').page(logInRecaptcha.URL.staging);

test('There are no liquid errors on the page', async () => {
  await layoutPage.checkLiquidErrors();
});

test('Documentation link', async t => {
  await t.expect(logInRecaptcha.link.documentation.exists).ok();
});

test('Log in to the Dashboard with Recaptcha', async t => {
  for (let i = 0; i < 4; i++) {
    await t.click(register.button.submit);
  }
  await t
    .switchToIframe(logInRecaptcha.reCaptcha.iframe)
    .click(logInRecaptcha.reCaptcha.checkBoxRecaptcha);
});
