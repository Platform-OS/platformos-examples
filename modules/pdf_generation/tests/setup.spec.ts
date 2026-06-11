import { test as setup } from '@playwright/test';
import { deleteAllPdfUploads } from '../../../tests/playwright/helpers';

setup('clean pdf_generation data', async ({ request }) => {
  await deleteAllPdfUploads(request);
});
