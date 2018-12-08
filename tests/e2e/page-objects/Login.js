import { t } from 'testcafe';
import Register from './Register';

const register = new Register();

export default class LogIn {
  async signin(username, password) {
    await t
      .typeText(register.email, username)
      .typeText(register.password, password)
      .click(register.submitButton);
  }
}
