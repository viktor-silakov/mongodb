
import { When } from '@fixtures';
import YAML from "yaml";
import { Verbs } from '@parameter-types';
import { ApiItemType } from '@types';

When(
    'I {verbs} the {word} with:',
    async ({ testData, controllers }, verbs: Verbs, resourceName: ApiItemType, template: string) => {
        const controller = controllers.createController(resourceName)
        const renderedData: Record<string, unknown> = YAML.parse(testData.renderTemplate(template));

        const response =  await controller.create(renderedData);
        const result = {
            url: response.url(),
            statusCode: response.status(),
            statusText: response.statusText(),
            body: await response.json(),
            // headers: JSON.stringify(response.headers(), null, 2),
        }
        console.log('😆😆😆😆', JSON.stringify(result, null, ' '));
        
        testData.set(`${resourceName} Response`, result);
    }
);

