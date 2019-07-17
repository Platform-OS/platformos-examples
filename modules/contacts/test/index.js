import { Selector } from 'testcafe';
import faker from 'faker';
import Contacts from './page-object';
import { checkLiquidErrors, getBtAlertText } from '@platform-os/testcafe-helpers';

const contacts = new Contacts();

const { name, email, description } = {
  email: faker.internet.exampleEmail(),
  name: faker.name.firstName(),
  description: faker.lorem.sentence()
};

fixture('Contacts').page(`${process.env.MP_URL}/contacts`);

test('There are no liquid errors on the page', async t => {
  await checkLiquidErrors({ t, Selector });
});

test('models_delete_all cleans contacts correctly', async t => {
  await t.expect(contacts.table.tableRows.count).gte(0);

  // clean database
  await t.navigateTo('/contacts/clean').wait(500);
  await t.expect(contacts.table.tableRows.count).eql(0);
});

test('Adding new record works', async t => {
  await t
    .typeText(contacts.input.name, name)
    .typeText(contacts.input.email, email)
    .typeText(contacts.input.description, description)
    .click(contacts.button.save);

  await t.expect(await getBtAlertText({ Selector })).contains(contacts.alerts.saved);

  await t.expect(contacts.table.email.exists).ok();
  await t.expect(await Selector('table tbody td').withText(email).exists).ok();
});

test('Details page contains correct', async t => {
  await t.click(contacts.link.details);

  await t.expect(contacts.data.name.withText(name).exists).ok();
  await t.expect(contacts.data.email.withText(email).exists).ok();
  await t.expect(contacts.data.description.withText(description).exists).ok();
});

test('Update record works', async t => {
  const newName = faker.name.firstName();
  await t
    .click(contacts.link.edit)
    .typeText(contacts.input.name, newName, { replace: true })
    .click(contacts.button.save);

  await t.expect(await getBtAlertText({ Selector })).contains(contacts.alerts.updated);

  await t.click(contacts.link.details);
  await t.expect(contacts.data.name.withText(newName).exists).ok();
});

test('Remove contact works', async t => {
  const emptyListMessage = 'There is no contacts yet. Use the form below to add some.';

  await t.click(contacts.button.delete);
  await t.expect(await getBtAlertText({ Selector })).contains(contacts.alerts.removed);
  await t.expect(await Selector('p').withText(emptyListMessage).exists).ok();
});

test('Validation error messages are showing up', async t => {
  await t
    .click(contacts.button.save)
    .expect(contacts.error.name.innerText)
    .eql(contacts.formErrors.errorText)
    .expect(contacts.error.email.innerText)
    .eql(contacts.formErrors.errorIsNotValidEmailText)
    .expect(contacts.error.name.innerText)
    .eql(contacts.formErrors.errorText);
}).after(async t => {
  /*
    At the end, create one entry to make sure when DB clean test is passing
   it actually had something to clear
  */
  await t
    .typeText(contacts.input.name, name)
    .typeText(contacts.input.email, email)
    .typeText(contacts.input.description, description)
    .click(contacts.button.save);
});
