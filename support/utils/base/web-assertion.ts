import { Locator, expect } from '@playwright/test';

import { Assertion } from '@parameter-types';

/**
 * Record of assertions that can be performed on elements.
 * @type {Record<Assertion, AssertionFunction>}
 */
const assertions: Record<Assertion, AssertionFunction> = {
    // Assertions with no expectedValue
    'be present': async ({ element, options }) => await expect(element).toBeAttached(options),
    'not be present': async ({ element, options }) => await expect(element).not.toBeAttached(options),
    'be visible': async ({ element, options }) => await expect(element).toBeVisible(options),
    'not be visible': async ({ element, options }) => await expect(element).toBeHidden(options),
    'be in viewport': async ({ element, options }) => await expect(element).toBeInViewport(options),
    'not be in viewport': async ({ element, options }) => await expect(element).not.toBeInViewport(options),
    'be focused': async ({ element, options }) => await expect(element).toBeFocused(options),
    'not be focused': async ({ element, options }) => await expect(element).not.toBeFocused(options),
    'be enabled': async ({ element, options }) => await expect(element).toBeEnabled(options),
    'not be enabled': async ({ element, options }) => await expect(element).toBeDisabled(options),
    'be editable': async ({ element, options }) => await expect(element).toBeEditable(options),
    'not be editable': async ({ element, options }) => await expect(element).not.toBeEditable(options),
    'be checked': async ({ element, options }) => await expect(element).toBeChecked(options),
    'not be checked': async ({ element, options }) => await expect(element).not.toBeChecked(options),

    // Assertions with expectedValue
    'have value': async ({ element, expectedValue, options }) => await expect(element).toHaveValue(expectedValue!, options),
    'not have value': async ({ element, expectedValue, options }) => await expect(element).not.toHaveValue(expectedValue!, options),
    'have text': async ({ element, expectedValue, options }) => await expect(element).toHaveText(expectedValue!, options),
    'not have text': async ({ element, expectedValue, options }) => await expect(element).not.toHaveText(expectedValue!, options),
    'contain text': async ({ element, expectedValue, options }) => await expect(element).toContainText(expectedValue!, options),
    'not contain text': async ({ element, expectedValue, options }) => await expect(element).not.toContainText(expectedValue!, options)
};

type AssertionParams = {
    assert: Assertion,
    element: Locator,
    expectedValue?: string,
    options?: AssertionOptions
}

export const getAssertion = async (
    {
        assert,
        element,
        expectedValue,
        options
    }: AssertionParams
) => {
    const performAssertion = assertions[assert];
    if (!performAssertion) {
        throw new Error(`Unknown assertion: ${assert}`);
    }
    await performAssertion({ element, expectedValue, options });
};



interface AssertionOptions {
    timeout?: number;
    [key: string]: unknown;
}

type AssertionFunction = ({ element, expectedValue, options }: { element: Locator, expectedValue?: string, options?: AssertionOptions }) => Promise<void>;


/**
 * Retrieves the assertion function based on the provided assertion type.
 * @param {Assertion} assert - The type of assertion to perform.
 * @returns {AssertionFunction | undefined} - The corresponding assertion function.
 */
export const getAssertionFunction = (assert: Assertion): AssertionFunction | undefined => {
    return assertions[assert];
};

/**
 * Executes the specified assertion on the given element.
 * @param {AssertionParams} params - The parameters for the assertion.
 * @throws Will throw an error if the assertion type is unknown.
 */
export const executeAssertion = async (
    {
        assert,
        element,
        expectedValue,
        options
    }: AssertionParams
) => {
    const performAssertion = getAssertionFunction(assert);
    if (!performAssertion) {
        throw new Error(`Unknown assertion: ${assert}`);
    }
    await performAssertion({ element, expectedValue, options });
};