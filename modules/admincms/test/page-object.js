import { Selector } from 'testcafe';

export default class Module {
  constructor() {
    this.table = {
      propertiesRows: Selector('[data-result="models"] td:nth-of-type(2)'),
      pagesRows: Selector('[data-result="pages"] td:nth-of-type(2)'),
      assetsRows: Selector('[data-result="assets"] td:nth-of-type(2)')
    };
  }
}
