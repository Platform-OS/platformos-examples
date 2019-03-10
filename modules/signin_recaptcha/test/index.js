import { Selector } from 'testcafe';
import LogInRecaptcha from './page-object';
import { checkLiquidErrors, getBtAlertElement } from '@platform-os/testcafe-helpers';

const logInRecaptcha = new LogInRecaptcha();

fixture('Log In Recaptcha').page(`${process.env.MP_URL}/sign-in-recaptcha`);

test('There are no liquid errors on the page', async t => {
  await checkLiquidErrors({ t, Selector });
});

test('reCaptcha is showing up after 3 failed login attempts', async t => {
  const alert = await getBtAlertElement({ type: 'info', Selector });

  for (let i = 0; i < 4; i++) {
    await t.expect(await alert.count).eql(1);
    await logInRecaptcha.login('x@x.com', 'x'); // not faking to speed up test
  }

  await t.expect(await alert.count).eql(0);

  await t.switchToIframe(logInRecaptcha.reCaptcha.iframe).click(logInRecaptcha.reCaptcha.checkBoxRecaptcha);
});
