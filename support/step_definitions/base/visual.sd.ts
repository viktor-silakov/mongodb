import { expect } from '@fixtures';
import { Then } from '@fixtures';

// /^the "([^"]*)" visual snapshot matches "([^"]*)"$/,
Then(
    'the {spec-string} visual snapshot matches {string}',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async ({ page, syngrisi, testData }, locator, name) => {
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
