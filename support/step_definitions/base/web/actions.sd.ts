import { Locator, Page, BrowserContext } from '@playwright/test';
import { When } from '@fixtures';
import { ElementAttribute, ElementRole, StepActions } from '@parameter-types';
import { getLocator } from '@utils';
import path from 'node:path';
import { log } from 'node:console';

type ActionsParams = {
    element: Locator,
    text?: string,
    options?: { timeout?: number }
}
type ActionCallback = (
    { element, text, options }: ActionsParams

) => Promise<void> | Promise<Array<string>>

/**
* Record of actions that can be performed on elements.
* @type {Record<StepActions, ActionCallback>}
*/
const actions: Record<StepActions, ActionCallback> = {
    check: async ({ element, options }) => await element.check(options),
    uncheck: async ({ element, options }) => await element.uncheck(options),
    click: async ({ element, options }) => await element.click(options),
    focus: async ({ element, options }) => await element.focus(options),
    hover: async ({ element, options }) => await element.hover(options),
    scroll: async ({ element, options }) => await element.scrollIntoViewIfNeeded(options),
    fill: async ({ element, text, options }) => await element.fill(text!, options),
    type: async ({ element, text, options }) => await element.pressSequentially(text!, options),
    press: async ({ element, text, options }) => await element.press(text!, { ...options, delay: 500 }),
    select: async ({ element, text, options }) => await element.selectOption({ label: text }, options),
};

/**
 * Get the action callback based on the action type.
 * @param {StepActions} action - The action to perform.
 * @returns {ActionCallback} The action callback.
 * @throws {Error} Throws an error if the action is unsupported.
 */
function getAction(action: StepActions): ActionCallback {
    const selectedAction = actions[action];
    if (!selectedAction) {
        throw new Error(`Unsupported action: ${action}`);
    }
    return selectedAction;
}


// Navigation 
When(/I open (?:url|site) "(.*)"/, async ({ page }, url) => {
    const context = page.context();
    await context.setExtraHTTPHeaders({
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
    });

    // const initScript = () => {
    //     // Override the navigator.webdriver property
    //     Object.defineProperty(navigator, 'webdriver', {
    //         get: () => undefined
    //     });

    //     // Mock languages
    //     Object.defineProperty(navigator, 'languages', {
    //         get: () => ['zh-CN', 'zh', 'en', 'zh-TW', 'ja']
    //     });

    //     // Mock plugins
    //     Object.defineProperty(navigator, 'plugins', {
    //         get: () => [0, 1, 2, 3, 4]
    //     });

    //     // Mock mime types
    //     Object.defineProperty(navigator, 'mimeTypes', {
    //         get: () => [0, 1, 2, 3, 4]
    //     });

    //     // Mock WebGL
    //     const getParameter = WebGLRenderingContext.getParameter;
    //     WebGLRenderingContext.prototype.getParameter = (parameter) => {
    //         if (parameter === 37445) {
    //             return 'Intel Open Source Technology Center';
    //         }
    //         if (parameter === 37446) {
    //             return 'Mesa DRI Intel(R) Ivybridge Mobile ';
    //         }
    //         return getParameter(parameter);
    //     };

    //     // Mock Chrome info
    //     // Object.defineProperty(window, 'chrome', {
    //     //     get: () => ({
    //     //         "app": {
    //     //             "isInstalled": false,
    //     //             "InstallState": { "DISABLED": "disabled", "INSTALLED": "installed", "NOT_INSTALLED": "not_installed" },
    //     //             "RunningState": { "CANNOT_RUN": "cannot_run", "READY_TO_RUN": "ready_to_run", "RUNNING": "running" }
    //     //         },
    //     //         "runtime": {
    //     //             "OnInstalledReason": {
    //     //                 "CHROME_UPDATE": "chrome_update",
    //     //                 "INSTALL": "install",
    //     //                 "SHARED_MODULE_UPDATE": "shared_module_update",
    //     //                 "UPDATE": "update"
    //     //             },
    //     //             "OnRestartRequiredReason": {
    //     //                 "APP_UPDATE": "app_update",
    //     //                 "OS_UPDATE": "os_update",
    //     //                 "PERIODIC": "periodic"
    //     //             },
    //     //             "PlatformArch": {
    //     //                 "ARM": "arm",
    //     //                 "ARM64": "arm64",
    //     //                 "MIPS": "mips",
    //     //                 "MIPS64": "mips64",
    //     //                 "X86_32": "x86-32",
    //     //                 "X86_64": "x86-64"
    //     //             },
    //     //             "PlatformNaclArch": {
    //     //                 "ARM": "arm",
    //     //                 "MIPS": "mips",
    //     //                 "MIPS64": "mips64",
    //     //                 "X86_32": "x86-32",
    //     //                 "X86_64": "x86-64"
    //     //             },
    //     //             "PlatformOs": {
    //     //                 "ANDROID": "android",
    //     //                 "CROS": "cros",
    //     //                 "LINUX": "linux",
    //     //                 "MAC": "mac",
    //     //                 "OPENBSD": "openbsd",
    //     //                 "WIN": "win"
    //     //             },
    //     //             "RequestUpdateCheckStatus": {
    //     //                 "NO_UPDATE": "no_update",
    //     //                 "THROTTLED": "throttled",
    //     //                 "UPDATE_AVAILABLE": "update_available"
    //     //             }
    //     //         }
    //     //     })
    //     // });

    //     // Override permissions API
    //     const originalQuery = window.navigator.permissions.query;
    //     window.navigator.permissions.query = (parameters) =>
    //         parameters.name === 'notifications'
    //             ? Promise.resolve({ state: Notification.permission })
    //             : originalQuery(parameters);

    //     // Remove Playwright-specific properties
    //     delete (window as any).__playwright;
    //     delete (window as any).__pw_manual;
    //     delete (window as any).__PW_inspect;

    //     // Override app version
    //     Object.defineProperty(navigator, 'appVersion', {
    //         get: () => '5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
    //     });
    // }

    // await context.addInitScript(initScript);

    // page.on('frameattached', async (frame) => {
    //     try {
    //         console.log('frameattached', frame);
    //         await frame.evaluate(initScript);
    //     } catch (e) {
    //         console.error('Error injecting script into iframe:', e);
    //     }
    // });

    await page.goto(url);
});

When('I go back', async ({ page }) => {
    await page.goBack();
});

When('I go forward', async ({ page }) => {
    await page.goForward();
});

When('I refresh the page', async ({ page }) => {
    await page.reload();
});


// Interactions with web page

// 👉 Actions with 4 params
/**
 * Click by element
 * @example:
 * - find element by role: When I click on the heading with name "Heading role"
 * - find element by attribute: And the element with role "alertdialog" should not be visible 
 */
When('I {action} on the {role} with {attribute} {spec-string}', async ({ page, testData }, action, role, attribute, value) => {
    const element = getLocator({ page, role, attribute, value: testData.renderTemplate(value) });
    const performAction = getAction(action);
    await performAction({ element, options: { timeout: 5000 } });
});

// 👉 Actions with 5 params
/**
 * Common step definition for interacting with elements on the page.
 * 
 * @param {Object} params - The parameters object.
 * @param {Page} params.page - The Playwright page object.
 * @param {StepActions} action - The action to perform (fill, type, click, select, check, uncheck).
 * @param {ElementRole} role - The role of the element (button, input, select, textarea, checkbox, radio).
 * @param {string} attribute - The attribute to locate the element by (e.g., id, name, placeholder, etc.).
 * @param {string} value - The value of the attribute to locate the element.
 * @param {string} text - The text to use for the action (e.g., text to fill or type, label to select).
 * @param {Object} [options] - Optional parameters for the action.
 * @param {number} [options.timeout] - The timeout for the action.
 *
 * @example
 * // Fill
 * When I fill the input with placeholder "Enter your name" with "John Doe"
 * 
 * // Type
 * When I type the textarea with id "description" with "This is a test description"
 * 
 * // Select
 * When I select the select with name "country" with "United States"
 * 
 * // Check
 * When I check the checkbox with label "I agree to the terms and conditions"
 * 
 * // Uncheck
 * When I uncheck the checkbox with label "Subscribe to newsletter"
 */
When(
    'I {action} the {role} with {attribute} {string} with {string}',
    async (
        { page, testData },
        action: StepActions,
        role: ElementRole,
        attribute: ElementAttribute,
        value: string,
        text: string,
    ) => {
        const element = getLocator({ page, role, attribute, value: testData.renderTemplate(value) });
        const performAction = getAction(action);
        await performAction({ element, text, options: { timeout: 5000 } });
    });


When(
    'I upload the {string} file for the {role} with {attribute} {string}',
    async (
        { page, testData },
        action: StepActions,
        role: ElementRole,
        attribute: ElementAttribute,
        value: string,
        text: string,
    ) => {
        const element = getLocator({ page, role, attribute, value: testData.renderTemplate(value) });
        const filePath = path.join(__dirname, 'test-data', 'hello.txt');
        await element.setInputFiles(filePath);
    });

When(
    'I drag the {role} with {attribute} {string} and drop it on the {role} with {attribute} {string}',
    async (
        { page, testData },
        sourceRole: ElementRole,
        sourceAttribute: ElementAttribute,
        sourceValue: string,
        targetRole: ElementRole,
        targetAttribute: ElementAttribute,
        targetValue: string,
    ) => {
        const sourceElement = getLocator({ page, role: sourceRole, attribute: sourceAttribute, value: testData.renderTemplate(sourceValue) });
        const targetElement = getLocator({ page, role: targetRole, attribute: targetAttribute, value: testData.renderTemplate(targetValue) });
        await sourceElement.dragTo(targetElement);
    }
);

// OTHER 
When('I execute javascript:', async ({ page, testData }, code) => {
    const result = await page.evaluate(code);
    testData.set('javascript', result);
});

When('I wait for {int} seconds', async ({ page }, seconds) => {
    await page.waitForTimeout(seconds * 1000);
});

When('I pause the test execution', async ({ page }) => {
    if (process.env.CI) return
    await page.pause();
});

// 👉 Iframe interactions
When('I switch to the iframe with selector {string}', async ({ page, testData }, templateStr: string) => {
    const selector = testData.renderTemplate(templateStr);
    await page.switchToFrame(selector);
});

When('I switch back to the main content', async ({ page }) => {
    page.switchToMainFrame();
});

// dialogs
When('I setup accept the dialog event', async ({ page }) => {
    page.once('dialog', async dialog => {
        await dialog.accept();
    });
});

When('I setup dismiss the dialog event', async ({ page }) => {
    page.once('dialog', async dialog => {
        await dialog.dismiss();
    });
});

When('I setup accept the dialog event with text {string}', async ({ page }, dialogText) => {
    page.once('dialog', async dialog => {
        await dialog.accept(dialogText);
    });
});

// windows
When('I set the browser window size to {int} by {int}', async ({ page }, width: number, height: number) => {
    await page.setViewportSize({ width, height });
});

When('I switch to the tab with title containing {string}', async ({ context }, partialTitle: string) => {
    const pages = context.pages();
    for (let i = 0; i < pages.length; i++) {
        if ((await pages[i].title()).includes(partialTitle)) {
            await pages[i].bringToFront();
            return;
        }
    }
    throw new Error(`No tab found with title containing: ${partialTitle}`);
});

// browser storages
type StorageHandler = {
    set: (page: Page, key: string, value: string, domain?: string) => Promise<void>;
    get: (page: Page, key: string, value?: string, domain?: string) => Promise<string | void>;
    delete: (page: Page, key: string, value?: string, domain?: string) => Promise<void>;
};

const storageHandlers: Record<string, StorageHandler> = {
    localStorage: {
        set: (page, key, value) => page.evaluate(({ key, value }) => localStorage.setItem(key, value), { key, value }),
        get: async (page, key) => page.evaluate(key => localStorage.getItem(key), key),
        delete: (page, key) => page.evaluate(key => localStorage.removeItem(key), key),
    },
    sessionStorage: {
        set: (page, key, value) => page.evaluate(({ key, value }) => sessionStorage.setItem(key, value), { key, value }),
        get: async (page, key) => page.evaluate(key => sessionStorage.getItem(key), key),
        delete: (page, key) => page.evaluate(key => sessionStorage.removeItem(key), key),
    },
    cookie: {
        set: async (context, key, value, domain) => {
            await (context as BrowserContext).addCookies([{ name: key, value, domain, path: '/' }]);
        },
        get: async (context, key) => {
            const cookies = await (context as BrowserContext).cookies();
            const cookie = cookies.find(cookie => cookie.name === key);
            if (!cookie) throw new Error(`Cookie with name ${key} not found`);
            return cookie.value;
        },
        delete: async (context, key, domain) => {
            await (context as BrowserContext).clearCookies([{ name: key, domain, path: '/' }]);
        },
    }
};

When('I {word} {word} storage with key {string} and value {string}',
    async (
        { page, context, testData },
        action: 'set' | 'get' | 'delete',
        storageType: 'localStorage' | 'sessionStorage' | 'cookie',
        key: string,
        value?: string
    ) => {
        const handler = storageHandlers[storageType][action];
        const domain = storageType === 'cookie' ? await page.evaluate(() => document.domain) : undefined;
        const result = await handler(storageType === 'cookie' ? context : page, key, value, domain);


        if (action === 'set') testData.set(storageType, value);


        if (action === 'get' && result !== value) {
            throw new Error(`Expected ${storageType} storage value to be ${value}, but got ${result}`);
        }
    });

// When('I delete (localStorage|sessionStorage|cookie) storage with key {string}',
When('I delete {word} storage with key {string}',
    async (
        { page, context },
        storageType: 'localStorage' | 'sessionStorage' | 'cookie',
        key: string,
        // value?: string
    ) => {
        const handler = storageHandlers[storageType]['delete'];
        const domain = storageType === 'cookie' ? await page.evaluate(() => document.domain) : undefined;
        await handler(storageType === 'cookie' ? context : page, key, domain);
    });

When('I clear all cookies', async ({ page }) => {
    await page.context().clearCookies();
});

When('I hide the {role} with {attribute} {string}', async ({ page, testData }, role, attribute, value) => {
    const element = getLocator({ page, role, attribute, value: testData.renderTemplate(value) });
    await page.evaluate((el) => {
        el.style.opacity = '0';
    }, await element.elementHandle());
});

