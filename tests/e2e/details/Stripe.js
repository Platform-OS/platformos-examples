import 'testcafe';
import LayoutPage from '../page-objects/Layout';
import LogIn from '../page-objects/Login';
import Stripe from '../page-objects/Stripe';
import HomePage from '../page-objects/Homepage';
import Documentation from '../page-objects/Documentation';

const logIn = new LogIn();
const layoutPage = new LayoutPage();
const stripe = new Stripe();
const homePage = new HomePage();
const documentation = new Documentation();

fixture('Stripe').page(layoutPage.URL.staging);

test.skip('There is a link to the documentation', async t => {
  await logIn.login('test_user@test.com', 'password');
  await t.click(homePage.link.stripe).click(stripe.link.documentation);
  await t
    .expect(documentation.element.titlePage.innerText)
    .eql(documentation.title.stripeTitle);
});