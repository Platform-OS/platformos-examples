import { Selector } from 'testcafe';
import Helpers from './helpers';

fixture('Simple page').page(`${process.env.MP_URL}/about`);

test('There are no liquid errors on the page', async t => {
  await Helpers.checkLiquidErrors(t);
});

test('Header is correct', async t => {
  const headerText = await Selector('h1').textContent;

  await t.expect(headerText).eql('About us page');
});

test('Content is correct', async t => {
  const paragraphText = await Selector('p').textContent;

  await t.expect(paragraphText).eql('A paragraph explaining what we do.');
});
