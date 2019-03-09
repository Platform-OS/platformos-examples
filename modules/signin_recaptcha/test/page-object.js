import { Selector, t } from 'testcafe';

export default class LogInRecaptcha {
  constructor() {
    this.button = {
      submit: Selector('button.btn.btn-primary')
    };

    this.input = {
      email: Selector('input[type="email"]'),
      password: Selector('input[type="password"]')
    };

    this.reCaptcha = {
      iframe: Selector('iframe:first-of-type'),
      checkBoxRecaptcha: Selector('#recaptcha-anchor')
    };
  }

  async login(username, password) {
    await t
      .typeText(this.input.email, username, { replace: true })
      .typeText(this.input.password, password, { replace: true })
      .click(this.button.submit);
  }
}
