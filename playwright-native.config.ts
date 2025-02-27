import { FixtureApiOptions } from '@fixtures/api.fixture';
import { defineConfig, devices } from '@playwright/test';
import { config, projectRootPath } from '@config';
import os from 'os';

export const projects = [
    {
        name: 'share-login-info',
        testDir: './support/global-setup',
        testMatch: 'share-login-info.test.ts',
    },
    {
        name: 'chrome',
        use: {
            ...devices['Desktop Chrome'],
            storageState: 'playwright/.auth/user.json',
            viewport: { width: 1440, height: 900 },
        },
        dependencies: ['share-login-info'],
        channel: 'chrome',
    },
    {
        name: 'firefox',
        use: {
            ...devices['Desktop Firefox'],
            storageState: 'playwright/.auth/user.json',
            viewport: { width: 1440, height: 900 },
        },
        dependencies: ['share-login-info']
    },
    {
        name: 'galaxy',
        use: {
            ...devices['Galaxy S24 Ultra'],
            storageState: 'playwright/.auth/user.json',
        },
        dependencies: ['share-login-info'],
    },
    {
        name: 'ipad',
        use: {
            ...devices['iPad (gen 9)'],
            storageState: 'playwright/.auth/user.json',
        },
        dependencies: ['share-login-info'],
    },
    {
        name: 'iphone',
        use: {
            ...devices['iPhone 16'],
            storageState: 'playwright/.auth/user.json',
        },
        dependencies: ['share-login-info'],
    },
]

export const baseConfig = {
    reporter: [
        ['html', { open: "on-failure" }],
        ['list', { printSteps: true }],
        [
            'blob',
            {
                open: 'never',
                outputFile: `./${process.env.BLOB_REPORT_PATH || 'blob-report'}/${process.env.BLOB_REPORT_NAME || 'report'}-${os.platform()}.zip`,
            },
        ],
        // ["allure-playwright"]
    ],
    fullyParallel: true,
    testDir: './tests',
    globalSetup: "./support/fixtures/base/global-setup",
    timeout: 60000,
    projects,
    use: {
        baseURL: config.baseUrl,
        trace: "on",
        screenshot: "only-on-failure",
    },
    expect: {
        toMatchAriaSnapshot: {
            pathTemplate: `${projectRootPath}/snapshots/{projectName}/{testFilePath}/{arg}{ext}`,
        },
    },
};

export default defineConfig<FixtureApiOptions>(baseConfig);