import { ApiProperty } from "@nestjs/swagger";

export class TagCreateDto {
    @ApiProperty()
    name: string;
}

export class TagUpdateDto extends TagCreateDto {
    @ApiProperty()
    id: string;
}