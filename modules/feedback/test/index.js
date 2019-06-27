import faker from 'faker';
import https from 'https';
import Feedback from './page-object.js';
const feedback = new Feedback();

const clearDB = async () => {
  await new Promise(resolve => {
    https.get(`${process.env.MP_URL}/feedback/clean.json`, res => {
      if (res.statusCode === 200) {
        resolve();
      }
    });
  });
};

fixture('Feedback - CRUD using Ajax')
  .page(`${process.env.MP_URL}/feedback`)
  .before(clearDB)
  .after(clearDB);

test('Create', async t => {
  const lorem = faker.lorem.sentence();
  await t
    .click(feedback.radio.create.excellent)
    .typeText(feedback.input.create_message, lorem)
    .click(feedback.button.submit)
    .click(feedback.button.refresh);

  await t.expect(feedback.table.tableRows.count).eql(1);
  await t.expect(feedback.data.rating.innerText).eql(feedback.txt.createRating);
  await t.expect(feedback.data.message.innerText).eql(lorem);
});

test('Read', async t => {
  https.get(`${process.env.MP_URL}/feedback/seed.json`, async res => {
    if (res.statusCode !== 200) {
      return;
    }

    await t.expect(feedback.table.tableRows.count).gt(3);
  });
});

test('Update', async t => {
  const lorem = faker.lorem.sentence();
  let customization_id = await feedback.data.id.innerText;

  await t
    .typeText(feedback.input.update_id, customization_id)
    .click(feedback.radio.update.meh)
    .typeText(feedback.input.update_message, lorem)
    .click(feedback.button.update)
    .click(feedback.button.refresh);

  await t.expect(feedback.data.rating.innerText).eql(feedback.txt.updatedRating);
  await t.expect(feedback.data.message.innerText).eql(lorem);
});

test('Delete', async t => {
  let customization_id = await feedback.data.id.innerText;
  let originalRowsCount = await feedback.table.tableRows.count;

  await t
    .typeText(feedback.input.delete_id, customization_id)
    .click(feedback.button.delete)
    .click(feedback.button.refresh);

  await t.expect(await feedback.table.tableRows.count).lt(originalRowsCount);
});
