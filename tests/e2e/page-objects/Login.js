import {
  Selector,
  t
} from 'testcafe';
import Register from './Register';
import HomePage from './Homepage';

const register = new Register();
const homePage = new HomePage();

export default class LogIn {
  constructor() {
    this.link = {
      recoverPassword: Selector('a').withText('Recover password'),
    };
  }

  async login(username, password) {
    await t
      .click(homePage.link.login)
      .typeText(register.input.email, username)
      .typeText(register.input.password, password)
      .click(register.button.submit);
  }
}