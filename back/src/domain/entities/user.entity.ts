import { Entity, Column, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { Task } from './task.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class User extends BaseEntity {
    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(type => Task, task => task.creator)
    createdTasks: Task[]

    @ManyToMany(type => Task, task => task.assignedUsers)
    tasks: Task[];
}