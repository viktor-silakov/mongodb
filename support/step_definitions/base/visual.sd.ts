import { expect } from '@fixtures';
import { Then } from '@fixtures';

Then(
    /^the "([^"]*)" visual snapshot (to match|matches) "([^"]*)"$/,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async ({ page, syngrisi, testData }, locator, _, name) => {
        if (locator === 'page') {
            await expect.soft(page).toMatchBaseline(name);
            return;
        }
        if (locator === 'full page') {
            await expect.soft(page).toMatchBaseline(name, { fullPage: true });
            return;
        }
        await expect.soft(page.locator(testData.renderTemplate(locator))).toMatchBaseline(name);

        await page.waitForTimeout(1000);
    }
);
