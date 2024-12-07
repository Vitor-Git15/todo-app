import { ApiProperty } from "@nestjs/swagger";

export class UserCreateDto {
    @ApiProperty()
    username: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}