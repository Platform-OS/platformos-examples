import { Selector } from 'testcafe';

import LogIn from '../page-objects/Login';
import UpdateProfile from '../page-objects/UpdateProfile';
import { checkLiquidErrors } from '@platform-os/testcafe-helpers';

const logIn = new LogIn();
const updateProfile = new UpdateProfile();

fixture('Update profile')
  .page(process.env.MP_URL)
  .beforeEach(async t => {
    await logIn.login('test_user@test.com', 'password');
    await t.navigateTo('/update_profile');
  });

test('There are no liquid errors on the page', async t => {
  await checkLiquidErrors({ t, Selector });
});

test('Direct upload using AJAX', async t => {
  await t.setFilesToUpload(updateProfile.input.ajaxUpload, ['../uploads/hero.png']);
  await t.expect(updateProfile.files.name.innerText).eql('hero.png');
  await t.expect(updateProfile.files.imgAWS.count).eql(1);
});

test('Uploading Files Directly to Amazon S3 and using uploaded file as an avatar', async t => {
  await t.expect(updateProfile.files.currentImgName.withText(updateProfile.txt.currentAvatar).exists).ok();
  await t.expect(updateProfile.files.currentImgName.withText(updateProfile.txt.currentBanner).exists).ok();

  await t.setFilesToUpload(updateProfile.input.avatarUpload, ['../uploads/bug.png']);
  await t.setFilesToUpload(updateProfile.input.banerUpload, ['../uploads/bug.png']);

  await t.expect(updateProfile.files.currentImgName.withText(updateProfile.txt.newAvatar).exists).ok();
  await t.expect(updateProfile.files.currentImgName.withText(updateProfile.txt.newBanner).exists).ok();

  await t.expect(updateProfile.files.img.count).eql(2);
  await t.expect(updateProfile.files.imgAWS.count).eql(2);
});
