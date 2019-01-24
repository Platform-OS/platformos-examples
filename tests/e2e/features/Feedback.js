import 'testcafe';
import LayoutPage from '../page-objects/Layout';
import Feedback from '../page-objects/Feedback';
import HomePage from '../page-objects/Homepage';

const layoutPage = new LayoutPage();
const feedback = new Feedback();
const homePage = new HomePage();

fixture('Feedback').page(layoutPage.URL.staging);

test('There are no liquid errors on the page', async t => {
  await t.click(homePage.link.ajax);
  await layoutPage.checkLiquidErrors();
});

test('Create, Read, Update, Delete pattern using AJAX and customization', async t => {
  await t
    .click(homePage.link.ajax)
    .typeText(feedback.input.create_message, 'Lorem ipsum')
    .click(feedback.radio.radioExcellent)
    .click(feedback.button.submit)
    .click(feedback.button.refresh)
    .expect(feedback.table.tableRows.count)
    .eql(1)
    .expect(feedback.data.rating.innerText)
    .eql(feedback.txt.createRating)
    .expect(feedback.data.message.innerText)
    .eql(feedback.txt.createMessage);
  let customization_id = await feedback.data.id.innerText;
  await t.typeText(feedback.input.update_id, customization_id).click(feedback.radio.radioMeh);
  await t
    .typeText(feedback.input.update_message, 'Dolor ipsum')
    .click(feedback.button.update)
    .click(feedback.button.refresh)
    .expect(feedback.data.rating.innerText)
    .eql(feedback.txt.updatedRating)
    .expect(feedback.data.message.innerText)
    .eql(feedback.txt.updatedMessage);
  await t
    .typeText(feedback.input.delete_id, customization_id)
    .click(feedback.button.delete)
    .click(feedback.button.refresh)
    .expect(feedback.table.tableRows.count)
    .eql(0);
});
