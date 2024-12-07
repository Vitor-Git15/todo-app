import { ApiProperty } from "@nestjs/swagger";

export class CommentCreateDto {
    @ApiProperty()
    content: string;

    @ApiProperty()
    userId: number;

    @ApiProperty()
    taskId: number;
}

export class CommentUpdateDto extends CommentCreateDto {
    @ApiProperty()
    id: string;
}