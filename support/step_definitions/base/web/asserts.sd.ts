import { expect, Page, ElementHandle } from '@playwright/test';
import { Then, When } from '@fixtures';
import { ElementRole, Assertion, ElementAttribute, Conditions } from '@parameter-types';
import { getLocator, executeAssertion } from '@utils';
import { сonditionsRegexp } from "@parameter-types";
import { TestStore } from '@fixtures/test-data/testData.fixture';

Then('the {string} {role} should have text {string}', async ({ page }, name, role, expectedText) => {
    const element = page.getByRole(role, { name });
    await expect(element).toHaveText(expectedText);
});

/**
 * Asserts element state
 * @example 
 * - Then the element with test-id "viewport-element" should be in viewport
 * - Then the button with name "Submit" should be visible
 */
Then(
    'the {role} with {attribute} {string} should {assert}',
    async (
        { page }: { page: Page },
        role: ElementRole,
        attribute: string,
        value: string,
        assert: Assertion
    ) => {
        const element = getLocator({ page, role, attribute, value });
        await executeAssertion({ assert, element, options: { timeout: 5000 } });
    });

/**
 * Asserts element values
 * @example:
 * - Then the element with test-id "input-field" should have value "expectedValue"
 * - Then the button with name "Submit" should not have text "Submit"
 */
Then(
    'the {role} with {attribute} {string} should {assert} {string}',
    async (
        { page }: { page: Page },
        role: ElementRole,
        attribute: string,
        value: string,
        assert: Assertion,
        expectedValue: string
    ) => {
        const element = getLocator({ page, role, attribute, value });
        const options = { timeout: 5000 };
        await executeAssertion({ assert, element, expectedValue, options });
    });


function getConditionCallback(condition: Conditions) {
    if (!сonditionsRegexp.test(condition)) {
        throw new Error(`Invalid condition: ${condition}`);
    }

    const conditionsCallbacks = {
        "are visible": async (element: ElementHandle<Node>) => await element.isVisible(),
        //   "are visible in viewport": async (element: Locator) => await element.isVisible() && await element.isInViewport(),
        "are present": async (element: ElementHandle<Node>) => element
    };

    return conditionsCallbacks[condition as keyof typeof conditionsCallbacks];
}

// // Функция для фильтрации элементов в соответствии с условием
// async function filterElements({ page: Page, role: ElementRole, attribute: ElementAttribute, value: string, condition: Conditions }) {
//     const conditionCallback = getConditionCallback(condition);

//     const elements = await getLocator({ page, role, attribute, value }).elementHandles();

//     const filteredElements = await Promise.all(elements.map(async (element) => {
//         if (await conditionCallback(element)) {
//             return element;
//         }
//         return null;
//     }));

//     return filteredElements.filter(element => element !== null);
// }


/**
* Asserts the count of elements in a certain state
* @example
* - Then there should be 3 buttons with name "Submit" that are visible
* - Then there should be 2 elements with test-id "input-field" that are in viewport
*/
Then(
    'there should be {int} {role} with {attribute} {string} that {condition}',
    async (
        { page }: { page: Page },
        count: number,
        role: ElementRole,
        attribute: ElementAttribute,
        value: string,
        condition: Conditions
    ) => {
        const elements = await getLocator({ page, role, attribute, value }).elementHandles();

        const conditionCallback = getConditionCallback(condition);

        const filteredElements = Array.from(await Promise.all(
            elements.map(async (element) => {
                if (await conditionCallback(element)) {
                    return element;
                }
                return null;
            })
        )).filter(x => x !== null);

        const elementCount = filteredElements.length

        if (elementCount !== count) {
            throw new Error(`Expected ${count} elements, but found ${elementCount}`);
        }
    }
);

Then(
    'the {role} with {attribute} {string} should have attribute {string}',
    async (
        { page }: { page: Page },
        role: ElementRole,
        attribute: string,
        value: string,
        expectedAttribute: string,
    ) => {
        const element = getLocator({ page, role, attribute, value });
        await expect(element).toHaveAttribute(expectedAttribute, { timeout: 5000 });
    });

Then(
    'the {role} with {attribute} {string} should have attribute {string} to equal {string}',
    async (
        { page }: { page: Page },
        role: ElementRole,
        attribute: string,
        value: string,
        expectedAttribute: string,
        expectedValue: string
    ) => {
        const element = getLocator({ page, role, attribute, value });

        await expect(element).toHaveAttribute(expectedAttribute, expectedValue, { timeout: 5000 });
    });


Then(
    'the {role} with {attribute} {string} should have CSS {string} to equal {string}',
    async (
        { page }: { page: Page },
        role: ElementRole,
        attribute: string,
        value: string,
        expectedAttribute: string,
        expectedValue: string
    ) => {
        const element = getLocator({ page, role, attribute, value });

        await expect.poll(async () => {
            return await element.evaluate((el, cssProperty) => {
                const computedStyles = window.getComputedStyle(el);
                return computedStyles.getPropertyValue(cssProperty);
            }, expectedAttribute);
        }, {
            message: 'wrong computed style element attribute',
            timeout: 5000,
        }).toBe(expectedValue);
        // expect(element).toHaveCSS(expectedAttribute, new RegExp(expectedValue));
    });


// Navigation
Then('the page title should{negate} be {pattern}', async ({ page }, negate, expectedTitle) => {
    if (negate === 'not') {
        await expect(page).not.toHaveTitle(expectedTitle)
        return;
    }
    await expect(page).toHaveTitle(expectedTitle)
});


// Waiters
When(
    'I wait {int} seconds for the {role} with {attribute} {string} to {assert}',
    async (
        { page, testData }: { page: Page, testData: TestStore },
        timeoutInSeconds: number,
        role: ElementRole,
        attribute: ElementAttribute,
        value: string,
        assert: Assertion,
    ) => {
        const element = getLocator({ page, role, attribute, value: testData.renderTemplate(value) }).first();
        await executeAssertion({ assert, element, options: { timeout: timeoutInSeconds * 1000 } });
    }
);

Then('I wait {int} seconds for the {role} with {attribute} {string} to {assert} {string}', async (
    { page }: { page: Page },
    timeoutInSeconds: number,
    role: ElementRole,
    attribute: ElementAttribute,
    value: string,
    assert: Assertion,
    expectedValue: string
) => {
    const element = getLocator({ page, role, attribute, value });
    await executeAssertion({ assert, element, expectedValue, options: { timeout: timeoutInSeconds * 1000 } });
}
);

Then('the url should be {pattern}',
    async ({ page }, url) => {
        await expect(page).toHaveURL(url)
    }
)