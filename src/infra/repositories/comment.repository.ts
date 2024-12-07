import { DataSource } from "typeorm";
import { BaseRepository } from "./base.repository";
import { Comment } from "src/domain/entities/comment.entity";

export class CommentRepository extends BaseRepository<Comment> {
    constructor(dataSource: DataSource) {
        super(dataSource);
    }
}