import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { TasksService } from "src/application/services/tasks.service";
import { TaskCreateDto } from "src/domain/dto/task_create.dto";
import { TaskUpdateDto } from "src/domain/dto/task_update.dto";
import { Task } from "src/domain/entities/task.entity";

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Get()
    async findAll(): Promise<Task[]> {
        return this.tasksService.findAll();
    }

    @Get('status/:statusId')
    async findByStatus(statusId: string): Promise<Task[]> {
        return this.tasksService.findByStatus(statusId);
    }

    @Get(':taskId/parent')
    async findParentTask(taskId: string) {
        return this.tasksService.findParentTask(taskId);
    }

    @Get(':taskId/subtasks')
    async findSubTasks(taskId: string) {
        return this.tasksService.findSubTasks(taskId);
    }

    @Get('assignee/:userId')
    async findByAssignee(userId: string): Promise<Task[]> {
        return this.tasksService.findByAssignee(userId);
    }

    @Get('creator/:userId')
    async findByCreator(userId: string): Promise<Task[]> {
        return this.tasksService.findByCreator(userId);
    }

    @Post()
    async create(@Body() taskCreateDto: TaskCreateDto): Promise<Task> {
        return this.tasksService.createTask(taskCreateDto);
    }

    @Put()
    async update(@Body() taskUpdateDto: TaskUpdateDto): Promise<Task> {
        return this.tasksService.updateTask(taskUpdateDto);
    }

    @Delete(':taskId')
    async delete(taskId: string): Promise<void> {
        return this.tasksService.deleteTask(taskId);
    }
}