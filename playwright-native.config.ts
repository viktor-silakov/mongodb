import { FixtureApiOptions } from '@fixtures/api.fixture';
import { defineConfig, devices } from '@playwright/test';
import { config } from './config';


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
    },
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
            testDir: './tests',
          },
    ]
});