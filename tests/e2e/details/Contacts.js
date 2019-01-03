import 'testcafe';
import Contacts from '../page-objects/Contacts';
import Documentation from '../page-objects/Documentation';

const contacts = new Contacts();
const documentation = new Documentation();

fixture('Contacts').page(contacts.URL.staging);

test.skip('There is a link to the documentation', async t => {
  await t
    .click(contacts.link.documentation)
    .expect(documentation.element.titlePage.innerText)
    .eql(documentation.title.contactFormTitle);
});