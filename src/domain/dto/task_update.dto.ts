import { ApiProperty } from "@nestjs/swagger";
import { TaskCreateDto } from "./task_create.dto";

export class TaskUpdateDto extends TaskCreateDto {
    @ApiProperty()
    id: string;
}