import { Selector } from 'testcafe';

export default class Contacts {
  constructor() {
    this.URL = {
      staging: 'https://nearme-example.staging.oregon.platform-os.com/contacts'
    };
    this.input = {
      name: Selector('#name'),
      email: Selector('#email'),
      description: Selector('#description')
    };
    this.button = {
      save: Selector('button.btn.btn-primary')
    };
    this.link = {
      details: Selector('a').withText('Details'),
      edit: Selector('a').withText('Edit'),
      delete: Selector('.btn.btn-link').withText('Delete'),
      documentation: Selector('a').withText('Building a contact form with customization')
    };
    this.table = {
      email: Selector('tbody > tr:nth-of-type(2) > td:nth-of-type(2)')
    };
    this.data = {
      name: Selector('main > p:nth-of-type(1)'),
      email: Selector('main > p:nth-of-type(2)'),
      description: Selector('main > p:nth-of-type(3)')
    };
    this.text = {
      title: Selector('main > h2:nth-of-type(2)'),
      info: Selector('main')
    };
    this.error = {
      name: Selector('#name + p'),
      email: Selector('#email + p'),
      description: Selector('#description + p')
    };
  }
}
