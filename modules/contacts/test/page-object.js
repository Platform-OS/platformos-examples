import {
  Selector
} from 'testcafe';

export default class Contacts {
  constructor() {
    this.input = {
      name: Selector('#name'),
      email: Selector('#email'),
      description: Selector('#description')
    };
    this.button = {
      save: Selector('.btn').withText('Save'),
      delete: Selector('button').withText('Delete'),
      deleteContact: Selector('button.btn.btn-link')
    };
    this.link = {
      details: Selector('a').withText('Details'),
      detailsContact: Selector('td:nth-of-type(3) a'),
      edit: Selector('a').withText('Edit'),
      editContact: Selector('td:nth-of-type(4) a')
    };
    this.table = {
      tableRows: Selector('tbody > tr'),
      email: Selector('tbody > tr:nth-of-type(2) > td:nth-of-type(2)')
    };
    this.data = {
      name: Selector('main > p:nth-of-type(1)'),
      email: Selector('main > p:nth-of-type(2)'),
      description: Selector('main > p:nth-of-type(3)')
    };
    this.error = {
      name: Selector('#name + p'),
      email: Selector('#email + p'),
      description: Selector('#description + p')
    };
    this.formErrors = {
      errorInvalidPassText: 'Invalid email or password',
      errorText: "can't be blank",
      errorIsNotValidEmailText: 'is not a valid email address',
      errorIsTooShort: 'is too short (minimum is 6 characters)'
    };
    this.alerts = {
      saved: 'Contact was successfully created.',
      updated: 'Contact was successfully updated.',
      removed: 'Contact was successfully deleted.'
    };
  }
}