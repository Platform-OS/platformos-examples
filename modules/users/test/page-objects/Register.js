import { Selector } from 'testcafe';

export default class Register {
  constructor() {
    this.link = {
      login: Selector('a').withText('Log in'),
      devRegister: Selector('a').withText('Developer'),
      clientRegister: Selector('a').withText('Client')
    };
    this.input = {
      firstname: Selector('#form_first_name'),
      email: Selector('#form_email'),
      password: Selector('#form_password'),
      phone: Selector('#form_mobile_number')
    };
    this.alerts = {
      success: 'You have signed up successfully.'
    };
    this.button = {
      submit: Selector('button').withText('Create'),
      logout: Selector('button').withText('Log Out')
    };
    this.error = {
      firstname: Selector('#form_first_name + p'),
      email: Selector('#form_email + p'),
      password: Selector('#form_password + p'),
      phone: Selector('#form_mobile_number + p')
    };
    this.formErrors = {
      errorInvalidPassText: 'Invalid email or password',
      errorText: "can't be blank",
      errorIsNotValidEmailText: 'is not a valid email address',
      errorIsTooShort: 'is too short (minimum is 6 characters)'
    };
    this.text = {
      login: 'Session was successfully created.'
    };
  }
}
