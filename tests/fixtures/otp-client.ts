import type { APIRequestContext } from '@playwright/test';

import { env, normalizeBaseURL } from './env.js';

type OtpEnvelope = {
  message?: string;
  code?: string | number;
  otp?: string | number;
  data?: {
    code?: string | number;
    otp?: string | number;
  };
};

function registrationOtpUrl(email: string): string {
  const endpointTemplate = env.REGISTRATION_OTP_ENDPOINT;
  const endpoint = endpointTemplate.replace('{email}', encodeURIComponent(email));
  let resolvedUrl: string;

  try {
    resolvedUrl = new URL(endpoint).toString();
  } catch {
    if (!env.API_BASE_URL) {
      throw new Error('API_BASE_URL is required when REGISTRATION_OTP_ENDPOINT is a relative path.');
    }

    resolvedUrl = new URL(endpoint, normalizeBaseURL(env.API_BASE_URL)).toString();
  }

  if (!endpointTemplate.includes('{email}') && env.REGISTRATION_OTP_METHOD.toUpperCase() === 'GET') {
    const url = new URL(resolvedUrl);
    url.searchParams.set('email', email);
    return url.toString();
  }

  return resolvedUrl;
}

function otpHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Request-From': env.REGISTRATION_OTP_REQUEST_FROM,
    'X-E2E-Test': 'true'
  };

  if (env.API_TOKEN) {
    headers.Authorization = `Bearer ${env.API_TOKEN}`;
  }

  return headers;
}

function extractOtp(body: OtpEnvelope): string | undefined {
  const code = body.code ?? body.otp ?? body.data?.code ?? body.data?.otp;
  return code === undefined ? undefined : String(code);
}

export async function fetchRegistrationOtp(request: APIRequestContext, email: string): Promise<string> {
  const response = await request.fetch(registrationOtpUrl(email), {
    data: { email },
    failOnStatusCode: false,
    headers: otpHeaders(),
    method: env.REGISTRATION_OTP_METHOD
  });

  if (!response.ok()) {
    throw new Error(`Fetch registration OTP failed with ${response.status()} ${response.url()}: ${await response.text()}`);
  }

  const body = (await response.json()) as OtpEnvelope;
  const otp = extractOtp(body);

  if (!otp) {
    throw new Error(
      `Registration OTP response did not include code, otp, data.code, or data.otp. Response: ${JSON.stringify(body)}`
    );
  }

  return otp;
}
