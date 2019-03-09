import { Selector } from 'testcafe';
import path from 'path';
import UpdateProfile from './page-object';
import { checkLiquidErrors } from '@platform-os/testcafe-helpers';

const uploads = path.join(process.cwd(), 'tests', 'e2e', 'uploads');

const updateProfile = new UpdateProfile();

fixture('Update profile')
  .page(process.env.MP_URL)
  .beforeEach(async t => {
    await updateProfile.login('test_user@test.com', 'password');
    await t.navigateTo('/update_profile');
  });

test('There are no liquid errors on the page', async t => {
  await checkLiquidErrors({ t, Selector });
});

// Testcafe cant understand AWS response, so its failing.
// Dont know how to work around that, yet.
// test.skip('Normal form upload works', async t => {
//   await t.setFilesToUpload(updateProfile.input.html, [`${uploads}/hero.png`]).click(await updateProfile.submit.html);

//   const currentUrl = updateProfile.getPageUrl();

//   await t.expect(currentUrl).contains('amazonaws.com');

//   const body = Selector('body');
//   const bodyText = await body.textContent;

//   await t.expect(bodyText).contains('platform-os.com');
//   await t.expect(bodyText).contains('ETag');
// });

test('Direct upload using AJAX', async t => {
  await t.setFilesToUpload(updateProfile.input.ajax, [`${uploads}/hero.png`]);

  await t.expect(updateProfile.files.ajax.textContent).contains('hero.png');
  await t.expect(updateProfile.files.ajaxImage.count).eql(1);
});

test('AJAX + update profile', async t => {
  const currentAvatar = await updateProfile.current.avatar;
  const newAvatar = await updateProfile.new.avatar;
  const currentBanner = await updateProfile.current.banner;
  const newBanner = await updateProfile.new.banner;

  await t.setFilesToUpload(updateProfile.input.avatar, [`${uploads}/hero.png`]);
  await t.expect(newAvatar.textContent).contains('hero.png');

  await t.setFilesToUpload(updateProfile.input.banner, [`${uploads}/bug.png`]);
  await t.expect(newBanner.textContent).contains('bug.png');

  await t.typeText(updateProfile.input.bio, 'My custom bio', { replace: true });

  await t.click(updateProfile.submit.profile);

  await t.expect(currentAvatar.getAttribute('src')).contains('hero.png');
  await t.expect(currentBanner.getAttribute('src')).contains('bug.png');
  await t.expect(updateProfile.input.bio.textContent).eql('My custom bio');
}).after(async t => {
  // Bring back default
  const avatar = await updateProfile.current.avatar;
  const banner = await updateProfile.current.banner;

  await t.setFilesToUpload(updateProfile.input.avatar, [`${uploads}/pos-logo.png`]);
  await t.setFilesToUpload(updateProfile.input.banner, [`${uploads}/pos-logo.png`]);
  await t.typeText(updateProfile.input.bio, 'Default bio', { replace: true });

  await t.click(updateProfile.submit.profile);

  await t.expect(await avatar.getAttribute('src')).contains('pos-logo.png');
  await t.expect(await avatar.getAttribute('src')).contains('platform-os.com');

  await t.expect(await banner.getAttribute('src')).contains('pos-logo.png');
  await t.expect(await banner.getAttribute('src')).contains('platform-os.com');

  await t.expect(updateProfile.input.bio.textContent).eql('Default bio');
});
