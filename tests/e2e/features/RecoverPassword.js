import { Selector } from 'testcafe';
import LogIn from '../page-objects/Login';
import Notifications from '../page-objects/Notifications';
import RecoverPassword from '../page-objects/RecoverPassword';
import Contacts from '../page-objects/Contacts';
import HomePage from '../page-objects/Homepage';

const logIn = new LogIn();
const notifications = new Notifications();
const recoverPassword = new RecoverPassword();
const homePage = new HomePage();
const contacts = new Contacts();

fixture('Recover password').page(process.env.MP_URL);

test('Is showing success after form submit', async t => {
  await t
    .click(homePage.link.login)
    .click(logIn.link.recoverPassword)
    .typeText(recoverPassword.input.email, 'test_user@example.com')
    .click(contacts.button.save)
    .expect(notifications.messageType.success.innerText)
    .eql(notifications.text.recoverPassword);
});
