import 'testcafe';
import Contacts from './page-objects/Contacts';
import LayoutPage from './page-objects/Layout';

const contacts = new Contacts();
const layoutPage = new LayoutPage();

const contactData = {
  NAME: 'Tester',
  EMAIL: `test+${+new Date()}@example.com`,
  DESCRIPTION: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
};

const name = contactData.NAME;
const email = contactData.EMAIL;
const description = contactData.DESCRIPTION;

fixture('Contacts').page(contacts.URL.staging);

test('There are no liquid errors on the page', async () => {
  await layoutPage.checkLiquidErrors();
});

test('Add new contact to the list', async t => {
  await t
    .expect(contacts.text.title.innerText)
    .eql('Create contact')
    .typeText(contacts.input.name, name)
    .typeText(contacts.input.email, email)
    .typeText(contacts.input.description, description)
    .click(contacts.button.save)
    .expect(layoutPage.alertSuccess.exists)
    .ok();
});

test('On details page are contact data', async t => {
  await t
    .expect(contacts.table.email.exists)
    .ok()
    .expect(contacts.table.email.withText(email).exists)
    .ok()
    .click(contacts.link.details)
    .expect(contacts.data.name.withText(name).exists)
    .ok()
    .expect(contacts.data.email.withText(email).exists)
    .ok()
    .expect(contacts.data.description.withText(description).exists)
    .ok();
});

test('Edit of data on edit form', async t => {
  await t
    .click(contacts.link.edit)
    .selectText(contacts.input.name)
    .pressKey('delete')
    .typeText(contacts.input.name, 'Tester 2')
    .click(contacts.button.save)
    .expect(layoutPage.alertSuccess.exists)
    .ok()
    .click(contacts.link.details)
    .expect(contacts.data.name.withText(name).exists)
    .ok();
});

test('Remove contact', async t => {
  const emptyList = 'There is no contacts yet. Use the form below to add some.';

  await t
    .click(contacts.link.delete)
    .expect(layoutPage.alertSuccess.exists)
    .ok()
    .expect(contacts.text.info.withText(emptyList).exists)
    .ok();
});

test('Display errors message on the form', async t => {
  await t
    .click(contacts.button.save)
    .expect(contacts.error.name.innerText)
    .eql(layoutPage.formErrors.errorText)
    .expect(contacts.error.email.innerText)
    .eql(layoutPage.formErrors.errorIsNotValidEmailText)
    .expect(contacts.error.name.innerText)
    .eql(layoutPage.formErrors.errorText);
});
