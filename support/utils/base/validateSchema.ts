import { z } from "zod";
export function validateSchema<T>(schema: z.ZodType<T>, data: unknown): T {
    try {
        return schema.parse(data);
    } catch (e) {
        if (e instanceof z.ZodError) {
            const errorMessages = e.errors.map(error => {
                const path = error.path.join('.');
                const actualValue = getActualValue(data, error.path);
                return `Path: '${path}', Issue: '${error.message}', Actual: '${actualValue}'`;
            }).join('\n');

            throw new Error(`Validation Error:\n${errorMessages}`);
        } else {
            throw e;
        }
    }

    function getActualValue(data: unknown, path: (string | number)[]): string {
        let currentValue = data;
        for (const key of path) {
            if (currentValue && typeof currentValue === 'object' && key in currentValue) {
                currentValue = (currentValue as any)[key];
            } else {
                return 'undefined';
            }
        }
        return JSON.stringify(currentValue);
    }
}
