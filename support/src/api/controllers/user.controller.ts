import { APIRequestContext } from '@playwright/test';
import { BaseController } from './base.controller';
import { NewUserData, NewUserSchema, UserPatchSchema } from "@schemas";

export class UserController extends BaseController {
  resourcePath: string;

  constructor(request: APIRequestContext) {
    super(request);
    this.resourcePath = 'users';
  }

  async create(data: NewUserData) {
    return await super.createResource(this.resourcePath, data, NewUserSchema);
  }

  async getAll() {
    return await super.getAllResources(this.resourcePath);
  }

  async update(data: any) {
    return await super.updateResource(this.resourcePath, data, NewUserSchema);
  }

  async partialUpdate(data: any) {
    return await super.partialUpdateResource(this.resourcePath, data, UserPatchSchema);
  }

  async delete(id: number) {
     await super.deleteResource(this.resourcePath, id);
  }
}
