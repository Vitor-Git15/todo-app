import { BadRequestException } from "@nestjs/common";

export class TagNotFoundError extends BadRequestException {
    constructor() {
        super('Tag not found');
    }
}