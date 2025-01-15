import { test, expect, takeSnapshot } from "@chromatic-com/playwright";

// npx playwright test -c playwright-chromatic.config.ts tests/chromatic-demo.test.ts --headed
// npx chromatic --playwright --project-token=chpt_2588d94ac9f2e61 --debug --force-rebuild
test.use({ disableAutoSnapshot: true });
test("Homepage - Chromatic Demo", async ({ page }, testInfo) => {
    await page.goto("https://www.mongodb.com/");
    await page.waitForTimeout(3000);

    await takeSnapshot(page, "Before clicking resources", testInfo);
    const resources = page.getByRole('button', { name: 'Resources' });
    await resources.click();
    // await page.pause();

    await expect(page.getByRole('link', { name: 'Atlas Documentation Get Started' })).toBeVisible();
    await page.waitForTimeout(2000);
    await takeSnapshot(page, "After clicking resources", testInfo);
    await page.waitForTimeout(2000);
    await takeSnapshot(page, "After clicking resources - 2", testInfo);
});