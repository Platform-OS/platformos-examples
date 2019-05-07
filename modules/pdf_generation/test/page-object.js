import { Selector } from 'testcafe';

export default class PDFGeneration {
  constructor() {
    this.button = {
      save: Selector('.btn.btn-primary.btn-lg'),
      PDF: Selector('td a[href]'),
      delete: Selector('button.btn.btn-link'),
    };
  }
}
