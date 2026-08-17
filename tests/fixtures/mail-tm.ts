// Free, keyless disposable-inbox API (https://docs.mail.tm/) used by full-payment e2e tests to
// solve the checkout's guest-email OTP gate and to read the resulting order-confirmation email.
// No account/API key required -- accounts are created on demand per test run.
const MAIL_TM_BASE_URL = 'https://api.mail.tm';

export type MailTmAccount = {
  address: string;
  token: string;
};

export type MailTmMessage = {
  id: string;
  subject: string;
  text?: string;
  from?: { address?: string };
};

export async function createMailTmAccount(): Promise<MailTmAccount> {
  const domains = await mailTmFetch<{ 'hydra:member': Array<{ domain: string }> }>('/domains');
  const domain = domains['hydra:member'][0]?.domain;
  if (!domain) {
    throw new Error('mail.tm returned no available domains');
  }

  const address = `musticker-e2e-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@${domain}`;
  const password = `E2e-${Math.random().toString(36).slice(2, 10)}!`;

  await mailTmFetch('/accounts', { method: 'POST', body: JSON.stringify({ address, password }) });
  const { token } = await mailTmFetch<{ token: string }>('/token', {
    method: 'POST',
    body: JSON.stringify({ address, password })
  });

  return { address, token };
}

export async function waitForMailTmMessage(
  account: MailTmAccount,
  predicate: (message: MailTmMessage) => boolean,
  timeoutMs = 60_000
): Promise<MailTmMessage> {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const page = await mailTmFetch<{ 'hydra:member': MailTmMessage[] }>('/messages', {
      headers: { Authorization: `Bearer ${account.token}` }
    });

    const match = page['hydra:member'].find(predicate);
    if (match) {
      return mailTmFetch<MailTmMessage>(`/messages/${match.id}`, {
        headers: { Authorization: `Bearer ${account.token}` }
      });
    }

    await new Promise((resolve) => setTimeout(resolve, 3_000));
  }

  throw new Error(`Timed out after ${timeoutMs}ms waiting for a matching mail.tm message`);
}

// The OTP body also contains a "© Copyright 2026" footer, whose year is itself a plausible
// 4-digit match, so candidates that look like a copyright year are skipped rather than relying on
// the OTP happening to appear first in the text.
export function extractOtpCode(message: MailTmMessage): string {
  const source = `${message.text ?? ''} ${message.subject ?? ''}`;
  const candidates = [...source.matchAll(/\b(\d{4})\b/g)].map((match) => match[1]);
  const otp = candidates.find((candidate) => !/^20\d{2}$/.test(candidate));

  if (!otp) {
    throw new Error(`Could not find an OTP code in mail.tm message "${message.subject}"`);
  }

  return otp;
}

// mail.tm is a free, no-SLA service; brief connection-level blips (not HTTP-level error
// responses, which are real API errors and should surface immediately) are retried a few times
// rather than failing the whole test outright.
async function mailTmFetch<T>(path: string, options: RequestInit = {}, attempt = 1): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${MAIL_TM_BASE_URL}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...(options.headers ?? {}) }
    });
  } catch (error) {
    if (attempt >= 3) {
      throw error;
    }

    await new Promise((resolve) => setTimeout(resolve, attempt * 1_000));
    return mailTmFetch<T>(path, options, attempt + 1);
  }

  if (!response.ok) {
    throw new Error(`mail.tm ${path} failed: ${response.status} ${await response.text()}`);
  }

  return response.json() as Promise<T>;
}
