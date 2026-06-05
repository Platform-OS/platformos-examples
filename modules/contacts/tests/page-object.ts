import { Page, Locator } from '@playwright/test';

export default class Contacts {
  input: {
    name: Locator;
    email: Locator;
    description: Locator;
  };
  button: {
    save: Locator;
  };
  table: {
    tableRow: (text: string) => {
      email: Locator;
      id: Locator;
      button: {
        delete: Locator;
      };
      link: {
        detailsContact: Locator;
        editContact: Locator;
      };
    };
    tableRows: Locator;
  };
  data: {
    name: Locator;
    email: Locator;
    description: Locator;
  };
  error: {
    name: Locator;
    email: Locator;
  };
  formErrors: {
    errorText: string;
    errorIsNotValidEmailText: string;
  };
  alerts: {
    saved: string;
    updated: string;
    removed: string;
  };

  constructor(page: Page) {
    this.input = {
      name: page.getByRole('textbox', { name: 'Name' }),
      email: page.getByRole('textbox', { name: 'Email' }),
      description: page.getByRole('textbox', { name: 'Description' })
    };
    this.button = {
      save: page.getByRole('button', { name: 'Save' }),
    };
    this.table = {
      tableRow: (text: string) => ({
        email: page.getByRole('cell', { name: text }),
        id: page.getByRole('row', { name: text }).getByRole('cell').first(),
        button: {
          delete: page.getByRole('row', { name: text }).getByRole('button', { name: 'Delete' }),
        },
        link: {
          detailsContact: page.getByRole('row', { name: text }).getByRole('link', { name: 'Details' }),
          editContact: page.getByRole('row', { name: text }).getByRole('link', { name: 'Edit' }),
        },
      }),
      tableRows: page.getByRole('row'),
    };
    this.data = {
      name: page.locator('main > p:nth-of-type(1)'),
      email: page.locator('main > p:nth-of-type(2)'),
      description: page.locator('main > p:nth-of-type(3)'),
    };
    this.error = {
      name: page.locator('#name + p'),
      email: page.locator('#email + p'),
    };
    this.formErrors = {
      errorText: "can't be blank",
      errorIsNotValidEmailText: 'is not a valid email address',
    };
    this.alerts = {
      saved: 'Contact was successfully created.',
      updated: 'Contact was successfully updated.',
      removed: 'Contact was successfully deleted.',
    };
  }
}
