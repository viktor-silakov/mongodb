import { test, expect } from "@playwright/test";
import { percyScreenshot, percySnapshot } from '@percy/playwright';
import { captureAutomateScreenshot } from '@percy/sdk-utils';
console.log(captureAutomateScreenshot);


// import { percy } from 'browserstack-node-sdk';

// process.env.PERCY_TOKEN = "auto_5b9531b15410147d5cbfecf13f79a4d7e55e4becf5bc4593c21db68cd15def17";
// npx percy exec -- npx browserstack-node-sdk playwright test --config=./playwright-bs.config.js  tests/bs.test.ts 

test("Homepage - Browserstack Demo - 2", async ({ page }, testInfo) => {
    await page.goto("https://www.mongodb.com/");
    // await percyScreenshot(page, "Before clicking resources");
    await percyScreenshot(page, "After clicking resources-22", { fullPage: false, scope: 'a' });



    // const resources = page.getByRole('button', { name: 'Resources' });
    // await resources.click();

    // await expect(page.getByRole('link', { name: 'Atlas Documentation Get Started' })).toBeVisible();
    // // const connectDeveloper = page.locator('#universal-nav').getByRole('list').locator('div').filter({ hasText: 'ConnectDeveloper' }).nth(3);

    // await percyScreenshot(page, "After clicking resources-2", {considerRegionXpaths: '(//a[.="Try Free"])[1]'});
    // await percy.screenshot(page, "After clicking resources-2 percy");
    // await takeSnapshot(page, "After clicking resources", testInfo);
});
