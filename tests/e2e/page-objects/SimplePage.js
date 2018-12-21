import { Selector } from 'testcafe';

export default class SimplePage {
  constructor() {
    this.link = {
      documentation: Selector('a').withText('Example of a very simple page'),
    };
    this.element = {
      headerPage: Selector('h1'),
      info: Selector('p'),
    };
  }
}
