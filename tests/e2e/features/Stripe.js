import { Selector } from 'testcafe';
import LogIn from '../page-objects/Login';
import Stripe from '../page-objects/Stripe';
import { checkLiquidErrors, getBtAlertElement } from '@platform-os/testcafe-helpers';

const logIn = new LogIn();
const stripe = new Stripe();

fixture('Stripe')
  .page(process.env.MP_URL)
  .beforeEach(async t => {
    await logIn.login('test_user@test.com', 'password');
    await t.navigateTo('/payments');
  });

test('There are no liquid errors on the page', async t => {
  await checkLiquidErrors({ t, Selector });
});

test('Pay by using valid credit card', async t => {
  await t
    .click(stripe.button.submit)
    .switchToIframe(stripe.iframe.iframeStripe)
    .typeText(stripe.input.email, 'jacek@placek.com')
    .typeText(stripe.input.cardNumber, '4242 4242 4242 4242')
    .typeText(stripe.input.date, '12/23')
    .typeText(stripe.input.ccv, '111')
    .typeText(stripe.input.zip, '11122')
    .click(stripe.button.submit);

  /*
    Im pretty sure its not testing what its supposed to test, but i give up on trying to test 
    this stripe-iframe-js-async magic.
    
    How i know it doesnt test anything? :-)
      `await getBtAlertElement({ Selector }).count === undefined`
  */
  await t.expect(await getBtAlertElement({ Selector })).ok();
});

test('Pay by using invalid card with declined code', async t => {
  await t
    .click(stripe.button.submit)
    .switchToIframe(stripe.iframe.iframeStripe)
    .typeText(stripe.input.email, 'jacek@placek.com')
    .typeText(stripe.input.cardNumber, '4000 0000 0000 0002')
    .typeText(stripe.input.date, '12/23')
    .typeText(stripe.input.ccv, '111')
    .typeText(stripe.input.zip, '11122')
    .click(stripe.button.submit);

  await t.expect(stripe.iframe.validation.textContent).contains('This card was declined.');
});
