import { test as setup, expect } from '../support/fixtures/base';
import path from 'path';
import { config } from '../config';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('Shared authentication', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Select Password.').click();

  await page.locator('#input72').fill(config.password!);

  await page.getByRole('button', { name: 'Verify' }).click();

  await page.locator('[alt="MongoDB logo"]').first().waitFor({ state: 'attached' });
  // await page.getByText('Signing in...').waitFor({ state: 'detached', timeout: 15000 });

  const domain = await page.evaluate(() => document.domain);

  await page.context().addCookies([
    {
      name: 'OptanonConsent',
      value: 'isGpcEnabled%3D0%26browserGpcFlag%3D0%26isIABGlobal%3Dfalse%26hosts%3D%26landingPath%3DNotLandingPage%26groups%3DC0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A1%2CC0005%3A1%26geolocation%3DDE%3BHE%26AwaitingReconsent%3Dfalse',
      domain,
      path: '/',
    },
    {
      name: 'OptanonAlertBoxClosed',
      value: '2025-01-15T13:37:31.350Z',
      domain,
      path: '/',
    },
  ]);

  await page.context().storageState({ path: authFile });
});