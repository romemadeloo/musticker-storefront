import type { Page } from '@playwright/test';

export async function installArtworkUploadBypass(page: Page, runMarker: string): Promise<void> {
  await page.route('**/aws/pre-signed-url**', async (route) => {
    const requestUrl = new URL(route.request().url());
    const extension = extensionForContentType(requestUrl.searchParams.get('image_type'));
    const fileName = `e2e-artwork-${runMarker}-${Date.now()}${extension}`;

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
    await route.fulfill({
      status: 200,
      body: ''
    });
  });
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
