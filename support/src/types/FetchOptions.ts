/**
 * see {@link APIRequestContext.fetch} 
 */

import { ReadStream } from "fs";

 
export interface FetchOptions {
    data?: string | Buffer | unknown;
    failOnStatusCode?: boolean;
    form?: { [key: string]: string | number | boolean };
    headers?: { [key: string]: string };
    ignoreHTTPSErrors?: boolean;
    maxRedirects?: number;
    method?: string;
    multipart?: FormData | {
      [key: string]: string | number | boolean | ReadStream | {
        name: string;
        mimeType: string;
        buffer: Buffer;
      };
    };
    params?: { [key: string]: string | number | boolean };
    timeout?: number;
  }
