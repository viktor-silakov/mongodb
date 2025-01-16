import { APIRequestContext } from '@playwright/test';
import { BaseController } from './base.controller';
import { NewPetData, NewPetSchema, PetPatchSchema } from "@schemas";

export class PetController extends BaseController {
  resourcePath: string;

  constructor(request: APIRequestContext) {
    super(request);
    this.resourcePath = 'pets';
  }

  async create(data: NewPetData) {
    return await super.createResource(this.resourcePath, data, NewPetSchema);
  }

  async getAll() {
    return await super.getAllResources(this.resourcePath);
  }

  async update(data: any) {
    return await super.updateResource(this.resourcePath, data, NewPetSchema);
  }

  async partialUpdate(data: any) {
    return await super.partialUpdateResource(this.resourcePath, data, PetPatchSchema);
  }

  async delete(id: number) {
    return await super.deleteResource(this.resourcePath, id);
  }
}
