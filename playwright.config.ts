import { FixtureApiOptions } from '@fixtures/api.fixture';
import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import { config } from './config';

export const backendBaseURL = 'http://localhost:8088/';
// const webServer = [
//     {
//         command: 'npm run test-app-ui',
//         url: 'http://localhost:5173/',
//         reuseExistingServer: !process.env.CI,
//         stdout: 'ignore',
//         stderr: 'pipe',
//     },
//     {
//         command: 'npm run test-app-api',
//         url: backendBaseURL,
//         reuseExistingServer: !process.env.CI,
//         stdout: 'ignore',
//         stderr: 'pipe',
//     },
// ]

const testDir = defineBddConfig({
    features: ['./features/**/*.feature'],
    steps: [
        './support/fixtures/base/parameter-types.ts',
        './support/step_definitions/**/*',
    ],
    importTestFrom: './support/fixtures/base',
});

export default defineConfig<FixtureApiOptions>({
    
    reporter: [
        ['html', { open: "on-failure" }],
        ['list', { printSteps: true }]
            ],
    globalSetup: "./support/fixtures/base/global-setup",
    timeout: 60000,
    use: {
        baseURL: config.baseUrl,
        trace: "on",
        apiURL: backendBaseURL,
    },
    // webServer,
    projects: [
        {
            name: 'share-login-info',
            testDir: './tests/setup',
            testMatch: 'share-login-info.test.ts',
            
        },
        {
            name: 'chromium',
            use: {
              ...devices['Desktop Chrome'],
              storageState: 'playwright/.auth/user.json',
              viewport: { width: 1440, height: 900 },
            },
            dependencies: ['share-login-info'],
            testDir
          },
    ]
});