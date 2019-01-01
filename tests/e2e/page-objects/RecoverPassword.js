import {
  Selector
} from 'testcafe';

export default class RecoverPassword {
  constructor() {
    this.input = {
      email: Selector('#form_properties_attributes_email'),
    };
  }
}