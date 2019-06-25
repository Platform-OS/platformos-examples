import { Selector, ClientFunction } from 'testcafe';

export default class FullFormPage {
  getPageUrl() {
    return ClientFunction(() => window.location.href);
  }

  constructor() {
    this.elements = {
      submit: Selector('button.btn-primary'),
      input: Selector('#form_email')
    };
  }
}
