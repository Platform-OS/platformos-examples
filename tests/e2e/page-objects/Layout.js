import { Selector, t } from 'testcafe';

export default class LayoutPage {
  constructor() {
    this.URL = {
      staging: process.env.MP_URL || 'https://examples.staging.oregon.platform-os.com'
    };
    this.formErrors = {
      errorInvalidPassText: 'Invalid email or password.',
      errorText: "can't be blank",
      errorIsNotValidEmailText: 'is not a valid email address',
      errorIsTooShort: 'is too short (minimum is 6 characters)'
    };
    this.Body = Selector('body');
    this.Content = this.Body.find('main');
  }

  async checkLiquidErrors() {
    const bodyText = await this.Body.textContent;
    return t
      .expect(bodyText)
      .notContains('Liquid Error')
      .expect(bodyText)
      .notContains('RenderFormTag Error:')
      .expect(bodyText)
      .notContains('QueryGraphTag Error:')
      .expect(bodyText)
      .notContains('ExecuteQueryTagError:');
  }
}
