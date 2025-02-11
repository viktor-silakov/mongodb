import { When } from '@fixtures';
import { expect } from '@playwright/test';

export const acceptCookies = async (page: Page) => {
    const acceptCookiesButton = page.locator('#onetrust-accept-btn-handler');
    await acceptCookiesButton.waitFor({ state: 'visible' });
    await acceptCookiesButton.click();
    await acceptCookiesButton.waitFor({ state: 'hidden' });
}

When('I accept site cookies', async ({ page, testData }, locale) => {
    await acceptCookies(page);
});

When('I take a {string} snapshot of the page', async ({ page, testData }, snapshotNameTemplate) => {
    const snapshotName = testData.renderTemplate(snapshotNameTemplate);
    await expect(page.locator('body')).toMatchAriaSnapshot({ name: snapshotName });
});
