import { test as teardown } from '@playwright/test';
import { deleteAllExampleRecords } from '../../../tests/playwright/helpers';

teardown('clean admincms test data', async ({ request }) => {
  await deleteAllExampleRecords(request);
});
