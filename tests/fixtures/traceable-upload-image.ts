import fs from 'node:fs/promises';
import path from 'node:path';

import type { Page, TestInfo } from '@playwright/test';
import { expect } from '@playwright/test';

type TraceableUploadImageOptions = {
  purpose: 'PROFILE UPLOAD' | 'ARTWORK UPLOAD';
  subject: string;
  runMarker: string;
  title?: string;
  showSubject?: boolean;
  email?: string;
  categoryName?: string;
  sequence?: number;
  timestamp?: Date;
};

export async function createTraceableUploadPng(
  page: Page,
  testInfo: TestInfo,
  options: TraceableUploadImageOptions
): Promise<string> {
  const timestamp = options.timestamp ?? new Date();
  const date = formatDate(timestamp);
  const time = formatTime(timestamp);
  const fileName = traceableUploadFileName(options);
  const filePath = path.join(testInfo.outputPath('traceable-uploads'), fileName);

  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await page.setContent(renderTraceableUploadHtml({ ...options, date, time }), {
    waitUntil: 'domcontentloaded'
  });

  const image = page.getByTestId('traceable-upload-image');
  await expect(image).toBeVisible();
  await image.screenshot({ path: filePath });
  await testInfo.attach(fileName, {
    path: filePath,
    contentType: 'image/png'
  });

  return filePath;
}

function renderTraceableUploadHtml(
  options: TraceableUploadImageOptions & {
    date: string;
    time: string;
  }
): string {
  const details = [
    `TYPE: ${options.purpose}`,
    options.categoryName ? `CATEGORY: ${options.categoryName}` : undefined,
    options.sequence ? `FILE: ${String(options.sequence).padStart(2, '0')}` : undefined,
    `DATE: ${options.date}`,
    `TIME: ${options.time} PHT`,
    `RUN: ${options.runMarker}`,
    options.email ? `EMAIL: ${options.email}` : undefined
  ].filter((detail): detail is string => Boolean(detail));
  const title = options.title ?? options.purpose;
  const showSubject = options.showSubject ?? true;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <style>
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: start;
        background: #f7f7f7;
        font-family: Arial, Helvetica, sans-serif;
      }

      [data-testid="traceable-upload-image"] {
        width: 800px;
        height: 800px;
        padding: 72px 64px 56px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 24px;
        overflow: hidden;
        background: #f4e84c;
        color: #050505;
      }

      .brand {
        font-size: 28px;
        font-weight: 800;
        letter-spacing: 0;
      }

      .purpose {
        max-width: 680px;
        font-size: 66px;
        line-height: 0.95;
        font-weight: 900;
        letter-spacing: 0;
        text-align: center;
        overflow-wrap: anywhere;
        white-space: pre-line;
      }

      .subject {
        max-width: 680px;
        font-size: 48px;
        line-height: 1.02;
        font-weight: 900;
        letter-spacing: 0;
        text-align: center;
        overflow-wrap: anywhere;
      }

      .details {
        width: 100%;
        display: grid;
        gap: 6px;
        padding-top: 6px;
        font-size: 22px;
        line-height: 1.15;
        font-weight: 700;
        letter-spacing: 0;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <main data-testid="traceable-upload-image">
      <div class="brand">MUSTICKER E2E</div>
      <div class="purpose">${escapeHtml(title)}</div>
      ${showSubject ? `<div class="subject">${escapeHtml(options.subject)}</div>` : ''}
      <div class="details">
        ${details.map((detail) => `<div>${escapeHtml(detail)}</div>`).join('\n        ')}
      </div>
    </main>
  </body>
</html>`;
}

function traceableUploadFileName(options: TraceableUploadImageOptions): string {
  const prefix = options.sequence ? `${String(options.sequence).padStart(2, '0')}-` : '';

  return `${prefix}${slug(options.purpose)}-${slug(options.subject)}-${slug(options.runMarker)}.png`;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Manila',
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  }).format(date);
}

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Manila',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(date);
}

function slug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export async function createUnsupportedUploadFile(testInfo: TestInfo, runMarker: string): Promise<string> {
  const fileName = `unsupported-upload-${slug(runMarker)}.txt`;
  const filePath = path.join(testInfo.outputPath('traceable-uploads'), fileName);

  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `Unsupported upload generated for ${runMarker}\n`, 'utf8');
  await testInfo.attach(fileName, {
    path: filePath,
    contentType: 'text/plain'
  });

  return filePath;
}
