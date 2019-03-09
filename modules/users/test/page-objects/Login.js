import { Selector, t } from 'testcafe';

export default class LogIn {
  constructor() {
    this.button = {
      logout: Selector('button').withText('Log Out'),
      submit: Selector('button').withText('Log in')
    };

    this.input = {
      password: Selector('#form_password'),
      email: Selector('#form_email')
    };

    this.formErrors = {
      errorInvalidPassText: 'Invalid email or password'
    };

    this.text = {
      login: 'Session was successfully created.',
      logout: 'You have been logged out'
    };

    this.error = {
      password: Selector('#form_password + p')
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
