import { test as base } from "playwright-bdd";

import { ControllerFactory } from '../../src/api/controllers/controller.factory';

type Fixtures = {
  controllers: ControllerFactory;
};

export const test = base.extend<Fixtures>({
    controllers: async ({ request }, use) => {
    const controllers = new ControllerFactory(request);
    await use(controllers);
  }
});

export { expect } from '@playwright/test';
