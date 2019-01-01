import {
  Selector
} from 'testcafe';

export default class Feedback {
  constructor() {
    this.link = {
      documentation: Selector('a').withText(
        'Managing customizations using AJAX (CRUD operations)'
      ),
    };
    this.input = {
      create_message: Selector('#create_message'),
      update_message: Selector('#update_message'),
      update_id: Selector(
        '.mt-3:nth-of-type(2) > form[action="/api/customizations"] input[name="customization_id"].form-control'
      ),
      delete_id: Selector(
        '.mt-3:nth-of-type(3) > form[action="/api/customizations"] input[name="customization_id"].form-control'
      ),
    };
    this.button = {
      submit: Selector('.btn.btn-primary.mt-3'),
      update: Selector('.btn.btn-primary.mt-3').withText('Update'),
      delete: Selector('.btn.btn-primary.mt-3').withText('Delete'),
      refresh: Selector('.btn.btn-primary.ml-3').withText(
        'Refresh content from the server'
      ),
    };
    this.radio = {
      radioExcellent: Selector('label').withText('Excellent'),
      radioMeh: Selector(
        '.row > .mt-3:nth-of-type(2) label:nth-of-type(2)'
      ).withText('Meh'),
    };
    this.table = {
      tableRows: Selector('tbody > tr'),
    };
    this.txt = {
      createRating: 'Excellent',
      updatedRating: 'Meh',
      createMessage: 'Lorem ipsum',
      updatedMessage: 'Dolor ipsum',
    };
    this.data = {
      id: Selector('tr > td:nth-of-type(1)'),
      rating: Selector('tr > td:nth-of-type(4)'),
      message: Selector('tr > td:nth-of-type(5)'),
    };
  }
}