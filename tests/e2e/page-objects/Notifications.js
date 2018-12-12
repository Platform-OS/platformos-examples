import { Selector } from 'testcafe';

export default class Notifications {
  constructor() {
    this.text = {
      login: 'Session was successfully created.',
      register: 'You have signed up successfully.',
      logout: 'You have been logged out',
      reCaptcha: 'Recaptcha will appear after 3 failed login attempts.',
      saveContact: 'Contact was successfully created.',
      updateContact: 'Contact was successfully updated.',
      removeContact: 'Contact was successfully destroyed.',
      infoReCaptcha: 'Recaptcha will appear after 3 failed login attempts.',
      recoverPassword:
        'If you provided the right email, we will send you reset password instructions.',
    };
    this.messageType = {
      success: Selector('.alert.alert-success'),
      info: Selector('.alert.alert-info'),
    };
  }
}
//alertSuccess