import faker from 'faker';
import got from 'got';

import Feedback from './page-object.js';
const feedback = new Feedback();

const clearDB = () => got(`${process.env.MP_URL}/feedback/clean.json`);

fixture('Feedback - CRUD using AJAX')
  .page(`${process.env.MP_URL}/feedback`)
  .before(async () => await clearDB())
  .after(async () => await clearDB());

test('Create', async t => {
  const lorem = faker.lorem.sentence();
  await t
    .click(feedback.radio.create.excellent)
    .typeText(feedback.input.create_message, lorem)
    .click(feedback.button.submit)
    .wait(2000); //it's a fix for random fails

  await t.click(feedback.button.refresh);

  await t.expect(feedback.table.tableRows.count).eql(1);
  await t.expect(feedback.data.rating.innerText).eql(feedback.txt.createRating);
  await t.expect(feedback.data.message.innerText).eql(lorem);
});

test('Update', async t => {
  const lorem = faker.lorem.sentence();
  let model_id = await feedback.data.id.innerText;

  await t
    .typeText(feedback.input.update_id, model_id)
    .click(feedback.radio.update.meh)
    .typeText(feedback.input.update_message, lorem)
    .click(feedback.button.update)
    .click(feedback.button.refresh);

  await t.expect(feedback.data.rating.innerText).eql(feedback.txt.updatedRating);
  await t.expect(feedback.data.message.innerText).eql(lorem);
});

test('Delete', async t => {
  let model_id = await feedback.data.id.innerText;

  await t.expect(await feedback.table.tableRows.count).eql(1);

  await t
    .typeText(feedback.input.delete_id, model_id)
    .click(feedback.button.delete)
    .click(feedback.button.refresh);

  await t.expect(await feedback.table.tableRows.count).eql(0);
});
