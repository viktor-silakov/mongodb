import { When, Then } from '@fixtures';
import { expect } from '@playwright/test';

import { normalizeResponseBody } from '@utils/normalizeResponseBody';
import YAML from "yaml";

const addAuthorizationHeader = (headers: Record<string, string>, token?: string) => {
    if (token) {
        if (headers["Authorization"]) {
            headers["Authorization"] = `Bearer ${token}`;
            return
        }
        Object.assign(headers, { "Authorization": token })
    }
};

const performRequest = async (request: any, url: string, method: string, renderedData: any) => {
    console.log({ method, renderedData });

    const response = await request.fetch(url, {
        method,
        ...renderedData
    });

    const status = response.status();
    const headers = response.headers();
    const responseBody = await normalizeResponseBody(response);

    return {
        status,
        headers,
        response: responseBody
    };
};

// Existing step definition for generic requests
When(
    'I send a {word} request to {string} with:',
    async ({ request, testData, apiURL, api }, method, url, data) => {

        const renderedData = YAML.parse(testData.renderTemplate(data));

        renderedData.headers = renderedData.headers ? renderedData.headers : {};

        if (api?.content.token) {
            addAuthorizationHeader(renderedData.headers, api.content.token);
        }

        const fullUrl = url.includes('://') ? url : `${apiURL}${url}`;
        console.log({fullUrl});
        

        const result = await performRequest(request, fullUrl, method, renderedData);

        console.log('👉', JSON.stringify(result, null, '  '));
        testData.set('response', result);
    }
);

When(
    'I send a get request to {string}',
    async ({ request, testData, apiURL, api }, url) => {
        const renderedData = { headers: {} };

        if (api?.content.token) {
            addAuthorizationHeader(renderedData.headers, api.content.token);
        }

        const fullUrl = url.includes('://') ? url : `${apiURL}${url}`;

        const result = await performRequest(request, fullUrl, 'get', renderedData);
        console.log({ fullUrl, renderedData });


        console.log('👉', JSON.stringify(result, null, '  '));
        testData.set('response', result);
    }
);

Then(
    'the response matches:',
    async ({ testData }, data) => {
        const expectedResponse = YAML.parse(testData.renderTemplate(data));
        const response = testData.get('response');
        await expect(response).toMatchObject(expectedResponse);
    }
);