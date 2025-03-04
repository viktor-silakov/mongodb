import {
    log,
    waitUntil
} from '@syngrisi/playwright-sdk/dist/lib/utils';

import { scrollToBottom, scrollToTop } from './scroll.utils';

import hasha from 'hasha';

import {
    Locator,
    LocatorScreenshotOptions,
    Page,
    PageScreenshotOptions,
    request,
} from '@playwright/test';
import { PlaywrightDriver } from '@syngrisi/playwright-sdk';
import { config } from '../syngrisi.config';
import { CheckResult } from '../syngrisi.fixture';

const getLastBaseline = async (page: Page, name: string, syngrisi: PlaywrightDriver) => {
    return (await syngrisi.getBaselines({ params: { name } }))?.results[0] || null
}

const getSnapshotById = async (page: Page, _id: string, syngrisi: PlaywrightDriver) => {
    return (await syngrisi.getSnapshots({ params: { _id } }))?.results[0] || null
}

export async function waitForBaselineWithRightSnapshotExists(
    name: string,
    page: Page,
    pwObj: Page | Locator,
    syngrisi: PlaywrightDriver,
    options?: PageScreenshotOptions | LocatorScreenshotOptions,
) {
    if (options && ('fullPage' in options) && (options.fullPage !== undefined)) {
        // needed for the lazy loading
        await scrollToBottom(page)
        await scrollToTop(page)
        await page.waitForLoadState('load');
    }

    let imageBuffer: Buffer;
    const lastBaseline = await getLastBaseline(page, name, syngrisi);

    if (!lastBaseline) {
        const newBaselineTimeout = 7000;
        log.warn(`Baseline not found, assume this is a first snapshot, wait for: ${newBaselineTimeout}`)
        // await page.waitForLoadState('load');
        await page.waitForTimeout(newBaselineTimeout)
        // return await getScreenshot(pwObj, options)
    }
    // const snapshot = await getSnapshotById(page, lastBaseline.snapshotId, syngrisi);


    // const resultBuffer = await waitUntil(async (attempt) => {
    //     imageBuffer = await getScreenshot(pwObj, options)
    //     const baselineSnapshot = await getSnapshotById(page, lastBaseline.snapshotId, syngrisi)
    //     const actualHash = hasha(imageBuffer)
    //     // console.log('baselineSnapshot :', baselineSnapshot.imghash)
    //     // console.log('actualHash       :', actualHash)
    //     if (baselineSnapshot.imghash === actualHash) {
    //         log.info(`✅ #${attempt} hashes are equal`);
    //         return imageBuffer;
    //     } else {
    //         log.info(`#${attempt} hashes aren't equal`);
    //         return false
    //     }
    // }, { attempts: 0, timeout: 2000, interval: 10 })

    // return resultBuffer || await getScreenshot(pwObj, options)
    return getScreenshot(pwObj, options)
}

const getScreenshot = async (
    pwObj: Page | Locator,
    options?: PageScreenshotOptions | LocatorScreenshotOptions
) => ('context' in pwObj) ? pwObj.screenshot(options) : pwObj.screenshot(options)

export const getPageFromPwObject = (pwObj: Page | Locator) => ('context' in pwObj) ? pwObj : pwObj.page()
export function generateCheckLink(checkId: string): string {
    return `🔗 ${config.baseUrl}?checkId=${checkId}&modalIsOpen=true`;
}

export async function attachSnapshotsToTestInfo(result: any, testInfo: any) {
    if (result?.diffSnapshot?.filename) {
        const context = await request.newContext();
        const getSnapshotBuffer = async (id: string) => (await context.get(snapshotUrl(id))).body();

        await testInfo.attach(`${testInfo.title}-actual.png`, {
            body: await getSnapshotBuffer(result.currentSnapshot?.filename),
            contentType: 'image/png'
        });
        await testInfo.attach(`${testInfo.title}-expected.png`, {
            body: await getSnapshotBuffer(result.expectedSnapshot?.filename),
            contentType: 'image/png'
        });
        await testInfo.attach(`${testInfo.title}-diff.png`, {
            body: await getSnapshotBuffer(result.diffSnapshot?.filename),
            contentType: 'image/png'
        });
        await context.dispose();
        testInfo.annotations.push({
            type: 'Syngrisi link',
            description: generateCheckLink(result._id)
        });
    }
}
export function generateCheckResult(result: any, checkName: string, checkLink: string): CheckResult {
    const success = !result.status.includes('failed');
    if (success) {
        return {
            message: () => `Check: '${checkName}' - success\n ${checkLink}`,
            pass: true,
        };
    }

    const compareResult = JSON.parse(result.result || '{}');
    const errMessage = `❌ Check: '${checkName}' - failed to compare snapshots, reasons: ${JSON.stringify(result.failReasons)}\n${checkLink}\n${(result.result && Object.keys(compareResult).length) !== 0 ? JSON.stringify(compareResult, null, '  ') : ''}`;

    return {
        message: () => errMessage,
        pass: false,
        name: 'toMatchBaseline',
        expected: 0,
        actual: result
    };
}
export function snapshotUrl(filename: string): string {
    return `${config.baseUrl}snapshoots/${filename}`;
}

