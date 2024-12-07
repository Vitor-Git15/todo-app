import { BadRequestException } from "@nestjs/common";

export class UserNotFoundError extends BadRequestException {
    constructor(message?: string) {
        super('User not found' + (message ?? ''));
    }
}