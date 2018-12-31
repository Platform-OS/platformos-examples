import 'testcafe';
import LayoutPage from './page-objects/Layout';
import HomePage from './page-objects/Homepage';

const homePage = new HomePage ();
const layoutPage = new LayoutPage ();
const actualURL = homePage.getPageUrl ();

fixture ('Homepage').page (layoutPage.URL.staging);

test ('There are no liquid errors on the page', async () => {
  await layoutPage.checkLiquidErrors ();
});

test ('There are links to sign up and log in', async t => {
  await t
    .expect (homePage.link.register)
    .ok ()
    .expect (homePage.link.login)
    .ok ();
});

test ('There are links to all examples', async t => {
  await t
    .expect (homePage.link.contacts.exists)
    .ok ()
    .expect (homePage.link.reCaptcha.exists)
    .ok ();
});

test ('Redirection to Example Google AMP websites', async t => {
  await t
    .click (homePage.link.googleAMP)
    .expect (actualURL ())
    .contains (homePage.URL.ampProject);

  await t
    .navigateTo (layoutPage.URL.staging)
    .click (homePage.link.eCommerce)
    .expect (actualURL ())
    .contains (homePage.URL.ecommerce);

  await t
    .navigateTo (layoutPage.URL.staging)
    .click (homePage.link.travel)
    .expect (actualURL ())
    .contains (homePage.URL.travel);

  await t
    .navigateTo (layoutPage.URL.staging)
    .click (homePage.link.productPage)
    .expect (actualURL ())
    .contains (homePage.URL.lune);

  await t
    .navigateTo (layoutPage.URL.staging)
    .click (homePage.link.gallery)
    .expect (actualURL ())
    .contains (homePage.URL.gallery);

  await t
    .navigateTo (layoutPage.URL.staging)
    .click (homePage.link.blog)
    .expect (actualURL ())
    .contains (homePage.URL.blog);

  await t
    .navigateTo (layoutPage.URL.staging)
    .click (homePage.link.googleAMPcode)
    .expect (actualURL ())
    .contains (homePage.URL.ampDemoGH);
});

test ('Footer links', async t => {
  await t
    .click (homePage.link.documentationWebsite)
    .expect (actualURL ())
    .contains (homePage.URL.documentation);

  await t
    .navigateTo (layoutPage.URL.staging)
    .click (homePage.link.exampleCode)
    .expect (actualURL ())
    .contains (homePage.URL.nmExamples);
});
