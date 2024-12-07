import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";
import { Task } from "./task.entity";

@Entity()
export class Comment extends BaseEntity {
    @Column()
    content: string;

    @ManyToOne(type => User)
    user: User;

    @ManyToOne(type => Task, user => user.comments)
    task: Task;
}