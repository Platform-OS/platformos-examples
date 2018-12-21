import { Selector } from 'testcafe';

export default class Register {
  constructor() {
    this.link = {
      login: Selector('a').withText('Log in'),
      devRegister: Selector('a').withText('Developer'),
      clienRegister: Selector('a').withText('Client'),
    };
    this.input = {
      firstname: Selector('#form_first_name'),
      email: Selector('#form_email'),
      password: Selector('#form_password'),
      phone: Selector('#form_mobile_number'),
    };
    this.button = {
      submit: Selector('button.btn'),
    };
    this.error = {
      firstname: Selector('#form_first_name + p'),
      email: Selector('#form_email + p'),
      password: Selector('#form_password + p'),
      phone: Selector('#form_mobile_number + p'),
    };
  }
}
