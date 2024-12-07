import { BaseRepository } from "./base.repository";
import { Status } from "src/domain/entities/status.entity";
import { DataSource } from "typeorm";

export class StatusRepository extends BaseRepository<Status> {
    constructor(dataSource: DataSource) {
        super(dataSource);
    }
}