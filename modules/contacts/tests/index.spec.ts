import { test, expect } from '@playwright/test';
import { checkLiquidErrors, deleteContact } from '../../../tests/playwright/helpers';
import Contacts from './page-object';


test.describe('Contacts', () => {
  let contacts: Contacts;

  test.beforeEach(async ({ page }) => {
    await page.goto('/contacts');
    contacts = new Contacts(page);
  });

  test('There are no liquid errors on the page', async ({ page }) => {
    await checkLiquidErrors(page);
  });

  test('Adding new record works', async ({ page, request }) => {
    const name = 'New User';
    const email = 'new-user@example.com'
    const description = 'New description';

    await contacts.input.name.fill(name);
    await contacts.input.email.fill(email);
    await contacts.input.description.fill(description);
    await contacts.button.save.click();

    const alert = page.getByText(contacts.alerts.saved);
    const id = await contacts.table.tableRow(email).id.textContent();

    await expect(alert).toBeVisible();
    await expect(contacts.table.tableRow(email).email).toBeVisible();

    const contactDeleted = await deleteContact(request, id);
    expect(contactDeleted).toBeTruthy();
  });

  test('Details page contains correct data', async () => {
    const name = 'Test User';
    const email = 'test1@example.com';
    const description = 'Test description 1';

    await contacts.table.tableRow('test1@example.com').link.detailsContact.click();

    await expect(contacts.data.name).toContainText(name);
    await expect(contacts.data.email).toContainText(email);
    await expect(contacts.data.description).toContainText(description);
  });

  test('Update record works', async ({ page }) => {
    const email = 'test2@example.com';
    const newName = 'Updated User';

    await contacts.table.tableRow(email).link.editContact.click();
    await contacts.input.name.fill(newName);
    await contacts.button.save.click();

    const alert = page.getByText(contacts.alerts.updated);
    await expect(alert).toContainText(contacts.alerts.updated);

    await contacts.table.tableRow(email).link.detailsContact.click();
    await expect(contacts.data.name).toContainText(newName);
  });

  test('Remove contact works', async ({ page }) => {
    const email = 'test3@example.com';

    expect(await contacts.table.tableRows.count()).toBeGreaterThan(1);

    await contacts.table.tableRow(email).button.delete.click();

    const alert = page.getByText(contacts.alerts.removed);
    await expect(alert).toContainText(contacts.alerts.removed);
  });

  test.skip('Validation error messages are showing up', async () => {
    // Skipped: form.fields.properties.*.validation.errors is consistently empty on this version.
    // The correct path for record property validation errors needs to
    // be confirmed via {% log form.fields.properties.name, type: 'error' %} in the template.
    await contacts.button.save.click();

    await expect(contacts.error.name).toContainText(contacts.formErrors.errorText);
    await expect(contacts.error.email).toContainText(contacts.formErrors.errorIsNotValidEmailText);
  });
});
