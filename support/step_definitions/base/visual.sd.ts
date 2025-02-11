import { expect } from '@fixtures';
import { Then } from '@fixtures';

Then(
    'the {spec-str} visual snapshot matches {string}',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async ({ page, syngrisi, testData }, locator, name) => {
        await page.waitForTimeout(3000);

        if (locator === 'page') {
            await expect.soft(page).toMatchBaseline(name);
            return;
        }
        if (locator === 'full page') {
            await expect.soft(page).toMatchBaseline(name, { fullPage: true });
            return;
        }
        await expect.soft(page.locator(testData.renderTemplate(locator))).toMatchBaseline(name);

        // await page.waitForTimeout(1000);
    }
);

Then(
    'the {int}{ordinal} {spec-str} visual snapshot matches {string}',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async ({ page, syngrisi, testData }, number, ordinal, locator, name) => {
        await page.waitForTimeout(3000);
        await expect.soft(page.locator(testData.renderTemplate(locator)).nth(number - 1)).toMatchBaseline(name);
    }
);

