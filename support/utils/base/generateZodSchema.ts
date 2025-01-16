import jsonSchemaToZod from "json-schema-to-zod";
import { z } from 'zod';


export function generateZodSchema(rawSchema: string) {
    const textSchema = `
    {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "type": "object",
        "properties": ${rawSchema}
    }
    `;
    return jsonSchemaToZod(JSON.parse(textSchema));
}