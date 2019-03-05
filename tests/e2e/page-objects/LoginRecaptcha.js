import { Selector } from 'testcafe';

export default class LogInRecaptcha {
  constructor() {
    this.button = {
      login: Selector('.btn').withText('Log In')
    };

    this.alerts = {
      info: 'Recaptcha will appear after 3 failed login attempts.'
    };

    this.reCaptcha = {
      iframe: Selector('iframe:first-of-type'),
      checkBoxRecaptcha: Selector('#recaptcha-anchor')
    };
  }
}
