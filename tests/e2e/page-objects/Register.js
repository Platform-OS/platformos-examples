import { Selector } from 'testcafe';

export default class Register {
  constructor() {
    this.headerSignUp = Selector('a').withText('Sign up');
    this.headerLogIn = Selector('a').withText('Log in');
    this.firstname = Selector('#form_first_name');
    this.email = Selector('#form_email');
    this.developerSignUp = Selector('a').withText('Developer');
    this.password = Selector('#form_password');
    this.mobileNumber = Selector('#form_mobile_number');
    this.submitButton = Selector('button.btn');
  }
}
