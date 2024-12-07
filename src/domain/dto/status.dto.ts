import { ApiProperty } from "@nestjs/swagger";

export class StatusCreateDto {
    @ApiProperty()
    name: string;
}

export class StatusUpdateDto extends StatusCreateDto {
    @ApiProperty()
    id: string;
}