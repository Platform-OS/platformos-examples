import { Selector } from 'testcafe';
import { getBtAlertText, checkLiquidErrors } from '@platform-os/testcafe-helpers';
import FullFormPage from './page-object';

const form = new FullFormPage();

fixture('FullForm').page(`${process.env.MP_URL}/full-form-example`)

test('There are no liquid errors on the page', async t => {
  await checkLiquidErrors({ t, Selector });
});

test('Form submited successfuly', async t => {
  await t
    .typeText(form.elements.input, 'test@example.com', { paste: true })
    .click(form.elements.submit)
    .expect(Selector(".alert").withText("success").exists)
    .ok()

});

test('Form validation', async t => {
  await t
    .click(form.elements.submit)
    .expect(Selector(".alert").withText("fail").exists)
    .ok()
    .expect(Selector("p").withText("Hello from default payload!").exists)
    .ok()

});
