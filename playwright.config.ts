import { FixtureApiOptions } from '@fixtures/api.fixture';
import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import { baseConfig } from './playwright-native.config';

const testDir = defineBddConfig({
    features: ['./features/**/*.feature'],
    steps: [
        './support/fixtures/base/parameter-types.ts',
        './support/step_definitions/**/*',
    ],
    importTestFrom: './support/fixtures/base',
});

console.log('testDir -->', testDir);
const config = { ...baseConfig, testDir }

export default defineConfig<FixtureApiOptions>(config);