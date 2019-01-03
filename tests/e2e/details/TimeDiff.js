import 'testcafe';
import LayoutPage from '../page-objects/Layout';
import HomePage from '../page-objects/Homepage';
import TimeDiff from '../page-objects/TimeDiff';

const layoutPage = new LayoutPage();
const homePage = new HomePage();
const timeDiff = new TimeDiff();

fixture('Measuring execution time of liquid code fragments').page(
  layoutPage.URL.staging
);

test.skip('There is a link to documentation', async t => {
  await t
    .click(homePage.link.timeDiff)
    .expect(timeDiff.link.documentation.exists)
    .ok();
});