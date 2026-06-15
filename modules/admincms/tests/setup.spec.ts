import { test as setup } from '@playwright/test';
import { deleteAllExampleRecords, createExampleRecord } from '../../../tests/playwright/helpers';

setup('seed admincms test data', async ({ request }) => {
  const emails = [
    'admincms-test-1@example.com',
    'admincms-test-2@example.com',
    'admincms-test-3@example.com',
  ];

  await deleteAllExampleRecords(request);

  for (const email of emails) {
    await createExampleRecord(request, email);
  }
});
