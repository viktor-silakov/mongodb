import { FixtureApiOptions } from '@fixtures/api.fixture';
import { defineConfig } from '@playwright/test';
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
    testDir,
    reporter: [
        ['html', { open: "on-failure" }],
        ['list', { printSteps: true }]
            ],
    globalSetup: "./support/fixtures/base/global-setup",
    timeout: 60000,
    use: {
        // baseURL: '',
        trace: "on",
        apiURL: backendBaseURL,
    },
    // webServer,
});