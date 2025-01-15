import { APIResponse } from '@playwright/test';

export async function normalizeResponseBody(response: APIResponse): Promise<string | object> {
    const text = await response.text();
    try {
        return JSON.parse(text);
    } catch (error) {
        return text;
    }
}
