import {Selector} from 'testcafe';
import LayoutPage from './Layout';

const layoutPage = new LayoutPage();

export default class UpdateProfile {
  constructor() {
    this.URL = {
      staging:
        process.env.MP_URL ||
        'https://nearme-example.staging-oregon.near-me.com/update_profile',
    };
    this.txt = {
      currentAvatar: 'Current avatar',
      currentBanner: 'Current banner',
      newAvatar: 'Newly uploaded avatar',
      newBanner: 'Newly uploaded banner',
    };
    this.input = {
      ajaxUpload: Selector('form[action]:nth-of-type(2) input[name="file"]'),
      avatarUpload: Selector('form[action]:nth-of-type(3) input[name="file"]'),
      banerUpload: Selector('input[name="file"]:nth-of-type(3)'),
    };
    this.files = {
      name: Selector('figcaption.figure-caption'),
      currentImgName: Selector('p.text-muted'),
      imgAWS: layoutPage.Content.find('img[src*="amazonaws.com/uploads'),
      img: layoutPage.Content.find('img[src*="uploads/image"]'),
    };
    this.link = {
      documentation: Selector('a').withText(
        'Uploading files directly to Amazon S3 using AJAX'
      ),
    };
  }
}
