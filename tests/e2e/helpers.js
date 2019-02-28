import { Selector } from 'testcafe';

export default class Helpers {
  static async checkLiquidErrors(t) {
    const bodyText = await Selector('Body').textContent;

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

  static async getResult(name) {
    return await Selector(`[data-result="${name}"]`).textContent;
  }
}
