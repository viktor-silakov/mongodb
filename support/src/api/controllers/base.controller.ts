import { APIRequestContext } from '@playwright/test';
// import { backendBaseURL } from '@pw-config';
import { send } from '../send';
import { validateAndNormalizeData } from '../utils';

export class BaseController {
    request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    baseUrl(path: string): string {
        return `${backendBaseURL}${path}`;
    }

    async createResource(resourcePath: string, data: any, schema: any) {
        const validatedData = validateAndNormalizeData(data, schema);
        
        try {
            const result = await send(this.request, this.baseUrl(resourcePath), {
                method: 'post',
                data: validatedData,
            });
            return result;
        } catch (error) {
            console.error('Error creating resource:', error);
            throw error;
        }
    }

    async getAllResources(resourcePath: string) {
        try {
            const result = await send(this.request, this.baseUrl(resourcePath), {
                method: 'get',
            });
            return result;
        } catch (error) {
            console.error('Error fetching resources:', error);
            throw error;
        }
    }

    async updateResource(resourcePath: string, data: any, schema: any) {
        const validatedData = validateAndNormalizeData(data, schema);
        
        try {
            const result = await send(this.request, this.baseUrl(resourcePath), {
                method: 'put',
                data: validatedData,
            });
            return result;
        } catch (error) {
            console.error('Error updating resource:', error);
            throw error;
        }
    }

    async partialUpdateResource(resourcePath: string, data: any, schema: any) {
        const validatedData = validateAndNormalizeData(data, schema);
        
        try {
            const result = await send(this.request, this.baseUrl(resourcePath), {
                method: 'patch',
                data: validatedData,
            });
            return result;
        } catch (error) {
            console.error('Error partially updating resource:', error);
            throw error;
        }
    }

    async deleteResource(resourcePath: string, id: number) {
        try {
            const result = await send(this.request, this.baseUrl(resourcePath), {
                method: 'delete',
                data: { id },
            });
            return result;
        } catch (error) {
            console.error('Error deleting resource:', error);
            throw error;
        }
    }
}
