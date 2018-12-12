import 'testcafe';
import LayoutPage from './page-objects/Layout';
import LogIn from './page-objects/Login';
import Notifications from './page-objects/Notifications';
import UpdateProfile from './page-objects/UpdateProfile';
import HomePage from './page-objects/Homepage';

const logIn = new LogIn();
const layoutPage = new LayoutPage();
const notifications = new Notifications();
const updateProfile = new UpdateProfile();
const homePage = new HomePage();

fixture('Update profile').page(layoutPage.URL.staging);

test('Direct upload using AJAX', async t => {
  await logIn.login('test_user@test.com', 'password');
  await t
    .expect(notifications.messageType.success.innerText)
    .eql(notifications.text.login);
  await t
    .click(homePage.link.uploadFiles)
    .setFilesToUpload(updateProfile.input.ajaxUpload, ['./uploads/hero.png']);
  await t
    .expect(updateProfile.files.img.exists)
    .ok()
    .expect(updateProfile.files.name.innerText)
    .eql('hero.png');
});
