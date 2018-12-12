import { Selector } from 'testcafe';

export default class UpdateProfile {
  constructor() {
    this.URL = {
      staging:
        process.env.MP_URL ||
        'https://nearme-example.staging-oregon.near-me.com/update_profile',
    };
    this.input = {
      ajaxUpload: Selector('form[action]:nth-of-type(2) input[name="file"]'),
    };
    this.files = {
      name: Selector('figcaption.figure-caption'),
      img: Selector('img'),
    };
  }
}
