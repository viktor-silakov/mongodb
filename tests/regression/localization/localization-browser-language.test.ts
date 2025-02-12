import { expect } from '@playwright/test';
import { test } from '@fixtures';

const locales = [
    'en-US',  // English (United States)
    'pt-BR',  // Portuguese (Brazil)
    'es',  // Spanish (Spain)
    'ko-KR',  // Korean
    'ja-JP',  // Japanese
    'it-IT',  // Italian
    'de-DE',  // German
    'fr-FR',  // French
    'zh-CN',  // Chinese (Simplified)
];

test.describe('Localization - browser language', async () => {
    for (const locale of locales) {
        test(`Check browser language - ${locale} @localization @TC-714 @all-browsers`,
            async ({ browser }) => {
                const context = await browser.newContext({
                    locale: locale,
                });
                const page = await context.newPage();

                await page.goto('/products/platform/atlas-app-services');
                // await acceptCookies(page);
                await expect(page.locator('body')).toMatchAriaSnapshot({ name: `Body - ${locale}` });

                await context.close().catch(() => {
                    // ignore
                });
            });
    }
});

