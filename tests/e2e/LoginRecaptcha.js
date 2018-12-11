import 'testcafe';
import Register from './page-objects/Register';
import LogInRecaptcha from './page-objects/LoginRecaptcha';

const logInRecaptcha = new LogInRecaptcha();
const register = new Register();

fixture('Log In Recaptcha').page(logInRecaptcha.URL.staging);

test('Log in to the Dashboard with Recaptcha', async t => {
  for (let i = 0; i < 4; i++) {
    await t.click(register.button.submit);
  }
  await t
    .switchToIframe(logInRecaptcha.reCaptcha.iframe)
    .click(logInRecaptcha.reCaptcha.checkBoxRecaptcha);
});
