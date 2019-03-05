import { Selector, ClientFunction } from 'testcafe';

export default class HomePage {
  getPageUrl() {
    return ClientFunction(() => window.location.href);
  }
  constructor() {
    this.URL = {
      ampProject: 'https://www.ampproject.org/learn/overview/',
      ecommerce: 'https://amp-demo-ecommerce.prod01.oregon.platform-os.com/',
      travel: 'https://amp-demo-travel.prod01.oregon.platform-os.com/',
      lune: 'https://amp-demo-lune.prod01.oregon.platform-os.com/',
      gallery: 'https://amp-demo-gallery.prod01.oregon.platform-os.com/gallery',
      blog: 'https://amp-demo-blog.prod01.oregon.platform-os.com/',
      ampDemoGH: 'https://github.com/mdyd-dev/amp-demo-pages',
      nmExamples: 'https://github.com/mdyd-dev/marketplace-nearme-example',
      documentation: 'https://documentation.platform-os.com/'
    };
    this.link = {
      register: Selector('a').withText('Register'),
      login: Selector('a').withText('Log in'),
      contacts: Selector('a').withText('Building a contact form with customization'),
      reCaptcha: Selector('a').withText('Adding reCaptcha Spam Protection'),
      uploadFiles: Selector('a').withText('Uploading files directly to Amazon S3 using AJAX'),
      stripe: Selector('a').withText('Integrating Stripe payments'),
      ajax: Selector('a').withText('Managing customizations using AJAX (CRUD operations)'),
      models: Selector('a').withText('Loading related models while avoiding n+1 queries. Increase speed 10x'),
      simplePage: Selector('a').withText('Example of a very simple page'),
      timeDiff: Selector('a').withText('Measuring execution time of liquid code fragments (time_diff)'),
      module: Selector('a').withText('Creating a module'),
      googleAMP: Selector('a').withText('Google AMP?'),
      eCommerce: Selector('a').withText('E-commerce'),
      travel: Selector('a').withText('Travel'),
      productPage: Selector('a').withText('Product page'),
      gallery: Selector('a').withText('Gallery'),
      blog: Selector('a').withText('Blog'),
      googleAMPcode: Selector('a').withText('https://github.com/mdyd-dev/amp-demo-pages'),
      documentationWebsite: Selector('a').withText('https://documentation.platform-os.com'),
      exampleCode: Selector('a').withText('https://github.com/mdyd-dev/marketplace-nearme-example')
    };
  }
}
