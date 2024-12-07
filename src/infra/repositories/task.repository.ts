import { BaseRepository } from "./base.repository";
import { DataSource } from "typeorm";
import { Task } from "src/domain/entities/task.entity";

export class TaskRepository extends BaseRepository<Task> {
    constructor(dataSource: DataSource) {
        super(dataSource);
    }
}