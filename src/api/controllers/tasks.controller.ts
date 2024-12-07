import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { TasksService } from "src/application/services/tasks.service";
import { TaskCreateDto, TaskUpdateDto } from "src/domain/dto/task.dto";
import { Task } from "src/domain/entities/task.entity";

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Get()
    async findAll(): Promise<Task[]> {
        return await this.tasksService.findAll();
    }

    @Get('status/:statusId')
    async findByStatus(statusId: string): Promise<Task[]> {
        return await this.tasksService.findByStatus(statusId);
    }

    @Get(':taskId/parent')
    async findParentTask(taskId: string) {
        return await this.tasksService.findParentTask(taskId);
    }

    @Get(':taskId/subtasks')
    async findSubTasks(taskId: string) {
        return await this.tasksService.findSubTasks(taskId);
    }

    @Get('assignee/:userId')
    async findByAssignee(userId: string): Promise<Task[]> {
        return await this.tasksService.findByAssignee(userId);
    }

    @Get('creator/:userId')
    async findByCreator(userId: string): Promise<Task[]> {
        return await this.tasksService.findByCreator(userId);
    }

    @Post()
    async create(@Body() taskCreateDto: TaskCreateDto): Promise<Task> {
        return await this.tasksService.create(taskCreateDto);
    }

    @Put()
    async update(@Body() taskUpdateDto: TaskUpdateDto): Promise<Task> {
        return await this.tasksService.update(taskUpdateDto);
    }

    @Delete(':taskId')
    async delete(taskId: string): Promise<void> {
        await this.tasksService.delete(taskId);
    }
}