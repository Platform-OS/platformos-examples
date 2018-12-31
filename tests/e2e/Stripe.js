import 'testcafe';
import LayoutPage from './page-objects/Layout';
import LogIn from './page-objects/Login';
import Notifications from './page-objects/Notifications';
import Stripe from './page-objects/Stripe';
import HomePage from './page-objects/Homepage';
import Documentation from './page-objects/Documentation';

const logIn = new LogIn ();
const layoutPage = new LayoutPage ();
const notifications = new Notifications ();
const stripe = new Stripe ();
const homePage = new HomePage ();
const documentation = new Documentation ();

fixture ('Stripe').page (layoutPage.URL.staging);

test ('There are no liquid errors on the page', async t => {
  await logIn.login ('test_user@test.com', 'password');
  await t
    .expect (notifications.messageType.success.innerText)
    .eql (notifications.text.login);
  await t.click (homePage.link.stripe);
  await layoutPage.checkLiquidErrors ();
});

test ('There is a link to the documentation', async t => {
  await logIn.login ('test_user@test.com', 'password');
  await t.click (homePage.link.stripe).click (stripe.link.documentation);
  await t
    .expect (documentation.element.titlePage.innerText)
    .eql (documentation.title.stripeTitle);
});

test ('Pay by using valid credit card', async t => {
  await logIn.login ('test_user@test.com', 'password');
  await t
    .expect (notifications.messageType.success.innerText)
    .eql (notifications.text.login);
  await t
    .click (homePage.link.stripe)
    .click (stripe.button.submit)
    .switchToIframe (stripe.iframe.iframeStripe)
    .typeText (stripe.input.email, 'jacek@placek.com')
    .typeText (stripe.input.cardNumber, '4242 4242 4242 4242')
    .typeText (stripe.input.date, '12/23')
    .typeText (stripe.input.ccv, '111')
    .typeText (stripe.input.zip, '11122')
    .click (stripe.button.submit);
  await t.expect (notifications.messageType.success).ok ();
});

test ('Pay by using invalid card with declined code', async t => {
  await logIn.login ('test_user@test.com', 'password');
  await t
    .expect (notifications.messageType.success.innerText)
    .eql (notifications.text.login);
  await t
    .click (homePage.link.stripe)
    .click (stripe.button.submit)
    .switchToIframe (stripe.iframe.iframeStripe)
    .typeText (stripe.input.email, 'jacek@placek.com')
    .typeText (stripe.input.cardNumber, '4000 0000 0000 0002')
    .typeText (stripe.input.date, '12/23')
    .typeText (stripe.input.ccv, '111')
    .typeText (stripe.input.zip, '11122')
    .click (stripe.button.submit);
  await t
    .expect (stripe.iframe.validation.innerText)
    .eql ('This card was declined.');
});
