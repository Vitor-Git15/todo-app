import { BadRequestException } from "@nestjs/common";

export class PasswordDoesNotMatchError extends BadRequestException {
    constructor() {
        super('Password does not match');
    }
}