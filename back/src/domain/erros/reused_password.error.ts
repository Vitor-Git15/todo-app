import { BadRequestException } from '@nestjs/common';

export class ReusedPasswordError extends BadRequestException {
    constructor() {
        super('Password cannot be the same as the previous one');
    }
}
