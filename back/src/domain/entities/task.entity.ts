import { Entity, Column, OneToMany, ManyToOne, ManyToMany, JoinTable, Repository } from "typeorm";
import { User } from "./user.entity";
import { Status } from "./status.entity";
import { Tag } from "./tag.entity";
import { BaseEntity } from "./base.entity";
import { NotImplementedException } from "@nestjs/common";
import { TaskCreateDto } from "../dto/task.dto";
import { Comment } from "./comment.entity";
import { EntityNotFoundError } from "../erros/entity_not_found.error";
/* istanbul ignore file */
@Entity()
export class Task extends BaseEntity {
    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToOne(type => Status)
    status: Status;

    @ManyToOne(type => Task, task => task.subTasks, { nullable: true })
    parentTask: Task;

    @OneToMany(type => Task, task => task.parentTask)
    subTasks: Task[];

    @ManyToOne(type => User, user => user.createdTasks)
    creator: User;

    @ManyToMany(type => User, user => user.tasks)
    @JoinTable()
    assignedUsers: User[];

    @ManyToMany(type => Tag)
    tags: Tag[];

    @OneToMany(type => Comment, comment => comment.task)
    comments: Comment[];

    async mapFromDto(
        taskUpdateDto: TaskCreateDto,
        statusRepository: Repository<Status>,
        tagRepository: Repository<Tag>,
        userRepository: Repository<User>,
        taskRepository: Repository<Task>
    ) {
        this.title = taskUpdateDto.title;
        this.description = taskUpdateDto.description;
        await this.setStatus(taskUpdateDto.statusId, statusRepository);
        await this.setParentTask(taskUpdateDto.parentTaskId, taskRepository);
        await this.setSubTasks(taskUpdateDto.subtasksIds, taskRepository);
        await this.setCreator(taskUpdateDto.creatorId, userRepository);
        await this.setAssignedUsers(taskUpdateDto.assignedUserIds, userRepository);
        await this.setTags(taskUpdateDto.tagsIds, tagRepository);
    }

    public async setStatus(statusId: string, statusRepository: Repository<Status>) {
        const status = await statusRepository.findOneBy({ id: statusId });
        if (!status) throw new EntityNotFoundError(Status.constructor.name);
        this.status = status;
    }

    protected async setParentTask(parentTaskId: string, taskRepository: Repository<Task>) {
        const parentTask = await taskRepository.findOneBy({ id: parentTaskId });
        if (!parentTask) throw new EntityNotFoundError(Task.constructor.name, 'Parent task not found');
        this.parentTask = parentTask;
    }

    protected async setSubTasks(subtasksIds: string[], taskRepository: Repository<Task>) {
        const subtasks = await Promise.all(
            subtasksIds.map(async subtaskId => {
                const subtaskEntity = await taskRepository.findOneBy({ id: subtaskId });
                if (!subtaskEntity) throw new EntityNotFoundError(Task.constructor.name, 'Subtask not found');
                return subtaskEntity;
            })
        );
        this.subTasks = subtasks;
    }

    protected async setCreator(creatorId: string, userRepository: Repository<User>) {
        const creator = await userRepository.findOneBy({ id: creatorId });
        if (!creator) throw new EntityNotFoundError(User.constructor.name, 'Creator not found');
        this.creator = creator;
    }

    public async setAssignedUsers(assignedUserIds: string[], userRepository: Repository<User>) {
        const assignedUsers = await Promise.all(
            assignedUserIds.map(async userId => {
                const user = await userRepository.findOneBy({ id: userId });
                if (!user) throw new EntityNotFoundError(User.constructor.name, 'Assigned user not found');
                return user;
            })
        );
        this.assignedUsers = assignedUsers;
    }

    protected async setTags(tagsIds: string[], tagRepository: Repository<Tag>) {
        const tags = await Promise.all(
            tagsIds.map(async tagId => {
                const tag = await tagRepository.findOneBy({ id: tagId });
                if (!tag) throw new EntityNotFoundError(Tag.constructor.name);
                return tag;
            })
        );
        this.tags = tags;
    }
}
