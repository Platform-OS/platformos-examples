import { Selector } from 'testcafe';

export default class Feedback {
  constructor() {
    this.input = {
      create_message: Selector('#create_message'),
      update_message: Selector('#update_message'),
      update_id: Selector('[data-form="update"] [name="model_id"]'),
      delete_id: Selector('[data-form="delete"] [name="model_id"]')
    };
    this.button = {
      submit: Selector(
        '.row > .mt-3:nth-of-type(1) .simple_form.form > .card > .card-body > button.btn.btn-primary.mt-3'
      ),
      update: Selector(
        '.row > .mt-3:nth-of-type(2) .simple_form.form > .card > .card-body > button.btn.btn-primary.mt-3'
      ),
      delete: Selector(
        '.row > .mt-3:nth-of-type(3) .simple_form.form > .card > .card-body > button.btn.btn-primary.mt-3'
      ),
      refresh: Selector('button[type="button"][data-button="refreshRead]')
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
      updatedRating: 'Meh'
    };
    this.data = {
      id: Selector('tr > td:nth-of-type(1)'),
      rating: Selector('tr > td:nth-of-type(4)'),
      message: Selector('tr > td:nth-of-type(5)')
    };
  }
}
