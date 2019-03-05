import { Selector } from 'testcafe';
import { getResultText } from '@platform-os/testcafe-helpers';

fixture('Include tag and exports tag').page(`${process.env.MP_URL}/include`);

test('Simple include', async t => {
  const actual = await getResultText({ name: 1, Selector });

  await t.expect(actual).contains('This is first partial');
  await t.expect(actual).contains('This is second partial');
});

test('Local variable using with', async t => {
  const actual = await getResultText({ name: 2, Selector });

  await t.expect(actual).contains('{"maker"=>"Honda", "model"=>"CRX"}');
});

test('Iterating over collection using for', async t => {
  const actual = await getResultText({ name: 3, Selector });
  const expected =
    '{"maker"=>"Honda", "model"=>"CRX"}{"maker"=>"Subaru", "model"=>"Forester"}{"maker"=>"Lexus", "model"=>"LFA"}';

  await t.expect(actual).contains(expected);
});

// PP flag makes this feature not work on this MP.
// Turning it will break MP and will require migration of MP to flag:true approach
test.skip('Private variables - Demonstration', async t => {
  const actual = await getResultText({ name: 4, Selector });

  await t.expect(actual).notContains('Honda');
});

// PP flag makes this feature not work on this MP.
// Turning it will break MP and will require migration of MP to flag:true approach
test.skip('Private variables - Exporting variable', async t => {
  const actual = await getResultText({ name: 5, Selector });
  const expected = 'Car: {"honda"=>{"maker"=>"Honda", "model"=>"CRX", "year"=>"1991"}}';

  await t.expect(actual).contains(expected);
});
