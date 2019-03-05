import { Selector } from 'testcafe';
import Feedback from './page-object.js';

const feedback = new Feedback();

fixture('Feedback - CRUD using Ajax').page(`${process.env.MP_URL}/feedback`);

test('customizations_delete_all cleans feedback correctly', async t => {
  await t.expect(feedback.table.tableRows.count).gte(0);

  // clean database
  await t.navigateTo(`${process.env.MP_URL}/feedback/clean`).wait(500);

  await t.expect(feedback.table.tableRows.count).eql(0);
});

test('Create, Read', async t => {
  await t
    .click(feedback.radio.create.excellent)
    .typeText(feedback.input.create_message, 'Lorem ipsum')
    .click(feedback.button.submit)
    .click(feedback.button.refresh)
    .expect(feedback.table.tableRows.count)
    .eql(1)
    .expect(feedback.data.rating.innerText)
    .eql(feedback.txt.createRating)
    .expect(feedback.data.message.innerText)
    .eql(feedback.txt.createMessage);
});

test('Update, Read', async t => {
  let customization_id = await feedback.data.id.innerText;

  await t
    .typeText(feedback.input.update_id, customization_id)
    .click(feedback.radio.update.meh)
    .typeText(feedback.input.update_message, 'Dolor ipsum')
    .click(feedback.button.update)
    .click(feedback.button.refresh)
    .expect(feedback.data.rating.innerText)
    .eql(feedback.txt.updatedRating)
    .expect(feedback.data.message.innerText)
    .eql(feedback.txt.updatedMessage);
});

test('Delete, Read', async t => {
  let customization_id = await feedback.data.id.innerText;

  await t
    .typeText(feedback.input.delete_id, customization_id)
    .click(feedback.button.delete)
    .click(feedback.button.refresh)
    .expect(feedback.table.tableRows.count)
    .eql(0);
}).after(async t => {
  /*
    At the end, create one entry to make sure when DB clean test is passing
   it actually had something to clear
  */
  await t
    .click(feedback.radio.create.excellent)
    .typeText(feedback.input.create_message, 'This should be cleared by next test run')
    .click(feedback.button.submit);
});
