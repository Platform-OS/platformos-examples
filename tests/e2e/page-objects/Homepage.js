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
      uploadFiles: Selector('a').withText(
        'Uploading files directly to Amazon S3 using AJAX'
      ),
      stripe: Selector('a').withText('Integrating Stripe payments'),
      ajax: Selector('a').withText(
        'Managing customizations using AJAX (CRUD operations)'
      ),
      models: Selector('a').withText(
        'Loading related models while avoiding n+1 queries. Increase speed 10x'
      ),
      simplePage: Selector('a').withText('Example of a very simple page'),
      timeDiff: Selector('a').withText(
        'Measuring execution time of liquid code fragments (time_diff)'
      ),
      module: Selector('a').withText('Creating a module'),
    };
    this.button = {
      logout: Selector('.btn.btn-secondary.btn-sm'),
    };
  }
}
