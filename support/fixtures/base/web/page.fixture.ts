import { test as base, Page, Locator } from '@playwright/test';

// Extend the Page interface with our new method
interface CustomPage extends Page {
  switchToFrame(selector: string): Promise<void>;
  switchToMainFrame(): void;
}

// Create custom fixtures type
type CustomFixtures = {
  page: CustomPage;
};

// Extend base test with custom fixtures
export const test = base.extend<CustomFixtures>({
  page: async ({ page }: { page: Page }, use: (r: CustomPage) => Promise<void>) => {
    let currentContext: Page | Locator = page;
    const originalPage = page;

    const customPage = new Proxy(page, {
      get: (target: Page, prop: PropertyKey): unknown => {
        if (prop === 'switchToFrame') {
          return async (selector: string) => {
            const frame = originalPage.frameLocator(selector);
            const htmlElement = frame.locator('html');
            currentContext = htmlElement;
          };
        }

        if (prop === 'switchToMainFrame') {
          return () => {
            currentContext = originalPage;
          };
        }

        // If the property exists in currentContext, return it
        const context = currentContext as unknown as Record<PropertyKey, unknown>;
        if (prop in context) {
          const value = context[prop];
          if (typeof value === 'function') {
            return (...args: unknown[]) => value.apply(currentContext, args);
          }
          return value;
        }

        // Fallback to original page methods
        const original = originalPage as unknown as Record<PropertyKey, unknown>;
        if (prop in original) {
          const value = original[prop];
          if (typeof value === 'function') {
            return (...args: unknown[]) => value.apply(originalPage, args);
          }
          return value;
        }

        return undefined;
      }
    }) as CustomPage;

    await use(customPage);
  }
});

// Export expect from the base test
export const expect = test.expect; 