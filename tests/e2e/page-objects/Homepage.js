import { Selector } from 'testcafe';

export default class HomePage {
  constructor() {
    this.linkRegister = Selector('a').withText('Register');
    this.linkLogIn = Selector('a').withText('Log in');
  }
}
