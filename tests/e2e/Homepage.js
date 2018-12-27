import 'testcafe';
import LayoutPage from './page-objects/Layout';
import HomePage from './page-objects/Homepage';

const homePage = new HomePage();
const layoutPage = new LayoutPage();

fixture('Homepage').page(layoutPage.URL.staging);

test('There are no liquid errors on the page', async () => {
  await layoutPage.checkLiquidErrors();
});

test('There are links to sign up and log in', async t => {
  await t
    .expect(homePage.link.register)
    .ok()
    .expect(homePage.link.login)
    .ok();
});

test('There are links to all examples', async t => {
  await t
    .expect(homePage.link.contacts.exists)
    .ok()
    .expect(homePage.link.reCaptcha.exists)
    .ok();
});

test('Redirection to Example Google AMP websites', async t => {
  await t.click(homePage.link.googleAMP);
  layoutPage.checkURL('https://www.ampproject.org/learn/overview/');
  await t.navigateTo(layoutPage.URL.staging).click(homePage.link.eCommerce);
  layoutPage.checkURL(
    'https://amp-demo-ecommerce.prod01.oregon.platform-os.com/'
  );
  await t.navigateTo(layoutPage.URL.staging).click(homePage.link.travel);
  layoutPage.checkURL('https://amp-demo-travel.prod01.oregon.platform-os.com/');
  await t.navigateTo(layoutPage.URL.staging).click(homePage.link.productPage);
  layoutPage.checkURL('https://amp-demo-lune.prod01.oregon.platform-os.com/');
  await t.navigateTo(layoutPage.URL.staging).click(homePage.link.gallery);
  layoutPage.checkURL(
    'https://amp-demo-gallery.prod01.oregon.platform-os.com/gallery'
  );
  await t.navigateTo(layoutPage.URL.staging).click(homePage.link.blog);
  layoutPage.checkURL('https://amp-demo-blog.prod01.oregon.platform-os.com/');
  await t.navigateTo(layoutPage.URL.staging).click(homePage.link.googleAMPcode);
  layoutPage.checkURL('https://github.com/mdyd-dev/amp-demo-pages');
});

test('Footer links', async t => {
  await t.click(homePage.link.documentationWebsite);
  layoutPage.checkURL('https://documentation.platform-os.com/');
  await t.navigateTo(layoutPage.URL.staging).click(homePage.link.exampleCode);
  layoutPage.checkURL('https://github.com/mdyd-dev/marketplace-nearme-example');
});
