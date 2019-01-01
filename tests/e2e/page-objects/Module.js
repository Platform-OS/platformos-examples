import {
  Selector
} from 'testcafe';

export default class Module {
  constructor() {
    this.link = {
      documentation: Selector('a').withText('Creating a module'),
    };
    this.table = {
      propertiesRows: Selector(
        '.row > div:nth-of-type(1) > table.table.table-compact > tbody > tr > td:nth-of-type(2)'
      ),
      pagesRows: Selector(
        '.row > div:nth-of-type(2) > table.table.table-compact > tbody > tr > td:nth-of-type(2)'
      ),
      assetsRows: Selector(
        'table.table.table-sm > tbody > tr > td:nth-of-type(2)'
      ),
    };
  }
}