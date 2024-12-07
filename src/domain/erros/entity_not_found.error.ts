import { BadRequestException } from "@nestjs/common";
import { BaseEntity } from "typeorm";

export class EntityNotFoundError<T extends BaseEntity> extends BadRequestException {
    constructor(className: string, message?: string) {
        super(`${className} not found` + (message ? `: ${message}` : ''));
    }
}