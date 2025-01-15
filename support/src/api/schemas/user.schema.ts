import { z } from 'zod';
import { ErrorSchema } from './common.schema';
import { faker } from '@faker-js/faker';

// Lazy approach to generate default values
const UserSchema = z.object({
  id: z.number(),
  name: z.string().default(() => faker.name.fullName()),
  email: z.string().default(() => faker.internet.email()),
  age: z.number().optional().default(() => 19),
  // age: z.number().optional().default(() => faker.datatype.number({ min: 18, max: 99 })),
  isActive: z.boolean().optional().default(false),
  hobbies: z.array(z.string()).optional().default(() => (['fishing', 'hobby horsing'])),
});

export type User = z.infer<typeof UserSchema>;

// NewUser schema (reusing UserSchema properties except for id)
const NewUserSchema = UserSchema.omit({ id: true });

// UserPatch schema (reusing UserSchema properties and making them optional except for id)
const UserPatchSchema = UserSchema.partial().extend({
  id: z.number(),
}).refine(data => data.id !== undefined, {
  message: "ID is required",
  path: ["id"],
});

// Request and Response schemas

// GET /users response schema
const GetUsersResponseSchema = z.array(UserSchema);

// POST /users request and response schema
const CreateUserRequestSchema = NewUserSchema;
const CreateUserResponseSchema = UserSchema;

// PUT /users request and response schema
const UpdateUserRequestSchema = UserSchema;
const UpdateUserResponseSchema = UserSchema;

// PATCH /users request and response schema
const PatchUserRequestSchema = UserPatchSchema;
const PatchUserResponseSchema = UserSchema;

// DELETE /users request schema
const DeleteUserRequestSchema = z.object({
  id: z.number(),
});

// DELETE /users response schema (204 No Content does not have a body)
const DeleteUserResponseSchema = z.undefined();
const DeleteUserNotFoundResponseSchema = ErrorSchema;

export {
  UserSchema,
  NewUserSchema,
  UserPatchSchema,
  GetUsersResponseSchema,
  CreateUserRequestSchema,
  CreateUserResponseSchema,
  UpdateUserRequestSchema,
  UpdateUserResponseSchema,
  PatchUserRequestSchema,
  PatchUserResponseSchema,
  DeleteUserRequestSchema,
  DeleteUserResponseSchema,
  DeleteUserNotFoundResponseSchema,
};
