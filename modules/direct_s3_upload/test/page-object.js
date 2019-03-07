import { Selector, ClientFunction } from 'testcafe';

export default class UpdateProfile {
  getPageUrl() {
    return ClientFunction(() => window.location.href);
  }

  constructor() {
    this.form = {
      html: Selector('[data-test="html-form"]'),
      ajax: Selector('[data-test="ajax-form"]'),
      profile: Selector('[data-test="profile-form"]')
    };
    this.submit = {
      html: this.form.html.find('button'),
      profile: this.form.profile.find('button')
    };
    this.input = {
      html: this.form.html.find('[type="file"]'),
      ajax: this.form.ajax.find('[type="file"]'),
      bio: this.form.profile.find('textarea'),
      avatar: this.form.profile.find('[type="file"]:nth-of-type(1)'), // ugh :x
      banner: this.form.profile.find('[type="file"]:nth-of-type(3)') // ugh :x
    };
    this.container = {
      avatar: this.form.profile.find('[data-s3-direct-upload-field-preview="avatar"]'),
      banner: this.form.profile.find('[data-s3-direct-upload-field-preview="banner"]')
    };
    this.files = {
      ajax: this.form.ajax.find('figcaption.figure-caption'),
      ajaxImage: this.form.ajax.find('img[src*="amazonaws.com/uploads')
    };
    this.current = {
      avatar: this.container.avatar.find('img:first-of-type'),
      banner: this.container.banner.find('img:first-of-type')
    };
    this.new = {
      avatar: this.container.avatar.find('figcaption'),
      banner: this.container.banner.find('figcaption')
    };
  }
}
