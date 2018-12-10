import { Selector } from 'testcafe';

export default class Register {
  constructor() {
    this.headerSignUp = Selector('a').withText('Sign up');
    this.headerLogIn = Selector('a').withText('Log in');
    this.firstname = Selector('#form_first_name');
    this.email = Selector('#form_email');
    this.errorFormFirstName = Selector('#form_first_name +p');
    this.errorFormEmail = Selector('#form_email +p');
    this.errorFormPassword = Selector('#form_password +p');
    this.errorFormMobileNumber = Selector('#form_mobile_number +p');
    this.developerSignUp = Selector('a').withText('Developer');
    this.password = Selector('#form_password');
    this.mobileNumber = Selector('#form_mobile_number');
    this.submitButton = Selector('button.btn');
  }
}
