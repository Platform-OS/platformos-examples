import { test as setup } from '@playwright/test';
import { deleteAllFeedback } from '../../../tests/playwright/helpers';

setup('clean feedback data', async ({ request }) => {
  await deleteAllFeedback(request);
});
