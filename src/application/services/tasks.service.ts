import { Injectable } from "@nestjs/common";
import { TaskCreateDto } from "src/domain/dto/task_create.dto";
import { TaskUpdateDto } from "src/domain/dto/task_update.dto";
import { Task } from "src/domain/entities/task.entity";
import { User } from "src/domain/entities/user.entity";
import { TaskNotFoundError } from "src/domain/erros/task_not_found.error";
import { UserNotFoundError } from "src/domain/erros/user_not_found.error";
import { Repository } from "typeorm";
import { MapperService } from "./mapper.service";
import { Tag } from "src/domain/entities/tag.entity";
import { Status } from "src/domain/entities/status.entity";

@Injectable()
export class TasksService {
    constructor(
        private readonly tasksRepository: Repository<Task>,
        private readonly usersRepository: Repository<User>,
        private readonly tagsRepository: Repository<Tag>,
        private readonly statusRepository: Repository<Status>,
        private readonly mapperService: MapperService
    ) { }

    async findAll(): Promise<Task[]> {
        return this.tasksRepository.find();
    }

    async createTask(taskDto: TaskCreateDto): Promise<Task> {
        const task = this.mapperService.mapTaskCreateDto(
            taskDto,
            this.statusRepository,
            this.usersRepository,
            this.tagsRepository
        );

        return this.tasksRepository.save(task);
    }

    async updateTask(updatedTask: TaskUpdateDto): Promise<Task> {
        const task = await this.tasksRepository.findOneBy({ id: updatedTask.id });
        if (!task) throw new TaskNotFoundError();

        task.updateData(updatedTask);

        return this.tasksRepository.save(task);
    }

    async deleteTask(id: string): Promise<void> {
        const task = await this.tasksRepository.findOneBy({ id });
        if (!task) throw new TaskNotFoundError();
        await this.tasksRepository.delete(task.id);
    }

    async assignUserToTask(taskId: string, userId: string): Promise<Task> {
        const task = await this.tasksRepository.findOneBy({ id: taskId });
        if (!task) throw new TaskNotFoundError
        const user = await this.usersRepository.findOneBy({ id: userId });
        if (!user) throw new UserNotFoundError();

        task.assignedUsers.push(user);

        return this.tasksRepository.save(task);
    }

    async findByUser(userId: string): Promise<Task[]> {
        const user = await this.usersRepository.findOneBy({ id: userId });
        if (!user) throw new UserNotFoundError();

        return user.tasks;
    }
}