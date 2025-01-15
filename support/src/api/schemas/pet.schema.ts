import { z } from 'zod';
import { ErrorSchema } from './common.schema';

// Pet schema
const PetSchema = z.object({
  id: z.number(),
  name: z.string(),
  age: z.number(),
  type: z.string(),
});

// NewPet schema (reusing PetSchema properties except for id)
const NewPetSchema = PetSchema.omit({ id: true });

// PetPatch schema (reusing PetSchema properties and making them optional except for id)
const PetPatchSchema = PetSchema.partial().extend({
  id: z.number(),
}).refine(data => data.id !== undefined, {
  message: "ID is required",
  path: ["id"],
});


// Request and Response schemas

// GET /pets response schema
const GetPetsResponseSchema = z.array(PetSchema);

// POST /pets request and response schema
const CreatePetRequestSchema = NewPetSchema;
const CreatePetResponseSchema = PetSchema;

// PUT /pets request and response schema
const UpdatePetRequestSchema = PetSchema;
const UpdatePetResponseSchema = PetSchema;

// PATCH /pets request and response schema
const PatchPetRequestSchema = PetPatchSchema;
const PatchPetResponseSchema = PetSchema;

// DELETE /pets request schema
const DeletePetRequestSchema = z.object({
  id: z.number(),
});

// DELETE /pets response schema (204 No Content does not have a body)
const DeletePetResponseSchema = z.undefined();
const DeletePetNotFoundResponseSchema = ErrorSchema;

export type NewPetData = z.infer<typeof NewPetSchema>;

export {
  PetSchema,
  NewPetSchema,
  PetPatchSchema,
  GetPetsResponseSchema,
  CreatePetRequestSchema,
  CreatePetResponseSchema,
  UpdatePetRequestSchema,
  UpdatePetResponseSchema,
  PatchPetRequestSchema,
  PatchPetResponseSchema,
  DeletePetRequestSchema,
  DeletePetResponseSchema,
  DeletePetNotFoundResponseSchema,
};
