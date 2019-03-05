import { Selector } from 'testcafe';

export default class UpdateProfile {
  constructor() {
    this.txt = {
      currentAvatar: 'Current avatar',
      currentBanner: 'Current banner',
      newAvatar: 'Newly uploaded avatar',
      newBanner: 'Newly uploaded banner'
    };
    this.input = {
      ajaxUpload: Selector('form[action]:nth-of-type(2) input[name="file"]'),
      avatarUpload: Selector('form[action]:nth-of-type(3) input[name="file"]'),
      banerUpload: Selector('input[name="file"]:nth-of-type(3)')
    };
    this.files = {
      name: Selector('figcaption.figure-caption'),
      currentImgName: Selector('p.text-muted'),
      imgAWS: Selector('img[src*="amazonaws.com/uploads'),
      img: Selector('img[src*="uploads/image"]')
    };
  }
}
