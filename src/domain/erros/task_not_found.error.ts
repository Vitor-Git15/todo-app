import { BadRequestException } from "@nestjs/common";

export class TaskNotFoundError extends BadRequestException {
    constructor(message?: string) {
        super('Task not found' + (message ?? ''));
    }
}