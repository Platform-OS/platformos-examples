import { Selector } from 'testcafe';
import faker from 'faker';
import Users from './page-object';
import { checkLiquidErrors, getBtAlertText } from '@platform-os/testcafe-helpers';

const users = new Users();

const { client, dev } = {
  client: {
    email: faker.internet.exampleEmail(),
    name: faker.name.firstName(),
    password: faker.internet.password()
  },
  dev: {
    email: faker.internet.exampleEmail(),
    name: faker.name.firstName(),
    password: faker.internet.password(),
    phone: faker.phone.phoneNumber()
  }
};

fixture('Register as client').page(process.env.MP_URL);

test('There are no liquid errors on the page', async t => {
  await checkLiquidErrors({ t, Selector });
});

test('Create client account', async t => {
  await t.navigateTo('/client/sign-up');

  await t
    .typeText(users.input.firstname, client.name)
    .typeText(users.input.email, client.email)
    .typeText(users.input.password, client.password)
    .click(users.button.submit);

  await t.expect(await getBtAlertText({ Selector })).contains(users.alerts.success);
}).after(async t => {
  // Check if login works. In After hook to not throw off tests when running concurrently

  await users.login(client.email, client.password);
  await t.expect(await getBtAlertText({ Selector })).contains(users.text.login);
});

test('Display errors message on the form', async t => {
  await t.navigateTo('/sign-up');

  await t.click(users.link.clientRegister).click(users.button.submit);

  await t
    .expect(users.error.firstname.innerText)
    .eql(users.formErrors.errorText)
    .expect(users.error.email.innerText)
    .eql(users.formErrors.errorText)
    .expect(users.error.password.innerText)
    .eql(users.formErrors.errorIsTooShort);
});

fixture('Register as developer').page(process.env.MP_URL);

test('There are no liquid errors on the page', async t => {
  await checkLiquidErrors({ t, Selector });
});

test('Create developer account', async t => {
  await t.navigateTo('/sign-up');

  await t
    .click(users.link.devRegister)
    .typeText(users.input.firstname, dev.name)
    .typeText(users.input.email, dev.email)
    .typeText(users.input.password, dev.password)
    .typeText(users.input.phone, dev.phone)
    .click(users.button.submit);

  await t.expect(await getBtAlertText({ Selector })).contains(users.alerts.success);
}).after(async t => {
  // Check if login works. In After hook to not throw off tests when running concurrently
  await users.login(dev.email, dev.password);

  await users.logout(t);

  await t.expect(await getBtAlertText({ Selector })).contains(users.text.logout);
});

test('Display errors message on the form', async t => {
  await t.navigateTo('/developer/sign-up');

  await t.click(users.button.submit);

  await t
    .expect(users.error.firstname.innerText)
    .eql(users.formErrors.errorText)
    .expect(users.error.email.innerText)
    .eql(users.formErrors.errorText)
    .expect(users.error.password.innerText)
    .eql(users.formErrors.errorIsTooShort)
    .expect(users.error.phone.innerText)
    .eql(users.formErrors.errorText);
});

fixture('Recover password').page(`${process.env.MP_URL}/recover-password`);

test('Is showing success after form submit', async t => {
  await t.typeText(users.input.email, dev.email).click(users.button.submit);

  await t.expect(await getBtAlertText({ Selector })).contains(users.alerts.recoverPassword);
});
