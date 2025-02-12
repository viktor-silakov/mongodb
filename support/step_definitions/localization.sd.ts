import { When } from '@fixtures';
import { expect, Page } from '@playwright/test';

export const selectLanguage = async (page: Page, language: string) => {
    const languageSelector = page.locator(`//*[@alt="Language Selector Icon"]/..`).first();
    await languageSelector.waitFor({ state: 'visible' });
    await languageSelector.click();

    const languageOption = page.getByRole('option', { name: language }).first();
    await languageOption.waitFor({ state: 'visible' });
    await languageOption.click();
    await languageOption.waitFor({ state: 'hidden' });
}

When('I select the {string} language', async ({ page, testData }, language) => {
    await selectLanguage(page, language);
});

