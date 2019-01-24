import 'testcafe';
import LayoutPage from '../page-objects/Layout';
import UpdateProfile from '../page-objects/UpdateProfile';
import HomePage from '../page-objects/Homepage';
import Documentation from '../page-objects/Documentation';

const layoutPage = new LayoutPage();
const updateProfile = new UpdateProfile();
const homePage = new HomePage();
const documentation = new Documentation();

fixture('Update profile').page(layoutPage.URL.staging);

test.skip('There is a link to the documentation', async t => {
  await t.click(homePage.link.uploadFiles).click(updateProfile.link.documentation);
  await t.expect(documentation.element.titlePage.innerText).eql(documentation.title.ajaxUploadTitle);
});
