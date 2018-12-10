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
    .expect(contacts.formTitle.innerText)
    .eql('Create contact')
    .typeText(contacts.name, name)
    .typeText(contacts.email, email)
    .typeText(contacts.description, description)
    .click(contacts.buttonSave)
    .expect(layoutPage.alertSuccess.exists)
    .ok();
});

test('On details page are contact data', async t => {
  await t
    .expect(contacts.userEmail.exists)
    .ok()
    .expect(contacts.userEmail.withText(email).exists)
    .ok()
    .click(contacts.linkDetails)
    .expect(contacts.userDetails.withText(name).exists)
    .ok()
    .expect(contacts.emailDetails.withText(email).exists)
    .ok()
    .expect(contacts.descriptionDetails.withText(description).exists)
    .ok();
});

test('Edit of data on edit form', async t => {
  await t
    .click(contacts.linkEdit)
    .selectText(contacts.name)
    .pressKey('delete')
    .typeText(contacts.name, 'Tester 2')
    .click(contacts.buttonSave)
    .expect(layoutPage.alertSuccess.exists)
    .ok()
    .click(contacts.linkDetails)
    .expect(contacts.userDetails.withText(name).exists)
    .ok();
});

test('Remove contact', async t => {
  const emptyList = 'There is no contacts yet. Use the form below to add some.';

  await t
    .click(contacts.linkDelete)
    .expect(layoutPage.alertSuccess.exists)
    .ok()
    .expect(contacts.infoNoContact.withText(emptyList).exists)
    .ok();
});

test('Display errors message on the form', async t => {
  await t
    .click(contacts.buttonSave)
    .expect(contacts.errorFormName.innerText)
    .eql(layoutPage.formErrors.errorText)
    .expect(contacts.errorFormEmail.innerText)
    .eql(layoutPage.formErrors.errorIsNotValidEmailText)
    .expect(contacts.errorFormName.innerText)
    .eql(layoutPage.formErrors.errorText);
});
