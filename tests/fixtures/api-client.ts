import type { APIRequestContext, APIResponse } from '@playwright/test';

import { env, normalizeBaseURL } from './env';
import type { ApiTestUser } from './types';

type ApiConfig = {
  baseURL: string;
  token: string;
  userEndpoint: string;
  userDeleteEndpoint?: string;
};

type ApiEnvelope = {
  id?: string | number;
  uuid?: string | number;
  data?: {
    id?: string | number;
    uuid?: string | number;
    user?: {
      id?: string | number;
      uuid?: string | number;
    };
  };
  user?: {
    id?: string | number;
    uuid?: string | number;
  };
};

function apiConfig(): ApiConfig {
  if (!env.API_BASE_URL || !env.API_TOKEN || !env.TEST_DATA_USER_ENDPOINT) {
    throw new Error('API_BASE_URL, API_TOKEN, and TEST_DATA_USER_ENDPOINT are required for @api setup tests.');
  }

  return {
    baseURL: env.API_BASE_URL,
    token: env.API_TOKEN,
    userEndpoint: env.TEST_DATA_USER_ENDPOINT,
    userDeleteEndpoint: env.TEST_DATA_USER_DELETE_ENDPOINT
  };
}

function apiURL(baseURL: string, endpoint: string, resourceId?: string): string {
  const endpointWithId = resourceId
    ? endpoint.replace(':id', encodeURIComponent(resourceId)).replace('{id}', encodeURIComponent(resourceId))
    : endpoint;
  const url = new URL(endpointWithId, normalizeBaseURL(baseURL));
  if (resourceId && endpointWithId === endpoint) {
    url.pathname = `${url.pathname.replace(/\/$/, '')}/${encodeURIComponent(resourceId)}`;
  }

  return url.toString();
}

function headers(token: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'X-E2E-Test': 'true'
  };
}

async function assertStatus(response: APIResponse, expectedStatuses: number[], action: string): Promise<void> {
  if (expectedStatuses.includes(response.status())) {
    return;
  }

  throw new Error(`${action} failed with ${response.status()} ${response.url()}: ${await response.text()}`);
}

async function responseJson(response: APIResponse): Promise<ApiEnvelope> {
  try {
    return (await response.json()) as ApiEnvelope;
  } catch {
    return {};
  }
}

function extractId(body: ApiEnvelope): string | undefined {
  const value =
    body.id ??
    body.uuid ??
    body.user?.id ??
    body.user?.uuid ??
    body.data?.id ??
    body.data?.uuid ??
    body.data?.user?.id ??
    body.data?.user?.uuid;

  return value === undefined ? undefined : String(value);
}

export class ApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async createTestUser(user: Omit<ApiTestUser, 'id'>): Promise<ApiTestUser> {
    const config = apiConfig();
    const response = await this.request.post(apiURL(config.baseURL, config.userEndpoint), {
      data: user,
      failOnStatusCode: false,
      headers: headers(config.token)
    });

    await assertStatus(response, [200, 201], 'Create test user');
    const body = await responseJson(response);

    return {
      ...user,
      id: extractId(body)
    };
  }

  async deleteTestUser(user: ApiTestUser): Promise<void> {
    if (!user.id) {
      return;
    }

    const config = apiConfig();
    const endpoint = config.userDeleteEndpoint ?? config.userEndpoint;
    const response = await this.request.delete(apiURL(config.baseURL, endpoint, user.id), {
      failOnStatusCode: false,
      headers: headers(config.token)
    });

    await assertStatus(response, [200, 202, 204, 404], 'Delete test user');
  }
}
