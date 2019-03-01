import 'testcafe';
import LayoutPage from '../page-objects/Layout';
// import Feedback from '../page-objects/Feedback';
import HomePage from '../page-objects/Homepage';
import Documentation from '../page-objects/Documentation';

const layoutPage = new LayoutPage();
// const feedback = new Feedback();
const homePage = new HomePage();
const documentation = new Documentation();

fixture('Feedback').page(layoutPage.URL.staging);

test.skip('There is a link to the documentation', async t => {
  await t.click(homePage.link.ajax).click(feedback.link.documentation);
  await t.expect(documentation.element.titlePage.innerText).eql(documentation.title.feedbackTitle);
});
