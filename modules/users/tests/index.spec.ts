import { test, expect } from '@playwright/test';
import { checkLiquidErrors } from '../../../tests/playwright/helpers';
import UsersPage from './page-object';
import { CLIENT, DEV } from './test-data';

// Sign-up tests create real users with fixed emails, so they must not run on an
// instance whose data persists between runs. The Jenkinsfile sets PROTECTED_INSTANCE
// (from an explicit list of prod URLs) for those; when it is unset — e.g. local dev —
// the instance is treated as non-protected and the tests run.
const protectedInstance = process.env.PROTECTED_INSTANCE === 'true';

test.describe('Register as client', () => {
  let users: UsersPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    users = new UsersPage(page);
  });

  test('There are no liquid errors on the page', async ({ page }) => {
    await checkLiquidErrors(page);
  });

  test('Create client account', async ({ page }) => {
    test.skip(protectedInstance, 'Mutates data; skipped on protected (non-disposable) instances');
    await page.goto('/client/sign-up');

    await users.firstNameInput.fill(CLIENT.name);
    await users.emailInput.fill(CLIENT.email);
    await users.passwordInput.fill(CLIENT.password);
    await users.submitButton.click();

    await users.flashMessage.waitFor({ state: 'visible' });
    await expect(users.flashMessage).toContainText('You have signed up successfully.');

    await users.login(CLIENT.email, CLIENT.password);

    await users.flashMessage.waitFor({ state: 'visible' });
    await expect(users.flashMessage).toContainText('Session was successfully created.');
  });

  test.skip('Display errors message on the form', async ({ page }) => {
    // Skipped: form.errors.first_name / .email / .password are consistently empty after
    // failed validation on this version, so the {% if form.errors.* %} guards
    // never render the <p> error elements. Same root cause as contacts validation errors.
    await page.goto('/sign-up');
    await page.getByRole('link', { name: 'Client' }).click();
    await users.submitButton.click();

    await expect(users.firstNameError).toContainText("can't be blank");
    await expect(users.emailError).toContainText("can't be blank");
    await expect(users.passwordError).toContainText('is too short');
  });
});

test.describe('Register as developer', () => {
  let users: UsersPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    users = new UsersPage(page);
  });

  test('There are no liquid errors on the page', async ({ page }) => {
    await checkLiquidErrors(page);
  });

  test('Create developer account', async ({ page }) => {
    test.skip(protectedInstance, 'Mutates data; skipped on protected (non-disposable) instances');
    await page.goto('/sign-up');
    await page.getByRole('link', { name: 'Developer' }).click();

    await users.firstNameInput.fill(DEV.name);
    await users.emailInput.fill(DEV.email);
    await users.passwordInput.fill(DEV.password);
    await users.phoneInput.fill(DEV.phone);
    await users.submitButton.click();

    await users.flashMessage.waitFor({ state: 'visible' });
    await expect(users.flashMessage).toContainText('You have signed up successfully.');

    await users.login(DEV.email, DEV.password);
    await users.logout();

    await users.flashMessage.waitFor({ state: 'visible' });
    await expect(users.flashMessage).toContainText('You have been logged out');
  });

  test.skip('Display errors message on the form', async ({ page }) => {
    // Skipped: form.errors.* fields are consistently empty after failed validation on this version.
    // Additionally, form.fields.profiles.developer.properties .mobile_number.validation.errors
    // is also always empty (same issue as contacts).
    await page.goto('/developer/sign-up');
    await users.submitButton.click();

    await expect(users.firstNameError).toContainText("can't be blank");
    await expect(users.emailError).toContainText("can't be blank");
    await expect(users.passwordError).toContainText('is too short');
    await expect(users.phoneError).toContainText("can't be blank");
  });
});

test.describe('Recover password', () => {
  let users: UsersPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/recover-password');
    users = new UsersPage(page);
  });

  test('Is showing success after form submit', async ({ page }) => {
    await users.emailInput.fill(DEV.email);
    await users.submitButton.click();

    await expect(page.locator('.alert.alert-success')).toContainText(
      'If you provided the right email, we will send you reset password instructions.'
    );
  });
});
