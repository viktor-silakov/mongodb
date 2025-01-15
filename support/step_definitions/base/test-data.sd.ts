import { Then, When } from '@fixtures';
import YAML from 'yaml';

When(
    'I store the {string} as:',
    ({ testData }, name: string, value: string) => {
        testData.setJsonOrString(name, value);
    }
)

Then(
    "I render the {string} template:", async ({ testData }, name, templateStr) => {
        const renderedString = testData.renderTemplate(templateStr);
        testData.set(name, renderedString);
        console.log('testData >>>', testData.getAll())
        console.log('Render >>', renderedString);
    }
);

When('I map page locators', ({testData}, yamlStr) => {
    const renderedString = YAML.parse(yamlStr);
    for (const [key, value] of Object.entries(renderedString)) {
        // console.log('🔥', key, value);
        testData.set(key, value);
    }
});