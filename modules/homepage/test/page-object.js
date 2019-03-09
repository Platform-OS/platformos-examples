import { Selector, ClientFunction } from 'testcafe';

export default class HomePage {
  getPageUrl() {
    return ClientFunction(() => window.location.href);
  }
  constructor() {
    this.AMP_PAGES = [
      'https://www.ampproject.org/learn/overview/',
      'https://amp-demo-ecommerce.prod01.oregon.platform-os.com/',
      'https://amp-demo-travel.prod01.oregon.platform-os.com/',
      'https://amp-demo-lune.prod01.oregon.platform-os.com/',
      'https://amp-demo-gallery.prod01.oregon.platform-os.com/gallery',
      'https://amp-demo-blog.prod01.oregon.platform-os.com/'
    ];

    this.LINKS = [
      'Register',
      'Log in',
      'Building a contact form with customization',
      'Adding reCaptcha Spam Protection',
      'Uploading files directly to Amazon S3 using AJAX',
      'Integrating Stripe payments',
      'Managing customizations using AJAX (CRUD operations)',
      'Loading related models while avoiding n+1 queries. Increase speed 10x',
      'Example of a very simple page',
      'Measuring execution time of liquid code fragments (time_diff)',
      'Creating a module',
      'Google AMP?',
      'E-commerce',
      'Travel',
      'Product page',
      'Gallery',
      'Blog',
      'https://github.com/mdyd-dev/amp-demo-pages',
      'https://documentation.platform-os.com',
      'https://github.com/mdyd-dev/marketplace-nearme-example'
    ];
  }
}
