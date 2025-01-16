import { FixtureApiOptions } from '@fixtures/api.fixture';
import { defineConfig } from '@playwright/test';


export default defineConfig<FixtureApiOptions>({
    testDir: './tests',
    reporter: [['html', { open: "on-failure" }]],
    globalSetup: "./support/fixtures/base/global-setup",
    timeout: 60000,
    use: {
        // baseURL: 'http://localhost:5173/',
        trace: "on",
    }
});