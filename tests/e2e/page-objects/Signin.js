import { Selector, t } from 'testcafe';
import SignUp from './Signup';

const signUp = new SignUp();

export default class SignIn { 

    async signin (username,password) {
        await t
            .typeText(signUp.email, username)
            .typeText(signUp.password, password)
            .click(signUp.submitButton);
    }
}