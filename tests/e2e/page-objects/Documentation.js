import 'testcafe';

export default class Documentation {
  constructor() {
    this.URL = {
      production: process.env.MP_URL || 'https://documentation.platform-os.com',
    };
  }
}
