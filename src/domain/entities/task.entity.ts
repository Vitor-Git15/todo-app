import { Entity, Column, OneToMany, ManyToOne, ManyToMany } from "typeorm";
import { User } from "./user.entity";
import { Status } from "./status.entity";
import { Tag } from "./tag.entity";
import { BaseEntityWithIdAndTimestamps } from "./base.entity";

@Entity()
export class Task extends BaseEntityWithIdAndTimestamps {
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

    @OneToMany(type => User, user => user.createdTasks)
    creator: User;

    @ManyToMany(type => User, user => user.tasks)
    assignedUsers: User[];

    @ManyToMany(type => Tag)
    tags: Tag[];
}