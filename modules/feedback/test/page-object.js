import { Selector } from 'testcafe';

export default class Feedback {
  constructor() {
    this.input = {
      create_message: Selector('#create_message'),
      update_message: Selector('#update_message'),
      update_id: Selector('[data-form="update"] [name="customization_id"]'),
      delete_id: Selector('[data-form="delete"] [name="customization_id"]')
    };
    this.button = {
      submit: Selector('button').withText('Create'),
      update: Selector('button').withText('Update'),
      delete: Selector('button').withText('Delete'),
      refresh: Selector('button').withText('Refresh content from the server')
    };
    this.radio = {
      create: {
        excellent: Selector('[data-form="create"] label').withText('Excellent'),
        meh: Selector('[data-form="create"] label').withText('Meh')
      },
      update: {
        excellent: Selector('[data-form="update"] label').withText('Excellent'),
        meh: Selector('[data-form="update"] label').withText('Meh')
      }
    };
    this.table = {
      tableRows: Selector('tbody > tr')
    };
    this.txt = {
      createRating: 'Excellent',
      createMessage: 'Lorem ipsum',
      updatedRating: 'Meh',
      updatedMessage: 'Dolor ipsum'
    };
    this.data = {
      id: Selector('tr > td:nth-of-type(1)'),
      rating: Selector('tr > td:nth-of-type(4)'),
      message: Selector('tr > td:nth-of-type(5)')
    };
  }
}
