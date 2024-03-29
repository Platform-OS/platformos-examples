import { Selector, t } from 'testcafe';

export default class Users {
  constructor() {
    this.link = {
      login: Selector('a').withText('Log in'),
      devRegister: Selector('a').withText('Developer'),
      clientRegister: Selector('a').withText('Client')
    };

    this.alerts = {
      signup: 'You have signed up successfully.',
      login: 'Session was successfully created.',
      logout: 'You have been logged out',
      recoverPassword: 'If you provided the right email, we will send you reset password instructions.'
    };

    this.button = {
      submit: Selector('.btn.btn-primary'),
      logout: Selector('button').withText('Log Out')
    };

    this.input = {
      firstname: Selector('#form_first_name'),
      email: Selector('[type="email"]'),
      password: Selector('[type="password"]'),
      phone: Selector('#form_mobile_number')
    };

    this.error = {
      firstname: this.input.firstname.sibling('p'),
      email: this.input.email.sibling('p'),
      password: this.input.password.sibling('p'),
      phone: this.input.phone.sibling('p')
    };

    this.formErrors = {
      errorInvalidPassText: 'Invalid email or password',
      errorText: "can't be blank",
      emailErrorText: "is not a valid email address, can't be blank",
      errorIsNotValidEmailText: 'is not a valid email address',
      errorIsTooShort: 'is too short (minimum is 6 characters)'
    };
  }

  async login(username, password) {
    await t.navigateTo('/sign-in');

    await t
      .typeText(this.input.email, username, { replace: true })
      .typeText(this.input.password, password, { replace: true })
      .click(this.button.submit);
  }

  async logout(t) {
    await t.click(this.button.logout);
  }
}
