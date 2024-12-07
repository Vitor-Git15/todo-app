import { BadRequestException } from "@nestjs/common";

export class TaskNotFoundError extends BadRequestException {
    constructor() {
        super('Task not found');
    }
}