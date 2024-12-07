import { Entity, Column, OneToMany, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { User } from "./user.entity";
import { Status } from "./status.entity";
import { Tag } from "./tag.entity";
import { BaseEntity } from "./base.entity";
import { TaskUpdateDto } from "../dto/task_update.dto";
import { NotImplementedException } from "@nestjs/common";

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

    updateData(taskUpdateDto: TaskUpdateDto) {
        throw new NotImplementedException();
    }
}