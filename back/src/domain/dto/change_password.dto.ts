import { ApiProperty } from "@nestjs/swagger";

export class ChangePasswordDto {
    @ApiProperty()
    public userId: string;

    @ApiProperty()
    public newPassword: string;
}