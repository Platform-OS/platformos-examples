import { Selector, ClientFunction } from 'testcafe';
import PDFGeneration from './page-object';
import { checkLiquidErrors } from '@platform-os/testcafe-helpers';

const pdfGeneration = new PDFGeneration();
const getRequestResult = ClientFunction(url =>
  fetch(url).then(response => {
    const headers = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });
    return {
      status: response.status,
      statusText: response.statusText,
      headers: headers,
      url: response.url,
      ok: response.ok
    };
  }).catch(error => {
    return {
      error: true,
      errorMessage: error.message,
      errorName: error.name,
      url: url,
      details: 'Fetch failed - this could be due to CORS, network error, or blocked request'
    };
  })
);

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
  const pdfGenerationResult = await getRequestResult(href);

  // Check if fetch itself failed (CORS, network error, etc.)
  if (pdfGenerationResult.error) {
    throw new Error(
      `Fetch request failed:\n` +
      `Error: ${pdfGenerationResult.errorName}: ${pdfGenerationResult.errorMessage}\n` +
      `URL: ${pdfGenerationResult.url}\n` +
      `Details: ${pdfGenerationResult.details}\n` +
      `Response Headers: Not available (request failed before receiving response)`
    );
  }

  // Check if HTTP request returned an error status
  if (pdfGenerationResult.status === 404 || pdfGenerationResult.status === 403 || pdfGenerationResult.status === 400) {
    const headersString = JSON.stringify(pdfGenerationResult.headers, null, 2);
    throw new Error(
      `PDF generation request failed:\n` +
      `Status: ${pdfGenerationResult.status} ${pdfGenerationResult.statusText}\n` +
      `URL: ${pdfGenerationResult.url}\n` +
      `Response Headers:\n${headersString}`
    );
  }

  await t.expect(pdfGenerationResult.status).notEql(404);
  await t.expect(pdfGenerationResult.status).notEql(403);
  await t.expect(pdfGenerationResult.status).notEql(400);

  await t.eval(() => location.reload(true));
  await t
    .expect(await pdfGeneration.button.PDF.getAttribute('href'))
    .match(/\.pdf/);
  await t.click(pdfGeneration.button.delete);
});

