import {
    expect as baseExpect,
    Expect,
    Locator,
    LocatorScreenshotOptions,
    Page,
    PageScreenshotOptions
} from '@playwright/test';

import { test as baseTest, createBdd } from "playwright-bdd";

import { PlaywrightDriver } from '@syngrisi/playwright-sdk';
import {
    getSuiteTitle,
    getTestTitle,
    log,
} from '@syngrisi/playwright-sdk/dist/lib/utils';
import { config } from './syngrisi.config';
import {
    getBrowserFullVersion,
    getBrowserVersion,
    getOS,
    getViewport
} from '@syngrisi/playwright-sdk/dist/lib/pwHelpers';
import { attachSnapshotsToTestInfo, generateCheckLink, generateCheckResult, getPageFromPwObject, waitForBaselineWithRightSnapshotExists } from './utils/syngrisi.utils';

export type CheckResult = {
    message: () => string;
    pass: boolean;
    name?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expected?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    actual?: any;
};

type ToMatchBaseline = (
    pwObj: Page | Locator,
    checkName: string,
    options?: PageScreenshotOptions | LocatorScreenshotOptions
) => Promise<CheckResult>;

export let expect: Expect<{ toMatchBaseline: ToMatchBaseline }>;

// console.log('👉 Init syngrisi test fixture...');

export const test = baseTest.extend<{ syngrisi: PlaywrightDriver }>({


    syngrisi: async ({ page }, use, testInfo) => {

        const syngrisi = new PlaywrightDriver({
            page,
            url: config.baseUrl,
            apiKey: config.apiKey,
        });

        await syngrisi.startTestSession({
            params: {
                app: config.project,
                branch: config.branch,
                test: getTestTitle(testInfo),
                run: config.runName ?? 'unknown',
                runident: config.runIdent ?? 'unknown',
                suite: getSuiteTitle(testInfo) ?? 'unknown',
            }
        });

        expect = baseExpect.extend({
            async toMatchBaseline(pwObj: Page | Locator, checkName: string, options?: PageScreenshotOptions | LocatorScreenshotOptions) {
                try {
                    const page: Page = getPageFromPwObject(pwObj);
                    const browser = page.context().browser();

                    await page.waitForLoadState('load', { timeout: 20000 });
                    const screenshot = await waitForBaselineWithRightSnapshotExists(checkName, page, pwObj, syngrisi, options);
                    const viewportSize = page.viewportSize();
                    if (!viewportSize) throw new Error('Cannot get viewport size');

                    const browserVersion = browser?.version();
                    if (!browserVersion) throw new Error('Cannot get browser version');

                    const result = await syngrisi.check({
                        checkName,
                        imageBuffer: screenshot,
                        params: {
                            viewport: await getViewport(viewportSize),
                            os: await getOS(page),
                            browserVersion: getBrowserVersion(browserVersion),
                            browserFullVersion: getBrowserFullVersion(browserVersion),
                        }
                    });

                    await attachSnapshotsToTestInfo(result, testInfo);

                    const checkLink = generateCheckLink(result._id);

                    if (result?.status.includes('new')) {
                        log.warn(`⚠️ Please note that your check: '${result.name}' has a "new" status. Please review it and accept if everything is okay, otherwise try increasing the timeout and run it again.`);
                        log.warn(checkLink);
                    }

                    return generateCheckResult(result, checkName, checkLink);
                } catch (e: unknown) {
                    log.error('❌ ' + ((e instanceof Error) ? e.stack : e));
                    throw e;
                }
            },
        });

        await use(syngrisi);
        await syngrisi.stopTestSession();
    },
});


export const { Given, When, Then } = createBdd(test);
