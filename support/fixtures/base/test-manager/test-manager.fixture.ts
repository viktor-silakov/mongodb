import { test as base, TestInfo } from '@playwright/test';
import os from 'os';

export const test = base.extend<{ testManager: null }>({
    testManager: [async ({ }, use, testInfo: TestInfo) => {

        const tags = testInfo.annotations.map(a => a.type);

        if (testInfo.status === 'failed') {
            throw new Error(testInfo.error?.message || 'Test failed with empty error message');
        }
        if (tags.includes('@no-linux') && os.platform() === 'linux') {
            testInfo.skip(true, 'Test skipped: not supported on Linux');
            return;
        }

        await use(null);

    }, { auto: true, scope: 'test' }]
}); 