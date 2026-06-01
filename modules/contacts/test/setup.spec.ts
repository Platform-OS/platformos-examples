import { test as setup } from '@playwright/test';
import { createContact, deleteAllContacts } from '../../../tests/playwright/helpers';

setup('create test data', async ({ request }) => {
  await deleteAllContacts(request);

  const testUsers = {
    testUser1: {
      name: 'Test User',
      email: 'test1@example.com',
      description: 'Test description 1'
    },
    testUser2: {
      name: 'Test User 2',
      email: 'test2@example.com',
      description: 'Test description 2'
    },
    testUser3: {
      name: 'Test User 3',
      email: 'test3@example.com',
      description: 'Test description 3'
    },
  };

  for (const userData of Object.values(testUsers)) {
    await createContact(request, userData);
  }
});
