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

test.describe('Localization ', async () => {
    for (const locale of locales) {
        test(`open page in browser's current language - ${locale} @localization @TC-714`,
            async ({ browser }) => {
                const context = await browser.newContext({
                    locale: locale,
                    userAgent: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Locale/${locale}`
                });
                const page = await context.newPage();

                await page.goto('/products/platform/atlas-app-services');
                // await acceptCookies(page);
                await expect(page.locator('body')).toMatchAriaSnapshot({ name: `Body - ${locale}` });

                await context.close();
            });
    }
});

