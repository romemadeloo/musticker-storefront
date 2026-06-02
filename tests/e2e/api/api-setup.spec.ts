import { test, expect } from '../../fixtures/e2e-test.js';
import { ApiClient } from '../../fixtures/api-client.js';
import { canRunApiSetup, makeRunMarker } from '../../fixtures/env.js';
import type { ApiTestUser } from '../../fixtures/types.js';

test.describe('api test data management', { tag: ['@api', '@setup'] }, () => {
  test('creates and deletes a disposable user via API', async ({ request }, testInfo) => {
    test.skip(
      !canRunApiSetup(),
      'Set API_BASE_URL, API_TOKEN, and TEST_DATA_USER_ENDPOINT to run API setup tests.'
    );

    const client = new ApiClient(request);
    const runMarker = makeRunMarker(testInfo.workerIndex);
    let createdUser: ApiTestUser | undefined;

    const user: Omit<ApiTestUser, 'id'> = {
      email: `musticker-${runMarker}@example.com`,
      password: 'MustickerE2E!2345',
      fullName: `Musticker ${runMarker}`,
      runMarker
    };

    try {
      createdUser = await client.createTestUser(user);

      expect(createdUser.email).toBe(user.email);
      expect(createdUser.runMarker).toBe(runMarker);
      expect(createdUser.id, 'API should return a stable id so cleanup can delete the user.').toBeTruthy();

      testInfo.annotations.push({
        type: 'api-test-user',
        description: JSON.stringify({ id: createdUser.id, email: createdUser.email, runMarker })
      });
    } finally {
      if (createdUser) {
        await client.deleteTestUser(createdUser);
      }
    }
  });
});
