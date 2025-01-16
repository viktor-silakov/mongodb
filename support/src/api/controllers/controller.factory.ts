import { APIRequestContext } from '@playwright/test';
import { UserController } from './user.controller';
import { PetController } from './pet.controller';
import { ApiItemType } from '@types';

export class ControllerFactory {
    request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }
    
    createController(itemName: ApiItemType) {
        switch (itemName) {
            case "User":
                return new UserController(this.request);
            case "Pet":
                return new PetController(this.request);
            default:
                throw new Error(`Unknown controller type: ${itemName}`);
        }
    }
}
