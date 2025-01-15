import { Then } from '@fixtures';
import { expect } from '@playwright/test';
import { generateZodSchema } from '@utils/generateZodSchema';
import { validateSchema } from '@utils';
import { z } from 'zod';
import { TestStore } from '@fixtures/test-data/testData.fixture';

type AssertionFunction = (actual: any, expected: any) => Promise<void>;

const performAssertion = async (
    actualOutput: any,
    expectation: string,
    expectedOutput: any,
): Promise<void> => {

    const assertions: Record<string, AssertionFunction> = {
        'contain': async (actual, expected) => {
            await expect(actual, `Expected value to contain "${expected}"`).toContain(expected);
        },
        'not contain': async (actual, expected) => {
            await expect(actual, `Expected value to not contain "${expected}"`).not.toContain(expected);
        },
        'be equal to': async (actual, expected) => {
            await expect(actual, `Expected value to be equal to "${(expected === "object") ? JSON.stringify(expected) : expected}"`).toStrictEqual(expected);
        },
        'match': async (actual, expected) => {
            await expect(
                actual,
                `Expected value to match "${(expected !== "string") ? JSON.stringify(expected) : expected}"`
            ).toMatchObject(expected);
        }
    };

    const assertionFunction = assertions[expectation as keyof typeof assertions];

    if (!assertionFunction) {
        throw new Error(`Unknown expectation: ${expectation}`);
    }

    await assertionFunction(actualOutput, expectedOutput);
};

const assertStored = async function ({ testData }: { testData: TestStore }, storeKey: string, expectation: string, expectedOutput: string) {
    const actualOutput = testData.get(storeKey);
    await performAssertion(actualOutput, expectation, expectedOutput);
}

const assertStoredObject = async function ({ testData }: { testData: TestStore }, storeKey: string, expectation: string, expectedOutput: string) {
    const actualOutput = testData.get(storeKey);
    const expected = typeof expectedOutput === "object" ? expectedOutput : JSON.parse(expectedOutput);
    await performAssertion(actualOutput, expectation, expected);
}

const assertLastStoredValue = async function ({ testData }: { testData: TestStore }, expectation: string, expectedOutput: string) {
    const lastStoredValue = testData.getValueByIndex(-1);
    await performAssertion(lastStoredValue, expectation, expectedOutput);
}

const assertLastStoredObject = async function ({ testData }: { testData: TestStore }, expectation: string, expectedOutput: string) {
    const lastStoredValue = testData.getValueByIndex(-1);
    const expected = typeof expectedOutput === "object" ? expectedOutput : JSON.parse(expectedOutput);
    await performAssertion(lastStoredValue, expectation, expected);
}

Then(
    /^the last stored text should (contain|not contain|be equal to|match):$/,
    assertLastStoredValue
);

Then(
    /^the last stored object should (be equal to|match):$/,
    assertLastStoredObject
);

Then(
    /^the stored (?:value|text) "([^"]*)" should (contain|not contain|be equal to):$/,
    assertStored
);

Then(
    /^the stored object "([^"]*)" should (be equal to|match):$/,
    assertStoredObject
);

const evaluateViaJS = (fun: string, expected: string, storeValue: unknown) => {

    const clientCode = (0, eval)(fun);
    const result = clientCode.call(globalThis, storeValue);

    const match = expected.match(/^\/(.*)\/([gimsuy]*)$/);

    if (match) {
        return expect(result).toMatch(RegExp(match[1], match[2]));
    }

    expect(result).toEqual(expected);
}

Then(
    "I evaluate the stored value of {string} using JS:", async ({ testData }, name, evaluateStr) => {
        const { fun, expected } = JSON.parse(testData.renderTemplate(evaluateStr));
        const storeValue = testData.get(name);
        evaluateViaJS(fun, expected, storeValue, testData);
    }
);

Then(
    "I evaluate the last stored value using JS:", async ({ testData }, evaluateStr) => {
        const { fun, expected } = JSON.parse(testData.renderTemplate(evaluateStr));
        const lastStoredValue = testData.getValueByIndex(-1);
        console.log(testData.getAlllist());

        evaluateViaJS(fun, expected, lastStoredValue, testData);
    }
);

const evaluateViaJSONSchema = (rawSchema: string, actual: unknown, expectedRawSchema: string) => {
    const textZodSchema = generateZodSchema(expectedRawSchema);
    console.log(textZodSchema);

    const schema = (function (z) {
        return eval(textZodSchema);
    })(z) as z.ZodObject<any>;

    validateSchema(schema.required(), actual)
}

Then(
    'I evaluate the stored object of {string} using JSON schema:',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async ({ page, testData }, objectName, template) => {
        const actualObject = testData.get(objectName);
        const rawSchema = testData.renderTemplate(template);
        evaluateViaJSONSchema(rawSchema, actualObject, template);
    }
);

Then(
    'I evaluate the last stored object using JSON schema:',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async ({ page, testData }, template) => {
        const lastStoredValue = testData.getValueByIndex(-1);
        const rawSchema = testData.renderTemplate(template);
        evaluateViaJSONSchema(rawSchema, lastStoredValue, template);
    }
);
