import { Body, Controller, Get, Post } from "@nestjs/common";
import { TasksService } from "src/application/services/tasks.service";
import { TaskCreateDto } from "src/domain/dto/task_create.dto";
import { Task } from "src/domain/entities/task.entity";

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Get('all')
    async getTasks() {
        return this.tasksService.findAll();
    }

    @Post()
    async createTask(@Body() taskDto: TaskCreateDto): Promise<Task> {
        return this.tasksService.createTask(taskDto);
    }
}