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
