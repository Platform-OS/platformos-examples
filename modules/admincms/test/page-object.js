import { Selector } from 'testcafe';

export default class Module {
  constructor() {
    this.link = {
      documentation: Selector('a').withText('Creating a module')
    };
    this.table = {
      propertiesRows: Selector('[data-result="customizations"] td:nth-of-type(2)'),
      pagesRows: Selector('[data-result="pages"] td:nth-of-type(2)'),
      assetsRows: Selector('[data-result="assets"] td:nth-of-type(2)')
    };
  }
}
