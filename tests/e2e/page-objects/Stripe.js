import { Selector } from 'testcafe';

export default class Stripe {
  constructor() {
    this.button = {
      submit: Selector('button[type="submit"]'),
    };
    this.link = {
      documentation: Selector('a').withText('Integrating Stripe payments'),
    };
    this.stripeModal = {
      widget: Selector('ModalContainer'),
    };
    this.iframe = {
      iframeStripe: Selector('iframe[name="stripe_checkout_app"]'),
      validation: Selector('.Popover-content'),
    };
    this.input = {
      email: Selector('input[type="email"]'),
      cardNumber: Selector(
        '.Fieldset-childLeftRight > .Textbox-inputRow > input[type="tel"].Fieldset-input.Textbox-control'
      ),
      date: Selector(
        '.Fieldset-childLeft > .Textbox-inputRow > input[type="tel"].Fieldset-input.Textbox-control'
      ),
      ccv: Selector(
        '.Fieldset-childRight > .Textbox-inputRow > input[type="tel"].Fieldset-input.Textbox-control'
      ),
      zip: Selector(
        '.Fieldset-childLeftRight.Fieldset-childBottom > .Textbox-inputRow > input[type="tel"].Fieldset-input.Textbox-control'
      ),
    };
  }
}
