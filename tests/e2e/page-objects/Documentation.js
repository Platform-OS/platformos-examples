import {Selector} from 'testcafe';

export default class Documentation {
  constructor () {
    this.element = {
      titlePage: Selector ('.content > h1'),
    };
    this.title = {
      contactFormTitle: 'Building a Contact Form with Customization',
      feedbackTitle: 'Managing Customizations using AJAX (CRUD operations)',
      reCaptchaTitle: 'Adding reCaptcha Spam Protection',
      moduleTitle: 'Creating a Module',
      releatedModelsTitle: 'Loading Related Models',
      pagesTitle: 'Pages',
      stripeTitle: 'Integrating Stripe',
      ajaxUploadTitle: 'Uploading Files Directly to Amazon S3 Using AJAX',
    };
  }
}
