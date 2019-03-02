import { Selector } from 'testcafe';
import LogIn from '../page-objects/Login';
import Notifications from '../page-objects/Notifications';
import Stripe from '../page-objects/Stripe';
import HomePage from '../page-objects/Homepage';
import { checkLiquidErrors } from '@platform-os/testcafe-helpers';

const logIn = new LogIn();
const notifications = new Notifications();
const stripe = new Stripe();
const homePage = new HomePage();

fixture('Stripe').page(process.env.MP_URL);

test('There are no liquid errors on the page', async t => {
  await logIn.login('test_user@test.com', 'password');
  await t.expect(notifications.messageType.success.innerText).eql(notifications.text.login);
  await t.click(homePage.link.stripe);
  await checkLiquidErrors({ t, Selector });
});

test('Pay by using valid credit card', async t => {
  await logIn.login('test_user@test.com', 'password');
  await t.expect(notifications.messageType.success.innerText).eql(notifications.text.login);
  await t
    .click(homePage.link.stripe)
    .click(stripe.button.submit)
    .switchToIframe(stripe.iframe.iframeStripe)
    .typeText(stripe.input.email, 'jacek@placek.com')
    .typeText(stripe.input.cardNumber, '4242 4242 4242 4242')
    .typeText(stripe.input.date, '12/23')
    .typeText(stripe.input.ccv, '111')
    .typeText(stripe.input.zip, '11122')
    .click(stripe.button.submit);
  await t.expect(notifications.messageType.success).ok();
});

test('Pay by using invalid card with declined code', async t => {
  await logIn.login('test_user@test.com', 'password');
  await t.expect(notifications.messageType.success.innerText).eql(notifications.text.login);
  await t
    .click(homePage.link.stripe)
    .click(stripe.button.submit)
    .switchToIframe(stripe.iframe.iframeStripe)
    .typeText(stripe.input.email, 'jacek@placek.com')
    .typeText(stripe.input.cardNumber, '4000 0000 0000 0002')
    .typeText(stripe.input.date, '12/23')
    .typeText(stripe.input.ccv, '111')
    .typeText(stripe.input.zip, '11122')
    .click(stripe.button.submit);
  await t.expect(stripe.iframe.validation.innerText).eql('This card was declined.');
});
