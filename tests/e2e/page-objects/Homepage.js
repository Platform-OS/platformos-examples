import { Selector } from 'testcafe';

export default class HomePage {
  constructor() {
    this.linkSignUp = Selector('a').withText('Please sign up');
    this.linkLogIn = Selector('a').withText('Sign In');
  }
}
