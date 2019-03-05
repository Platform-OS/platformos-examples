import { Selector } from 'testcafe';

export default class RecoverPassword {
  constructor() {
    this.alerts = {
      recoverPassword: 'If you provided the right email, we will send you reset password instructions.'
    };

    this.button = {
      recover: Selector('button').withText('Recover Password')
    };

    this.input = {
      email: Selector('#form_properties_attributes_email')
    };
  }
}
