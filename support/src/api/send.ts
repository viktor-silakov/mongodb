import { APIRequestContext } from '@playwright/test';
import { APIResponse } from 'playwright-core';
import { FetchOptions } from '../types/FetchOptions';

export const send = (request: APIRequestContext, url: string, options?: FetchOptions): Promise<APIResponse> => {
    console.log({ url, options });

    return request.fetch(url, options);
}