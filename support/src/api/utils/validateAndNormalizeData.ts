export function validateAndNormalizeData<T>(data: T, schema: z.ZodType<T>) {
    const result = schema.safeParse(data);
    if (!result.success) {
      const errorMessage = result.error.issues.map((issue) => 
        `👉 Path: '${issue.path.join('.')}', Message: '${issue.message}'`
      ).join('\n');
      
      console.error('Validation error:\n' + errorMessage);
      throw new Error('Data validation failed:\n' + errorMessage);
    }
    return result.data;
  }
  