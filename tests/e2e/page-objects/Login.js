import { t } from 'testcafe';
import Register from './Register';
import HomePage from './Homepage';

const register = new Register();
const homePage = new HomePage();

export default class LogIn {
  async login(username, password) {
    await t
      .click(homePage.linkLogIn)
      .typeText(register.email, username)
      .typeText(register.password, password)
      .click(register.submitButton);
  }
}
