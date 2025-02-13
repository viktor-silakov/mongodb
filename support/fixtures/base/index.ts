import { mergeTests } from '@playwright/test';
import { test as syngrisi } from './syngrisi/syngrisi.fixture';
import { TestStore, testData } from './test-data/testData.fixture';
import { createBdd } from 'playwright-bdd';
import { PlaywrightDriver } from '@syngrisi/playwright-sdk';
import { test as controllers } from "./controllers";
import { ControllerFactory } from 'support/src/api/controllers/controller.factory';
import { AuthResponse, FixtureApiOptions, api } from './api.fixture';
import { test as testManager } from './test-manager/test-manager.fixture';
import { test as page } from './web/page.fixture';
import { Page } from '@playwright/test';
export { expect } from '@fixtures/syngrisi/syngrisi.fixture'

export const test = mergeTests(syngrisi, testData, controllers, api, testManager, page);

export const { Given, When, Then } = createBdd<FixtureApiOptions & {
    page: Page,
    testData: TestStore
    syngrisi: PlaywrightDriver,
    controllers: ControllerFactory,
    api: AuthResponse
}>();

