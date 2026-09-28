import { expect, Page, APIRequestContext } from '@playwright/test';

const GRAPH_ENDPOINT = '/api/graph';

function authHeaders() {
  return { Authorization: `Token token=${process.env.MPKIT_TOKEN}` };
}

export async function checkLiquidErrors(page: Page): Promise<void> {
  const bodyText = await page.locator('body').textContent();
  expect(bodyText).not.toContain('Liquid Error');
  expect(bodyText).not.toContain('RenderFormTag Error:');
  expect(bodyText).not.toContain('QueryGraphTag Error:');
  expect(bodyText).not.toContain('ExecuteQueryTagError:');
}

export async function getBtAlertText(page: Page, type = 'success'): Promise<string | null> {
  return page.locator(`.alert.alert-${type}`).textContent();
}

export async function createContact(
  request: APIRequestContext,
  data: { name: string; email: string; description: string }
): Promise<string> {
  const response = await request.post(GRAPH_ENDPOINT, {
    headers: authHeaders(),
    data: {
      query: `
        mutation CreateContact($name: String!, $email: String!, $description: String!) {
          record_create(
            record: {
              table: "modules/contacts/contact"
              properties: [
                { name: "name",        value: $name }
                { name: "email",       value: $email }
                { name: "description", value: $description }
              ]
            }
          ) {
            id
          }
        }
      `,
      variables: data,
    },
  });

  if (!response.ok()) {
    throw new Error(`createContact failed — ${response.status()} ${response.statusText()}\n${await response.text()}`);
  }

  const json = await response.json();
  if (json.errors) {
    throw new Error(`createContact GraphQL error — ${JSON.stringify(json.errors)}`);
  }
  return json.data.record_create.id as string;
}

export async function deleteAllContacts(
  request: APIRequestContext
): Promise<void> {
  const response = await request.post(GRAPH_ENDPOINT, {
    headers: authHeaders(),
    data: {
      query: `
        mutation {
          records_delete_all(table: "modules/contacts/contact") { count }
        }
      `,
    },
  });

  if (!response.ok()) {
    throw new Error(`deleteAllContacts failed — ${response.status()} ${response.statusText()}\n${await response.text()}`);
  }
}

export async function createExampleRecord(
  request: APIRequestContext,
  email: string
): Promise<void> {
  const response = await request.post(GRAPH_ENDPOINT, {
    headers: authHeaders(),
    data: {
      query: `
        mutation CreateExampleRecord($email: String!) {
          record_create(
            record: {
              table: "modules/full_form/example_record"
              properties: [{ name: "email", value: $email }]
            }
          ) { id }
        }
      `,
      variables: { email },
    },
  });

  if (!response.ok()) {
    throw new Error(`createExampleRecord failed — ${response.status()} ${response.statusText()}\n${await response.text()}`);
  }

  const json = await response.json();
  if (json.errors) {
    throw new Error(`createExampleRecord GraphQL error — ${JSON.stringify(json.errors)}`);
  }
}

export async function deleteAllExampleRecords(
  request: APIRequestContext
): Promise<void> {
  const response = await request.post(GRAPH_ENDPOINT, {
    headers: authHeaders(),
    data: {
      query: `
        mutation {
          records_delete_all(table: "modules/full_form/example_record") { count }
        }
      `,
    },
  });

  if (!response.ok()) {
    throw new Error(`deleteAllExampleRecords failed — ${response.status()} ${response.statusText()}\n${await response.text()}`);
  }
}

export async function deleteAllFeedback(
  request: APIRequestContext
): Promise<void> {
  const response = await request.post(GRAPH_ENDPOINT, {
    headers: authHeaders(),
    data: {
      query: `
        mutation {
          records_delete_all(table: "modules/feedback/feedback") { count }
        }
      `,
    },
  });

  if (!response.ok()) {
    throw new Error(`deleteAllFeedback failed — ${response.status()} ${response.statusText()}\n${await response.text()}`);
  }
}

export async function deleteUserByEmail(
  request: APIRequestContext,
  email: string
): Promise<void> {
  const findResponse = await request.post(GRAPH_ENDPOINT, {
    headers: authHeaders(),
    data: {
      query: `
        query FindUser($email: String!) {
          users(per_page: 100, filter: { email: { value: $email } }) {
            results { id }
          }
        }
      `,
      variables: { email },
    },
  });

  if (!findResponse.ok()) {
    throw new Error(`deleteUserByEmail lookup failed — ${findResponse.status()} ${findResponse.statusText()}\n${await findResponse.text()}`);
  }

  const json = await findResponse.json();
  if (json.errors) {
    throw new Error(`deleteUserByEmail lookup GraphQL error — ${JSON.stringify(json.errors)}`);
  }

  const users = json.data.users.results;

  for (const user of users) {
    const deleteResponse = await request.post(GRAPH_ENDPOINT, {
      headers: authHeaders(),
      data: {
        query: `
          mutation DeleteUser($id: ID!) {
            user_delete(id: $id) { id }
          }
        `,
        variables: { id: user.id },
      },
    });

    if (!deleteResponse.ok()) {
      throw new Error(`deleteUserByEmail failed for ${email} (id ${user.id}) — ${deleteResponse.status()} ${deleteResponse.statusText()}\n${await deleteResponse.text()}`);
    }

    const deleteJson = await deleteResponse.json();
    if (deleteJson.errors) {
      throw new Error(`deleteUserByEmail GraphQL error for ${email} (id ${user.id}) — ${JSON.stringify(deleteJson.errors)}`);
    }
  }
}

export async function deleteAllPdfUploads(
  request: APIRequestContext
): Promise<void> {
  const response = await request.post(GRAPH_ENDPOINT, {
    headers: authHeaders(),
    data: {
      query: `
        mutation {
          records_delete_all(table: "modules/pdf_generation/pdf_upload") { count }
        }
      `,
    },
  });

  if (!response.ok()) {
    throw new Error(`deleteAllPdfUploads failed — ${response.status()} ${response.statusText()}\n${await response.text()}`);
  }
}

export async function deleteContact(
  request: APIRequestContext,
  id: string | null
): Promise<string | null> {
  if (!id) throw new Error('deleteContact: id is required');
  const response = await request.post(GRAPH_ENDPOINT, {
    headers: authHeaders(),
    data: {
      query: `
        mutation DeleteContact($id: ID!) {
          record_delete(table: "modules/contacts/contact", id: $id) { id }
        }
      `,
      variables: { id },
    },
  });

  if (!response.ok()) {
    throw new Error(`deleteContact failed — ${response.status()} ${response.statusText()}\n${await response.text()}`);
  }

  const json = await response.json();
  if (json.errors) {
    throw new Error(`deleteContact GraphQL error — ${JSON.stringify(json.errors)}`);
  }
  return json.data.record_delete.id as string;
}
