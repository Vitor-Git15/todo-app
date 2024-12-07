import { BaseRepository } from "./base.repository";
import { Tag } from "src/domain/entities/tag.entity";
import { DataSource } from "typeorm";

export class TagRepository extends BaseRepository<Tag> {
    constructor(dataSource: DataSource) {
        super(dataSource);
    }
}