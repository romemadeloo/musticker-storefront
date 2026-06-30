import type { Page, Route } from '@playwright/test';

export async function installArtworkUploadBypass(page: Page, runMarker: string): Promise<void> {
  const uploadedArtwork = new Map<string, StoredArtwork>();
  const generatedFileNames = new Set<string>();

  await page.route('**/*', async (route) => {
    const request = route.request();
    const method = request.method().toUpperCase();

    if (!['GET', 'HEAD'].includes(method) || request.resourceType() !== 'image') {
      await route.fallback();
      return;
    }

    const matchingFileName = fileNameFromUrl(request.url(), generatedFileNames);
    if (!matchingFileName) {
      await route.fallback();
      return;
    }

    await fulfillArtwork(route, matchingFileName, uploadedArtwork);
  });

  await page.route('**/aws/pre-signed-url**', async (route) => {
    const requestUrl = new URL(route.request().url());
    const extension = extensionForContentType(requestUrl.searchParams.get('image_type'));
    const fileName = `e2e-artwork-${runMarker}-${Date.now()}${extension}`;
    generatedFileNames.add(fileName);

    await route.fulfill({
      contentType: 'application/json',
      status: 200,
      body: JSON.stringify({
        success: true,
        message: 'E2E presigned upload URL generated.',
        data: {
          presigned_url: `https://dev.musticker.com/__e2e__/s3/${fileName}`,
          file_name: fileName
        },
        meta: null
      })
    });
  });

  await page.route('**/__e2e__/s3/**', async (route) => {
    const request = route.request();
    const fileName = decodeURIComponent(new URL(request.url()).pathname.split('/').pop() ?? '');
    const method = request.method().toUpperCase();

    if (method === 'OPTIONS') {
      await route.fulfill({
        status: 204,
        headers: corsHeaders()
      });
      return;
    }

    if (['PUT', 'POST'].includes(method)) {
      const requestBody = request.postDataBuffer();
      const body = requestBody?.byteLength ? requestBody : fallbackPng();
      const contentType = request.headers()['content-type'] ?? contentTypeForExtension(fileName);

      uploadedArtwork.set(fileName, {
        body,
        contentType
      });

      await route.fulfill({
        status: 200,
        headers: corsHeaders()
      });
      return;
    }

    await fulfillArtwork(route, fileName, uploadedArtwork);
  });
}

type StoredArtwork = {
  body: Buffer;
  contentType: string;
};

function fileNameFromUrl(url: string, generatedFileNames: Set<string>): string | undefined {
  const decodedUrl = decodeURIComponent(url);

  for (const fileName of generatedFileNames) {
    if (decodedUrl.includes(fileName)) {
      return fileName;
    }
  }

  return undefined;
}

async function fulfillArtwork(
  route: Route,
  fileName: string,
  uploadedArtwork: Map<string, StoredArtwork>
): Promise<void> {
  const artwork = uploadedArtwork.get(fileName) ?? {
    body: fallbackPng(),
    contentType: contentTypeForExtension(fileName)
  };

  if (route.request().method().toUpperCase() === 'HEAD') {
    await route.fulfill({
      status: 200,
      headers: {
        ...corsHeaders(),
        'content-type': artwork.contentType,
        'content-length': String(artwork.body.byteLength)
      }
    });
    return;
  }

  await route.fulfill({
    status: 200,
    contentType: artwork.contentType,
    headers: corsHeaders(),
    body: artwork.body
  });
}

function corsHeaders(): Record<string, string> {
  return {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET,HEAD,PUT,POST,OPTIONS',
    'access-control-allow-headers': '*'
  };
}

function contentTypeForExtension(fileName: string): string {
  const extension = fileName.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'pdf':
      return 'application/pdf';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    default:
      return 'application/octet-stream';
  }
}

function fallbackPng(): Buffer {
  return Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=',
    'base64'
  );
}

function extensionForContentType(contentType: string | null): string {
  switch (contentType) {
    case 'application/pdf':
      return '.pdf';
    case 'image/png':
      return '.png';
    case 'image/jpeg':
      return '.jpg';
    default:
      return '.bin';
  }
}
