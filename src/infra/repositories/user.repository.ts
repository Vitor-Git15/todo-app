import { BaseRepository } from "./base.repository";
import { DataSource } from "typeorm";
import { User } from "src/domain/entities/user.entity";

export class UserRepository extends BaseRepository<User> {
    constructor(dataSource: DataSource) {
        super(dataSource);
    }
}