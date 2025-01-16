/* eslint-disable @typescript-eslint/no-explicit-any */
// import { test as base } from './syngrisi.config';
import { test as baseTest } from "playwright-bdd";
import { TestInfo } from "@playwright/test";
import { constants } from "./constants";
import test from "node:test";


type GetValueFunc = (item: string) => any;

export type DataGenerator = ReturnType<typeof createDataGenerator>;

function createDataGenerator({ testInfo }: { testInfo: TestInfo }) {
    return {
        generateEmail(prefix: string = 'user', domain: string = 'example.com'): string {
            const randomString = Math.random().toString(36).substring(2, 8);
            return `${prefix}${randomString}@${domain}`;
        },
        generateDate(format: string = 'YYYY-MM-DD'): string {
            const date = new Date();
            return format
                .replace('YYYY', date.getFullYear().toString())
                .replace('MM', (date.getMonth() + 1).toString().padStart(2, '0'))
                .replace('DD', date.getDate().toString().padStart(2, '0'));
        },
        generateNumber(min: number, max: number): number {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        repeat(text: string, count: number): string { return text.repeat(count) },
        baseUrl(): string {
            return String(testInfo.project.use.baseURL)
        },
        constant(value: string): string { return constants[value] }
    };
}

function parseGeneratorParams(paramsString: string): any[] {
    if (!paramsString.trim()) return [];
    return paramsString.split(',').map(param => {
        const trimmed = param.trim();
        if (trimmed === 'true') return true;
        if (trimmed === 'false') return false;
        if (trimmed === 'null') return null;
        if (!isNaN(Number(trimmed))) return Number(trimmed);
        return trimmed.replace(/^["'](.*)["']$/, '$1'); // Remove quotes if present
    });
}
/**
 * Replaces placeholders in a given string with values provided by one or more functions.
 *
 * @param {string} input - The input string containing placeholders in the format <item>, <item.property>, or <item[params]>.
 * @param {GetValueFunc|GetValueFunc[]} getValueFuncs - A single function or an array of functions that take an item name as an argument and return a value for replacement or `undefined` if the item is not found.
 * @returns {string} - The resulting string with all placeholders replaced by corresponding values.
 *
 * @callback GetValueFunc
 * @param {string} item - The item name extracted from the placeholder.
 * @returns {string|function|undefined} - The value to replace the placeholder with, a function to generate the value, or `undefined` if the item is not found.
 *
 * @example
 * // Define a function that returns values for placeholders
 * function getValue(item) {
 *   const values = {
 *     name: "Alice",
 *     day: "Monday"
 *   };
 *   return values[item];
 * }
 *
 * // Input string with placeholders
 * const input = "Hello, <name>! Today is <day>.";
 *
 * // Replace placeholders using the getValue function
 * const result = replacePlaceholders(input, getValue);
 * console.log(result); // "Hello, Alice! Today is Monday."
 *
 * @example
 * // Define multiple functions to get values for placeholders
 * function getValueFromFirstSource(item) {
 *   const values = {
 *     name: "Bob"
 *   };
 *   return values[item];
 * }
 *
 * function getValueFromSecondSource(item) {
 *   const values = {
 *     day: "Tuesday"
 *   };
 *   return values[item];
 * }
 *
 * // Input string with placeholders
 * const input = "Hello, <name>! Today is <day>.";
 *
 * // Replace placeholders using an array of functions
 * const result = replacePlaceholders(input, [getValueFromFirstSource, getValueFromSecondSource]);
 * console.log(result); // "Hello, Bob! Today is Tuesday."
 *
 * @example
 * // Define a function that returns values and another function for dynamic values
 * function getValue(item) {
 *   const values = {
 *     greeting: "Hello",
 *     date: (format) => {
 *       const date = new Date();
 *       return format === "short" ? date.toLocaleDateString() : date.toDateString();
 *     }
 *   };
 *   return values[item];
 * }
 *
 * // Input string with placeholders and parameters
 * const input = "<greeting>, the date today is <date[short]>.";
 *
 * // Replace placeholders using the getValue function
 * const result = replacePlaceholders(input, getValue);
 * console.log(result); // "Hello, the date today is 7/30/2024."
 *
 * @example
 * // Define a function to parse generator parameters
 * function parseGeneratorParams(params) {
 *   return params.split(',');
 * }
 *
 * // Function that returns a value based on item and parameters
 * function getValue(item) {
 *   const values = {
 *     repeat: (text, count) => text.repeat(count)
 *   };
 *   return values[item];
 * }
 *
 * // Input string with placeholders and parameters
 * const input = "Repeat: <repeat[hello,3]>.";
 *
 * // Replace placeholders using the getValue function
 * const result = replacePlaceholders(input, getValue);
 * console.log(result); // "Repeat: hellohellohello."
 *
 * @example
 * // Define an object with nested properties
 * const testData = {
 *   user: { name: "Alice", email: "alice@example.com" }
 * };
 *
 * // Function that returns values for placeholders including nested properties
 * function getValue(item) {
 *   const parts = item.split('.');
 *   let value = testData;
 *   for (const part of parts) {
 *     value = value[part];
 *     if (value === undefined) break;
 *   }
 *   return value;
 * }
 *
 * // Input string with placeholders for nested properties
 * const input = "User object: <user>, User name: <user.name>, User email: <user.email>";
 *
 * // Replace placeholders using the getValue function
 * const result = replacePlaceholders(input, getValue);
 * console.log(result); // "User object: [object Object], User name: Alice, User email: alice@example.com"
 */
function replacePlaceholders(input: string, getValueFuncs: GetValueFunc | GetValueFunc[]): string {
    const funcs = Array.isArray(getValueFuncs) ? getValueFuncs : [getValueFuncs];

    return input.replace(/<([\w\s.]+)(?:\[(.*?)\])?>/g, (match, item, params) => {
        const itemParts = item.trim().split('.');
        let itemValue;

        for (const func of funcs) {
            let currentValue = func(itemParts[0]);
            if (currentValue !== undefined) {
                for (let i = 1; i < itemParts.length; i++) {
                    currentValue = currentValue[itemParts[i]];
                    if (currentValue === undefined) break;
                }
                itemValue = currentValue;
            }
            if (itemValue !== undefined) break;
        }

        if (itemValue === undefined) {
            return match; // Return original placeholder if item not found
        }

        if (typeof itemValue === 'function') {
            const args = params ? parseGeneratorParams(params) : [];
            return String(itemValue(...args));
        }

        return String(itemValue);
    });
}

export class TestStore {
    private testData: Record<string, any> = {};
    private dataGenerator: DataGenerator;
    private valuesList: any[] = [];

    constructor({ testInfo }: { testInfo: TestInfo }) {
        this.dataGenerator = createDataGenerator({ testInfo });
    }

    get(prop: string): any {
        return this.testData[prop];
    }

    getValueByIndex(index: number): any {
        if (index < 0) {
            return this.valuesList[this.valuesList.length + index];
        } else {
            return this.valuesList[index];
        }
    }

    setJsonOrString(prop: string, value: string): void {
        try {
            const parsedValue = JSON.parse(value);
            this.testData[prop] = parsedValue;
            this.valuesList.push(parsedValue);
        } catch (e) {
            // console.error('Cannot parse as JSON', e);

            this.testData[prop] = value;
            this.valuesList.push(value);
        }
    }

    set(prop: string, value: any): void {
        this.testData[prop] = value;
        this.valuesList.push(value);
    }

    clear(prop: string): void {
        delete this.testData[prop];
    }

    clearAll(): void {
        this.testData = {};
        this.valuesList = [];
    }
    getAlllist(): any[] {
        return this.valuesList;
    }
    getAll(): Record<string, any> {
        return { ...this.testData };
    }

    renderTemplate(input: string): string {
        return replacePlaceholders(input, [
            (item) => this.get(item), // stored data
            (item) => (this.dataGenerator as any)[item], // generators
            (item) => (constants)[item], // constants
        ]);
    }
}

export type FixturesTestDataType = { testData: TestStore };

export const testData = baseTest.extend<FixturesTestDataType>({
    // eslint-disable-next-line no-empty-pattern
    testData: async ({ }, use, testInfo) => {

        const testData = new TestStore({ testInfo });
        await use(testData);
    },
});