import { ApiProperty } from "@nestjs/swagger";
import { User } from "../entities/user.entity";

export class UserCreateDto {
    @ApiProperty()
    username: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}

export class UserReturnDto {
    id: string;
    username: string;
    email: string;

    constructor(user: User) {
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
    }
}