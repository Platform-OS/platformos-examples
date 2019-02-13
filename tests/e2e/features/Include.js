import { Selector } from 'testcafe';
import LayoutPage from '../page-objects/Layout';

const layoutPage = new LayoutPage();

fixture('Include tag and exports tag').page(`${layoutPage.URL.staging}/include`);

const getResult = async n => await Selector(`.result-${n}`).textContent;

test('Simple include', async t => {
  await t.expect(await getResult(1)).contains('This is first partial');
  await t.expect(await getResult(1)).contains('This is second partial');
});

test('Local variable using with', async t => {
  await t.expect(await getResult(2)).contains('{"maker"=>"Honda", "model"=>"CRX"}');
});

test('Iterating over collection using for', async t => {
  await t
    .expect(await getResult(3))
    .contains('{"maker"=>"Honda", "model"=>"CRX"}{"maker"=>"Subaru", "model"=>"Forester"}{"maker"=>"Lexus", "model"=>"LFA"}');
});

test('Private variables - Demonstration', async t => {
  await t.expect(await getResult(4)).eql('\n      This is empty: \n    ');
});

test('Private variables - Exporting variable', async t => {
  await t.expect(await getResult(5)).contains('Car: {"honda"=>{"maker"=>"Honda", "model"=>"CRX", "year"=>"1991"}}');
});
