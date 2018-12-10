import { Selector } from 'testcafe';

export default class Contacts {
  constructor() {
    this.URL = {
      staging:
        process.env.MP_URL ||
        'https://nearme-example.staging-oregon.near-me.com/contacts',
    };
    this.formTitle = Selector('main > h2:nth-of-type(2)');
    this.infoNoContact = Selector('main');
    this.name = Selector('#name');
    this.email = Selector('#email');
    this.description = Selector('#description');
    this.buttonSave = Selector('button.btn.btn-primary');
    this.linkDetails = Selector('a').withText('Details');
    this.linkEdit = Selector('a').withText('Edit');
    this.linkDelete = Selector('.btn.btn-link').withText('Delete');
    this.userEmail = Selector('tbody > tr:nth-of-type(2) > td:nth-of-type(2)');
    this.userDetails = Selector('main > p:nth-of-type(1)');
    this.emailDetails = Selector('main > p:nth-of-type(2)');
    this.descriptionDetails = Selector('main > p:nth-of-type(3)');
    this.errorFormName = Selector('#name + p');
    this.errorFormEmail = Selector('#email + p');
    this.errorFormDescription = Selector('#description + p');
  }
}
