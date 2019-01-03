import 'testcafe';
import LayoutPage from '../page-objects/Layout';
import LogIn from '../page-objects/Login';
import Notifications from '../page-objects/Notifications';
import UpdateProfile from '../page-objects/UpdateProfile';
import HomePage from '../page-objects/Homepage';

const logIn = new LogIn();
const layoutPage = new LayoutPage();
const notifications = new Notifications();
const updateProfile = new UpdateProfile();
const homePage = new HomePage();

fixture('Update profile').page(layoutPage.URL.staging);

test('There are no liquid errors on the page', async t => {
  await logIn.login('test_user@test.com', 'password');
  await t
    .expect(notifications.messageType.success.innerText)
    .eql(notifications.text.login);
  await t.click(homePage.link.uploadFiles);
  await layoutPage.checkLiquidErrors();
});

test('Direct upload using AJAX', async t => {
  await logIn.login('test_user@test.com', 'password');
  await t
    .expect(notifications.messageType.success.innerText)
    .eql(notifications.text.login);
  await t
    .click(homePage.link.uploadFiles)
    .setFilesToUpload(updateProfile.input.ajaxUpload, ['../uploads/hero.png']);
  await t
    .expect(updateProfile.files.name.innerText)
    .eql('hero.png')
    .expect(updateProfile.files.imgAWS.count)
    .eql(1);
});

test('Uploading Files Directly to Amazon S3 and using uploaded file as an avatar', async t => {
  await logIn.login('test_user@test.com', 'password');
  await t
    .expect(notifications.messageType.success.innerText)
    .eql(notifications.text.login)
    .click(homePage.link.uploadFiles);
  await t
    .expect(
      updateProfile.files.currentImgName.withText(
        updateProfile.txt.currentAvatar
      ).exists
    )
    .ok()
    .expect(
      updateProfile.files.currentImgName.withText(
        updateProfile.txt.currentBanner
      ).exists
    )
    .ok();
  await t.setFilesToUpload(updateProfile.input.avatarUpload, [
    '../uploads/bug.png',
  ]);
  await t.setFilesToUpload(updateProfile.input.banerUpload, [
    '../uploads/bug.png',
  ]);
  await t
    .expect(updateProfile.files.currentImgName.withText(updateProfile.txt.newAvatar).exists).ok()
    .expect(updateProfile.files.currentImgName.withText(updateProfile.txt.newBanner).exists).ok();
  await t
    .expect(updateProfile.files.img.count).eql(2)
    .expect(updateProfile.files.imgAWS.count).eql(2);
});