import 'testcafe';
import LayoutPage from '../page-objects/Layout';
import HomePage from '../page-objects/Homepage';
import Module from '../page-objects/Module';
import Documentation from '../page-objects/Documentation';

const layoutPage = new LayoutPage();
const homePage = new HomePage();
const module = new Module();
const documentation = new Documentation();

fixture('Module').page(layoutPage.URL.staging);

test.skip('There is a link to the documentation', async t => {
  await t.click(homePage.link.module).click(module.link.documentation);
  await t.expect(documentation.element.titlePage.innerText).eql(documentation.title.moduleTitle);
});
