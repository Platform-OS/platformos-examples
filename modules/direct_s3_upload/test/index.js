// import { Selector } from 'testcafe';
// import path from 'path';
// import UpdateProfile from './page-object';
// import { checkLiquidErrors } from '@platform-os/testcafe-helpers';

// const uploads = path.join(process.cwd(), 'tests', 'e2e', 'uploads');

// const updateProfile = new UpdateProfile();

// fixture('Update profile')
//   .page(process.env.MPKIT_URL)
//   .beforeEach(async t => {
//     await updateProfile.login('test_user@test.com', 'password');
//     await t.navigateTo('/update_profile');
//   });

// test('There are no liquid errors on the page', async t => {
//   await checkLiquidErrors({ t, Selector });
// });

// test.skip('Direct upload using AJAX', async t => {
//   await t.setFilesToUpload(updateProfile.input.ajax, [`${uploads}/hero.png`]);

//   await t.expect(updateProfile.files.ajax.textContent).contains('hero.png');
//   await t.expect(updateProfile.files.ajaxImage.count).eql(1);
// });

// test('AJAX + update profile', async t => {
//   const currentAvatar = await updateProfile.current.avatar;
//   const currentBanner = await updateProfile.current.banner;

//   await t.setFilesToUpload(updateProfile.input.avatar, `${uploads}/hero.png`);
//   await t.setFilesToUpload(updateProfile.input.banner, `${uploads}/bug.png`);
//   await t.typeText(updateProfile.input.bio, 'My custom bio', { replace: true });

//   await t.click(updateProfile.submit.profile);

//   await t.expect(currentAvatar.getAttribute('src')).contains('hero.png');
//   await t.expect(currentBanner.getAttribute('src')).contains('bug.png');
//   await t.expect(updateProfile.input.bio.textContent).eql('My custom bio');
// }).after(async t => {
//   // Bring back default
//   await t.setFilesToUpload(updateProfile.input.avatar, `${uploads}/pos-logo.png`);
//   await t.setFilesToUpload(updateProfile.input.banner, `${uploads}/pos-logo.png`);
//   await t.typeText(updateProfile.input.bio, 'Default bio', { replace: true });

//   await t.click(updateProfile.submit.profile);

//   // Check if defaults have been saved successfully
//   const avatar = await updateProfile.current.avatar;
//   const banner = await updateProfile.current.banner;

//   await t.expect(await avatar.getAttribute('src')).match(/https.*pos-logo.png$/);
//   await t.expect(await banner.getAttribute('src')).match(/https.*pos-logo.png$/);

//   await t.expect(updateProfile.input.bio.textContent).eql('Default bio');
// });
