import { Page, Locator } from '@playwright/test';

export default class UsersPage {
  readonly page: Page;

  readonly firstNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly phoneInput: Locator;
  readonly submitButton: Locator;
  readonly logOutButton: Locator;

  readonly firstNameError: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;
  readonly phoneError: Locator;

  readonly flashMessage: Locator;


  constructor(page: Page) {
    this.page = page;

    this.firstNameInput = page.locator('#form_first_name');
    this.emailInput = page.locator('[type="email"]');
    this.passwordInput = page.locator('[type="password"]');
    this.phoneInput = page.locator('#form_mobile_number');
    this.submitButton = page.locator('.btn.btn-primary');
    this.logOutButton = page.getByRole('button', { name: 'Log Out' });

    this.firstNameError = page.locator('#form_first_name + p');
    this.emailError = page.locator('#form_email + p');
    this.passwordError = page.locator('#form_password + p');
    this.phoneError = page.locator('#form_mobile_number + p');

    this.flashMessage = page.locator('div.flash-messages');
  }

  async login(email: string, password: string): Promise<void> {
    await this.page.goto('/sign-in');
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async logout(): Promise<void> {
    await this.logOutButton.click();
  }
}
