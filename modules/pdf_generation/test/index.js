import { Selector, ClientFunction } from 'testcafe';
import PDFGeneration from './page-object';
import { checkLiquidErrors } from '@platform-os/testcafe-helpers';

const pdfGeneration = new PDFGeneration();
const getRequestResult = ClientFunction(url => {
  return fetch(url)
  });
});

fixture('PDF Requests').page(process.env.MPKIT_URL).beforeEach(async t => {
  await t.navigateTo('/pdf-generation');
});

test('There are no liquid errors on the page', async t => {
  await checkLiquidErrors({ t, Selector });
});

test('Create PDF file', async t => {
  await t
    .click(pdfGeneration.button.save); //waiting for generating pdf file;
  await t
    .wait(20000)

  const href = await pdfGeneration.button.PDF.getAttribute('href');
  const pdfGenerationStatus = await getRequestResult(href);

  await t.expect(pdfGenerationStatus).notEql(404);
  await t.expect(pdfGenerationStatus).notEql(403);
  await t.expect(pdfGenerationStatus).notEql(400);

  await t.eval(() => location.reload(true));
  await t
    .expect(await pdfGeneration.button.PDF.getAttribute('href'))
    .match(/\.pdf/);
  await t.click(pdfGeneration.button.delete);
});

