import { Selector, t } from 'testcafe';

export default class Stripe {
  constructor() {
    this.button = {
      submit: Selector('button[type="submit"]')
    };
    this.iframe = {
      iframeStripe: Selector('iframe[name="stripe_checkout_app"]'),
      validation: Selector('.Popover-content')
    };
    this.input = {
      email: Selector('input[type="email"]'),
      password: Selector('input[type="password"]'),
      cardNumber: Selector(
        '.Fieldset-childLeftRight > .Textbox-inputRow > input[type="tel"].Fieldset-input.Textbox-control'
      ),
      date: Selector('.Fieldset-childLeft > .Textbox-inputRow > input[type="tel"].Fieldset-input.Textbox-control'),
      ccv: Selector('.Fieldset-childRight > .Textbox-inputRow > input[type="tel"].Fieldset-input.Textbox-control'),
      zip: Selector(
        '.Fieldset-childLeftRight.Fieldset-childBottom > .Textbox-inputRow > input[type="tel"].Fieldset-input.Textbox-control'
      )
    };
  }

  async login(username, password) {
    const submitButton = Selector('button.btn.btn-primary');

    await t.navigateTo('/sign-in');

    await t
      .typeText(this.input.email, username, { replace: true })
      .typeText(this.input.password, password, { replace: true })
      .click(submitButton);
  }
}
