import { Selector } from 'testcafe';

export default class HomePage {
  constructor() {
    this.link = {
      register: Selector('a').withText('Register'),
      login: Selector('a').withText('Log in'),
      contacts: Selector('a').withText(
        'Building a contact form with customization'
      ),
      reCaptcha: Selector('a').withText('Adding reCaptcha Spam Protection'),
      uploadFiles: Selector('a').withText('Uploading files directly to Amazon S3 using AJAX'),
    };
  }
}
