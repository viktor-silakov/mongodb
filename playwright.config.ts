import { FixtureApiOptions } from '@fixtures/api.fixture';
import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import { config } from './config';
import { projects } from './playwright-native.config';

const projectRootPath = __dirname

const testDir = defineBddConfig({
    features: ['./features/**/*.feature'],
    steps: [
        './support/fixtures/base/parameter-types.ts',
        './support/step_definitions/**/*',
    ],
    importTestFrom: './support/fixtures/base',
    // examplesTitleFormat: 'Example !!!! #<_index_> - <_name_>'
});

export default defineConfig<FixtureApiOptions>({

    reporter: [
        ['html', { open: "on-failure" }],
        ['list', { printSteps: true }]
    ],
    fullyParallel: true,
    globalSetup: "./support/fixtures/base/global-setup",
    timeout: 60000,
    testDir,
    use: {
        baseURL: config.baseUrl,
        trace: "on",
        locale: process.env.MONGO_TEST_LOCALE || "en-GB",
        screenshot: "only-on-failure",
    },
    projects,
    // more info: https://playwright.dev/docs/api/class-testconfig#test-config-snapshot-path-template
    expect: {
        toMatchAriaSnapshot: {
            pathTemplate: `${projectRootPath}/snapshots/{projectName}/{testFilePath}/{arg}{ext}`,
        },
    },
});