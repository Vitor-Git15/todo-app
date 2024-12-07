import { BadRequestException } from "@nestjs/common";

export class StatusNotFoundError extends BadRequestException {
    constructor(message?: string) {
        super('Status not found' + (message ?? ''));
    }
}