import { Selector, t } from 'testcafe';

export default class LayoutPage {
  constructor() {
    this.URL = {
      staging:
        process.env.MP_URL ||
        'https://nearme-example.staging-oregon.near-me.com',
    };
    this.Body = Selector('body');
    this.Content = this.Body.find('main');
    this.alertSuccess = Selector('.alert.alert-success');
  }

  async checkLiquidErrors() {
    const bodyText = await this.Body.textContent;
    return t
      .expect(bodyText)
      .notContains('Liquid Error')
      .expect(bodyText)
      .notContains('RenderFormTag Error')
      .expect(bodyText)
      .notContains('QueryGraphTag Error');
  }
}
