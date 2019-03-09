import { Selector } from 'testcafe';
import RecoverPassword from './page-objects/RecoverPassword';
import { getBtAlertText } from '@platform-os/testcafe-helpers';

const recoverPassword = new RecoverPassword();

fixture('Recover password').page(`${process.env.MP_URL}/recover-password`);

test('Is showing success after form submit', async t => {
  await t.typeText(recoverPassword.input.email, 'test_user@example.com').click(recoverPassword.button.recover);

  await t.expect(await getBtAlertText({ Selector })).contains(recoverPassword.alerts.recoverPassword);
});
