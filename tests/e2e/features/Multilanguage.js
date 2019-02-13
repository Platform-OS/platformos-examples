import { Selector } from 'testcafe';
import LayoutPage from '../page-objects/Layout';

const layoutPage = new LayoutPage();

const url = 'https://examples.staging.oregon.platform-os.com';
// fixture('Multilanguage page - translations').page(`${layoutPage.URL.staging}`);
fixture('Multilanguage page - translations').page(url);

test('Default - no language - en fallback', async t => {
  await t.navigateTo('/multilanguage?name=John&url=https://documentation.platform-os.com');

  const footer = await Selector('footer');
  await t.expect(await footer.exists).ok();

  await t.expect(await layoutPage.getResult(1)).contains('Hello world!');
  await t.expect(await layoutPage.getResult(2)).contains('Ford Mustang');
  await t.expect(await layoutPage.getResult(2)).contains('Corvette');
  await t.expect(await layoutPage.getResult(2)).contains('Gran Torino');
  await t.expect(await layoutPage.getResult(3)).contains('Hello John. Take a look at my website: https://documentation.platform-os.com');
  await t.expect(await layoutPage.getResult(4)).eql('');
  await t.expect(await layoutPage.getResult(5)).eql('en');
});

test('English - forced by query param', async t => {
  await t.navigateTo('/multilanguage?language=en');

  await t.expect(await layoutPage.getResult(1)).contains('Hello world!');
  await t.expect(await layoutPage.getResult(4)).eql('en');
  await t.expect(await layoutPage.getResult(5)).eql('en');
});

test('Polish - translate', async t => {
  await t.navigateTo('/multilanguage?name=John&url=https://documentation.platform-os.com');

  await t.expect(await layoutPage.getResult(1)).contains('Hello world!');
  await t.expect(await layoutPage.getResult(2)).contains('Ford Mustang');
  await t.expect(await layoutPage.getResult(2)).contains('Corvette');
  await t.expect(await layoutPage.getResult(2)).contains('Gran Torino');
  await t.expect(await layoutPage.getResult(3)).contains('Hello John. Take a look at my website: https://documentation.platform-os.com');
  await t.expect(await layoutPage.getResult(4)).eql('');
  await t.expect(await layoutPage.getResult(5)).eql('en');
});

test('Unknown language - translate', async t => {
  await t.navigateTo('/multilanguage?language=js&name=John&url=https://documentation.platform-os.com');

  await t.expect(await layoutPage.getResult(1)).contains('console.log');

  await t.expect(await layoutPage.getResult(2)).contains('Promise');
  await t.expect(await layoutPage.getResult(2)).contains('reduce');
  await t.expect(await layoutPage.getResult(2)).contains('module');
  await t.expect(await layoutPage.getResult(3)).contains('John - https://documentation.platform-os.com');
  await t.expect(await layoutPage.getResult(4)).eql('js');
  await t.expect(await layoutPage.getResult(5)).eql('js');
});

test('Japanese - UTF-8 works', async t => {
  await t.navigateTo('/multilanguage?language=jp&name=おっす&url=https://documentation.platform-os.com');

  await t.expect(await layoutPage.getResult(1)).contains('今日は!');
  await t.expect(await layoutPage.getResult(4)).eql('jp');
  await t.expect(await layoutPage.getResult(5)).eql('jp');
});

test.skip('Unknown language has layout - unskip when fixed', async t => {
  await t.navigateTo('/multilanguage?language=js&name=John&url=https://documentation.platform-os.com');

  const footer = await Selector('footer');
  await t.expect(await footer.exists).ok();
});
