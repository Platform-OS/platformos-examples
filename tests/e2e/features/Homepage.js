import 'testcafe';
import LayoutPage from '../page-objects/Layout';

const layoutPage = new LayoutPage();

fixture('Homepage').page(layoutPage.URL.staging);

test('There are no liquid errors on the page', async () => {
  await layoutPage.checkLiquidErrors();
});
