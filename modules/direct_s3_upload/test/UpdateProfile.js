import { Selector } from 'testcafe';
import path from 'path';
import LogIn from '../../../tests/e2e/page-objects/Login';
import UpdateProfile from './page-object';
import { checkLiquidErrors } from '@platform-os/testcafe-helpers';

const uploads = path.join(process.cwd(), 'tests', 'e2e', 'uploads');

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

// Testcafe cant understand AWS response, so its failing.
// Dont know how to work around that, yet.
test.skip('Normal form upload works', async t => {
  await t.setFilesToUpload(updateProfile.input.html, [`${uploads}/hero.png`]).click(await updateProfile.submit.html);

  const currentUrl = updateProfile.getPageUrl();

  await t.expect(currentUrl).contains('amazonaws.com');

  const body = Selector('body');
  const bodyText = await body.textContent;

  await t.expect(bodyText).contains('platform-os.com');
  await t.expect(bodyText).contains('ETag');
});

test('Direct upload using AJAX', async t => {
  await t.setFilesToUpload(updateProfile.input.ajax, [`${uploads}/hero.png`]);

  await t.expect(updateProfile.files.ajax.textContent).contains('hero.png');
  await t.expect(updateProfile.files.ajaxImage.count).eql(1);
});

test('AJAX + update profile - avatar', async t => {
  const current = await updateProfile.current.avatar;
  const newImage = await updateProfile.new.avatar;

  await t.expect(await current.getAttribute('src')).contains('pos-logo.png');
  await t.expect(await current.getAttribute('src')).contains('platform-os.com');

  await t.setFilesToUpload(updateProfile.input.avatar, [`${uploads}/hero.png`]);
  await t.expect(newImage.textContent).contains('hero.png');

  await t.click(updateProfile.submit.profile);
  await t.expect(current.getAttribute('src')).contains('hero.png');
}).after(async t => {
  // Bring back default
  await t.setFilesToUpload(updateProfile.input.avatar, [`${uploads}/pos-logo.png`]);
  await t.click(updateProfile.submit.profile);
});

test('AJAX + update profile - banner', async t => {
  const current = await updateProfile.current.banner;
  const newImage = await updateProfile.new.banner;

  await t.setFilesToUpload(updateProfile.input.banner, [`${uploads}/bug.png`]);
  await t.expect(newImage.textContent).contains('bug.png');

  await t.click(updateProfile.submit.profile);
  await t.expect(await current.getAttribute('src')).contains('bug.png');
}).after(async t => {
  const current = await updateProfile.current.banner;

  // Bring back default
  await t.setFilesToUpload(updateProfile.input.banner, [`${uploads}/pos-logo.png`]);
  await t.click(updateProfile.submit.profile);

  await t.expect(await current.getAttribute('src')).contains('pos-logo.png');
  await t.expect(await current.getAttribute('src')).contains('platform-os.com');
});

test('AJAX + update profile - updating profile bio', async t => {
  await t.typeText(updateProfile.input.bio, 'My custom bio', { replace: true });
  await t.click(updateProfile.submit.profile);

  await t.expect(updateProfile.input.bio.textContent).eql('My custom bio');
}).after(async t => {
  // Bring back default
  await t.typeText(updateProfile.input.bio, 'Default bio', { replace: true });
  await t.click(updateProfile.submit.profile);

  await t.expect(updateProfile.input.bio.textContent).eql('Default bio');
});
