import { test as setup } from '@playwright/test';
import { deleteUserByEmail } from '../../../tests/playwright/helpers';
import { CLIENT, DEV } from './test-data';

setup('clean users test data', async ({ request }) => {
  await deleteUserByEmail(request, CLIENT.email);
  await deleteUserByEmail(request, DEV.email);
});
