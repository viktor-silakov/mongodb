
import { expect, Page } from '@playwright/test';
import { test } from '@fixtures';
import { projectRootPath } from '@config';

const locales = [
    'English',
    'Português',
    'Español',
    '한국어',
    '日本語',
    'Italiano',
    'Deutsch',
    'Français',
    '简体中文',
];

export const selectLanguage = async (page: Page, language: string) => {
    const languageSelector = page.locator(`//*[@alt="Language Selector Icon"]/..`).first();
    await languageSelector.waitFor({ state: 'visible' });
    await languageSelector.click();

    const languageOption = page.getByRole('option', { name: language }).first();
    await languageOption.waitFor({ state: 'visible' });
    await languageOption.click();
    await languageOption.waitFor({ state: 'hidden' });
}

test.describe('Localization - retention of language on browser storage', async () => {
    for (const locale of locales) {
        test(`Check browser storage retention of language - ${locale} @localization @TC-713 @desktop-only`,
            async ({ browser }) => {
                // 1st context
                const context = await browser.newContext({
                    locale: locale,
                });
                const page = await context.newPage();

                await page.goto('/');
                await selectLanguage(page, locale);
                await expect(page.locator('body')).toMatchAriaSnapshot({ name: `Body - ${locale}` });
                await context.storageState({ path: `${projectRootPath}/playwright/storage-state/localization-${locale}.json` });
                await context.close().catch(() => { });

                // 2nd context
                const context2 = await browser.newContext({
                    storageState: `${projectRootPath}/playwright/storage-state/localization-${locale}.json`,
                });
                const page2 = await context2.newPage();

                await page2.goto('/');
                await expect(page2.locator('body')).toMatchAriaSnapshot({ name: `Body - ${locale}` });
                await context2.close().catch(() => { });
            });
    }
});

