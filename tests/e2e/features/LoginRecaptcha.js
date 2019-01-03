import 'testcafe';
import Register from '../page-objects/Register';
import LogInRecaptcha from '../page-objects/LoginRecaptcha';
import LayoutPage from '../page-objects/Layout';
import Notifications from '../page-objects/Notifications';

const logInRecaptcha = new LogInRecaptcha();
const register = new Register();
const layoutPage = new LayoutPage();
const notifications = new Notifications();

fixture('Log In Recaptcha').page(logInRecaptcha.URL.staging);

test('There are no liquid errors on the page', async () => {
  await layoutPage.checkLiquidErrors();
});

test('Log in to the Dashboard with Recaptcha', async t => {
  await t
    .expect(notifications.messageType.info.innerText)
    .eql(notifications.text.infoReCaptcha);
  for (let i = 0; i < 4; i++) {
    await t.click(register.button.submit);
  }
  await t
    .switchToIframe(logInRecaptcha.reCaptcha.iframe)
    .click(logInRecaptcha.reCaptcha.checkBoxRecaptcha);
});