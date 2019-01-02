import 'testcafe';
import Register from './page-objects/Register';
import LogInRecaptcha from './page-objects/LoginRecaptcha';
import LayoutPage from './page-objects/Layout';
import Notifications from './page-objects/Notifications';
import Documentation from './page-objects/Documentation';

const logInRecaptcha = new LogInRecaptcha();
const register = new Register();
const layoutPage = new LayoutPage();
const notifications = new Notifications();
const documentation = new Documentation();

fixture('Log In Recaptcha').page(logInRecaptcha.URL.staging);

test('There are no liquid errors on the page', async () => {
  await layoutPage.checkLiquidErrors();
});

test('There is a link to the documentation', async t => {
  await t
    .click(logInRecaptcha.link.documentation)
    .expect(documentation.element.titlePage.innerText)
    .eql(documentation.title.reCaptchaTitle);
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