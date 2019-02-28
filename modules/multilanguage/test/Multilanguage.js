import { Selector } from 'testcafe';
import { getResult } from './helpers';

fixture('Multilanguage page - translations').page(`${process.env.MP_URL}`);

test('Default - no language - en fallback', async t => {
  await t.navigateTo('/multilanguage?name=John&url=https://documentation.platform-os.com');

  const footer = await Selector('footer');
  await t.expect(await footer.exists).ok();

  console.log(await getResult(1));

  await t.expect(await getResult(1)).contains('Hello world!');
  await t.expect(await getResult(2)).contains('Ford Mustang');
  await t.expect(await getResult(2)).contains('Corvette');
  await t.expect(await getResult(2)).contains('Gran Torino');
  await t
    .expect(await getResult(3))
    .contains('Hello John. Take a look at my website: https://documentation.platform-os.com');
  await t.expect(await getResult(4)).eql('');
  await t.expect(await getResult(5)).eql('en');
});

test('English - forced by query param', async t => {
  await t.navigateTo('/multilanguage?language=en');

  await t.expect(await getResult(1)).contains('Hello world!');
  await t.expect(await getResult(4)).eql('en');
  await t.expect(await getResult(5)).eql('en');
});

test('Polish - translate', async t => {
  await t.navigateTo('/multilanguage?name=John&url=https://documentation.platform-os.com');

  await t.expect(await getResult(1)).contains('Hello world!');
  await t.expect(await getResult(2)).contains('Ford Mustang');
  await t.expect(await getResult(2)).contains('Corvette');
  await t.expect(await getResult(2)).contains('Gran Torino');
  await t
    .expect(await getResult(3))
    .contains('Hello John. Take a look at my website: https://documentation.platform-os.com');
  await t.expect(await getResult(4)).eql('');
  await t.expect(await getResult(5)).eql('en');
});

test('Unknown language - translate', async t => {
  await t.navigateTo('/multilanguage?language=js&name=John&url=https://documentation.platform-os.com');

  await t.expect(await getResult(1)).contains('console.log');

  await t.expect(await getResult(2)).contains('Promise');
  await t.expect(await getResult(2)).contains('reduce');
  await t.expect(await getResult(2)).contains('module');
  await t.expect(await getResult(3)).contains('John - https://documentation.platform-os.com');
  await t.expect(await getResult(4)).eql('js');
  await t.expect(await getResult(5)).eql('js');
});

test('Japanese - UTF-8 works', async t => {
  await t.navigateTo('/multilanguage?language=jp&name=おっす&url=https://documentation.platform-os.com');

  await t.expect(await getResult(1)).contains('今日は!');
  await t.expect(await getResult(4)).eql('jp');
  await t.expect(await getResult(5)).eql('jp');
});

test.skip('Unknown language has layout - unskip when fixed', async t => {
  await t.navigateTo('/multilanguage?language=js&name=John&url=https://documentation.platform-os.com');

  const footer = await Selector('footer');
  await t.expect(await footer.exists).ok();
});

test('Authorization policy flash_alert translation works', async t => {
  await t.navigateTo('/multilanguage-unauthorized');

  const alertEN = await Selector('.alert.alert-danger');
  await t.expect(await alertEN.textContent).contains('You do not have permission to access this page');

  await t.navigateTo('/multilanguage-unauthorized?language=pl');

  const alertPL = await Selector('.alert.alert-danger');
  await t.expect(await alertPL.textContent).contains('Nie masz dostępu do tej strony.');
});
