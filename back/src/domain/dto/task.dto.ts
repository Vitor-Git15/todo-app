import { ApiProperty } from "@nestjs/swagger";

export class TaskCreateDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    statusId: string;

    @ApiProperty()
    parentTaskId: string | undefined;

    @ApiProperty()
    subtasksIds: string[];

    @ApiProperty()
    creatorId: string;

    @ApiProperty()
    assignedUserIds: string[];

    @ApiProperty()
    tagsIds: string[];
}

export class TaskUpdateDto extends TaskCreateDto {
    @ApiProperty()
    id: string;
}