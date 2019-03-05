import { Selector } from 'testcafe';
import LogInRecaptcha from '../page-objects/LoginRecaptcha';
import { checkLiquidErrors, getBtAlertText } from '@platform-os/testcafe-helpers';

const logInRecaptcha = new LogInRecaptcha();

fixture('Log In Recaptcha').page(`${process.env.MP_URL}/sign-in-recaptcha`);

test('There are no liquid errors on the page', async t => {
  await checkLiquidErrors({ t, Selector });
});

test('Log in to the Dashboard with Recaptcha', async t => {
  await t.expect(await getBtAlertText({ type: 'info', Selector })).contains(logInRecaptcha.alerts.info);
  for (let i = 0; i < 4; i++) {
    await t.click(logInRecaptcha.button.login);
  }
  await t.switchToIframe(logInRecaptcha.reCaptcha.iframe).click(logInRecaptcha.reCaptcha.checkBoxRecaptcha);
});
