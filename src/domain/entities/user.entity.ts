import { Entity, Column, ManyToMany } from "typeorm";
import { Task } from "./task.entity";
import { BaseEntityWithIdAndTimestamps } from "./base.entity";

@Entity()
export class User extends BaseEntityWithIdAndTimestamps {
    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @ManyToMany(type => Task, task => task.assignedUsers)
    tasks: Task[];

    @ManyToMany(type => Task, task => task.creator)
    createdTasks: Task[];
}