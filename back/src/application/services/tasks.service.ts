import { Injectable } from "@nestjs/common";
import { TaskCreateDto, TaskUpdateDto } from "src/domain/dto/task.dto";
import { Task } from "src/domain/entities/task.entity";
import { User } from "src/domain/entities/user.entity";
import { Repository } from "typeorm";
import { Tag } from "src/domain/entities/tag.entity";
import { Status } from "src/domain/entities/status.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityNotFoundError } from "src/domain/erros/entity_not_found.error";

/* istanbul ignore next */
@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly tasksRepository: Repository<Task>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(Tag)
        private readonly tagsRepository: Repository<Tag>,
        @InjectRepository(Status)
        private readonly statusRepository: Repository<Status>,
    ) { }

    async findAll(): Promise<Task[]> {
        return this.tasksRepository.find();
    }

    async findByStatus(statusId: string): Promise<Task[]> {
        const status = await this.statusRepository.findOneBy({ id: statusId });
        if (!status) throw new EntityNotFoundError(Status.constructor.name);
        return this.tasksRepository.createQueryBuilder("task")
            .leftJoinAndSelect("task.status", "status")
            .where("status.id = :statusId", { statusId })
            .getMany();
    }

    async findParentTask(taskId: string) {
        const task = await this.tasksRepository.findOneBy({ id: taskId });
        if (!task) throw new EntityNotFoundError(Task.constructor.name);
        return task.parentTask;
    }

    async findSubTasks(taskId: string) {
        const task = await this.tasksRepository.findOneBy({ id: taskId });
        if (!task) throw new EntityNotFoundError(Task.constructor.name);
        return task.subTasks;
    }

    async findByAssignee(userId: string): Promise<Task[]> {
        const user = await this.usersRepository.findOneBy({ id: userId });
        if (!user) throw new EntityNotFoundError(User.constructor.name);
        return this.tasksRepository.createQueryBuilder("task")
            .leftJoinAndSelect("task.assignedUsers", "user")
            .where("user.id = :userId", { userId })
            .getMany();
    }

    async findByCreator(userId: string): Promise<Task[]> {
        const user = await this.usersRepository.findOneBy({ id: userId });
        if (!user) throw new EntityNotFoundError(User.constructor.name);
        return this.tasksRepository.createQueryBuilder("task")
            .leftJoinAndSelect("task.creator", "user")
            .where("user.id = :userId", { userId })
            .getMany();
    }

    async findByTag(tagId: string): Promise<Task[]> {
        const tag = await this.tagsRepository.findOneBy({ id: tagId });
        if (!tag) throw new EntityNotFoundError(Tag.constructor.name)
        return this.tasksRepository.createQueryBuilder("task")
            .leftJoinAndSelect("task.tags", "tag")
            .where("tag.id = :tagId", { tagId })
            .getMany();
    }

    async create(taskDto: TaskCreateDto): Promise<Task> {
        const task = new Task();

        task.mapFromDto(
            taskDto,
            this.statusRepository,
            this.tagsRepository,
            this.usersRepository,
            this.tasksRepository
        );

        return this.tasksRepository.save(task);
    }

    async update(updatedTask: TaskUpdateDto): Promise<Task> {
        const task = await this.tasksRepository.findOneBy({ id: updatedTask.id });
        if (!task) throw new EntityNotFoundError(Task.constructor.name);

        task.mapFromDto(
            updatedTask,
            this.statusRepository,
            this.tagsRepository,
            this.usersRepository,
            this.tasksRepository
        );

        return this.tasksRepository.save(task);
    }

    async delete(id: string): Promise<void> {
        const task = await this.tasksRepository.findOneBy({ id });
        if (!task) throw new EntityNotFoundError(Task.constructor.name);
        await this.tasksRepository.delete(task.id);
    }
}