import { InjectRepository } from "@nestjs/typeorm";
import { CommentCreateDto, CommentUpdateDto } from "src/domain/dto/comment.dto";
import { Comment } from "src/domain/entities/comment.entity";
import { EntityNotFoundError } from "src/domain/erros/entity_not_found.error";
import { Repository } from "typeorm";

export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
    ) { }

    async findByTaskId(taskId: string): Promise<Comment[]> {
        return this.commentRepository.createQueryBuilder("comment")
            .leftJoinAndSelect("comment.task", "task")
            .where("task.id = :taskId", { taskId })
            .getMany();
    }

    async create(comment: CommentCreateDto): Promise<Comment> {
        return this.commentRepository.save(comment);
    }

    async update(commentDto: CommentUpdateDto): Promise<Comment> {
        const comment = await this.commentRepository.findOneBy({ id: commentDto.id });
        if (!comment) throw new EntityNotFoundError(Comment.constructor.name);
        return this.commentRepository.save(comment);
    }

    async delete(commentId: string): Promise<void> {
        await this.commentRepository.delete(commentId);
    }
}