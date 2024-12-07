import { BadRequestException } from "@nestjs/common";

export class UserWithSameEmailAlreadyExistsError extends BadRequestException {
    constructor() {
        super('User with same email already exists');
    }
}