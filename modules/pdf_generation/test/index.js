import { Selector } from 'testcafe';
import PDFGeneration from './page-object';
import { checkLiquidErrors } from '@platform-os/testcafe-helpers';

const pdfGeneration = new PDFGeneration();

fixture('PDF Requests').page(process.env.MP_URL).beforeEach(async t => {
  await t.navigateTo('/pdf-generation');
});

test('There are no liquid errors on the page', async t => {
  await checkLiquidErrors({ t, Selector });
});

test('Create PDF file', async t => {
  await t.click(pdfGeneration.button.save).wait(10000); //waiting for generating pdf file;
  await t.eval(() => location.reload(true));
  await t
    .expect(await pdfGeneration.button.PDF.getAttribute('href'))
    .match(/attachment.pdf/);
  await t.click(pdfGeneration.button.delete);
});
