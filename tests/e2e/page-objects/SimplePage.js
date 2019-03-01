import { Selector } from 'testcafe';

export default class SimplePage {
  constructor() {
    this.element = {
      headerPage: Selector('h1'),
      info: Selector('p')
    };
  }
}
