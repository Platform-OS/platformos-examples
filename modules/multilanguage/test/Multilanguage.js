import { Selector } from 'testcafe';
import { getResultText as getTxt } from '@platform-os/testcafe-helpers';

fixture('Multilanguage page - translations').page(`${process.env.MP_URL}`);

test('Default - no language - en fallback', async t => {
  await t.navigateTo('/multilanguage?name=John&url=https://documentation.platform-os.com');

  const footer = await Selector('footer');
  await t.expect(await footer.exists).ok();
  await t.expect(await getTxt({ name: 1, Selector })).contains('Hello world!');
  await t.expect(await getTxt({ name: 2, Selector })).contains('Ford Mustang');
  await t.expect(await getTxt({ name: 2, Selector })).contains('Corvette');
  await t.expect(await getTxt({ name: 2, Selector })).contains('Gran Torino');
  await t
    .expect(await getTxt({ name: 3, Selector }))
    .contains('Hello John. Take a look at my website: https://documentation.platform-os.com');
  await t.expect(await getTxt({ name: 4, Selector })).eql('');
  await t.expect(await getTxt({ name: 5, Selector })).eql('en');
});

test('English - forced by query param', async t => {
  await t.navigateTo('/multilanguage?language=en');

  await t.expect(await getTxt({ name: 1, Selector })).contains('Hello world!');
  await t.expect(await getTxt({ name: 4, Selector })).eql('en');
  await t.expect(await getTxt({ name: 5, Selector })).eql('en');
});

test('Polish - translate', async t => {
  await t.navigateTo('/multilanguage?name=John&url=https://documentation.platform-os.com');

  await t.expect(await getTxt({ name: 1, Selector })).contains('Hello world!');
  await t.expect(await getTxt({ name: 2, Selector })).contains('Ford Mustang');
  await t.expect(await getTxt({ name: 2, Selector })).contains('Corvette');
  await t.expect(await getTxt({ name: 2, Selector })).contains('Gran Torino');
  await t
    .expect(await getTxt({ name: 3, Selector }))
    .contains('Hello John. Take a look at my website: https://documentation.platform-os.com');
  await t.expect(await getTxt({ name: 4, Selector })).eql('');
  await t.expect(await getTxt({ name: 5, Selector })).eql('en');
});

test('Unknown language - translate', async t => {
  await t.navigateTo('/multilanguage?language=js&name=John&url=https://documentation.platform-os.com');

  await t.expect(await getTxt({ name: 1, Selector })).contains('console.log');

  await t.expect(await getTxt({ name: 2, Selector })).contains('Promise');
  await t.expect(await getTxt({ name: 2, Selector })).contains('reduce');
  await t.expect(await getTxt({ name: 2, Selector })).contains('module');
  await t.expect(await getTxt({ name: 3, Selector })).contains('John - https://documentation.platform-os.com');
  await t.expect(await getTxt({ name: 4, Selector })).eql('js');
  await t.expect(await getTxt({ name: 5, Selector })).eql('js');
});

test('Japanese - UTF-8 works', async t => {
  await t.navigateTo('/multilanguage?language=jp&name=おっす&url=https://documentation.platform-os.com');

  await t.expect(await getTxt({ name: 1, Selector })).contains('今日は!');
  await t.expect(await getTxt({ name: 4, Selector })).eql('jp');
  await t.expect(await getTxt({ name: 5, Selector })).eql('jp');
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
