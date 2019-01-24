import 'testcafe';
import LogInRecaptcha from '../page-objects/LoginRecaptcha';
import Documentation from '../page-objects/Documentation';

const logInRecaptcha = new LogInRecaptcha();
const documentation = new Documentation();

fixture('Log In Recaptcha').page(logInRecaptcha.URL.staging);

test.skip('There is a link to the documentation', async t => {
  await t
    .click(logInRecaptcha.link.documentation)
    .expect(documentation.element.titlePage.innerText)
    .eql(documentation.title.reCaptchaTitle);
});
