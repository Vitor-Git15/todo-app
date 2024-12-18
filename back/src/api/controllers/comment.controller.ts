import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { CommentService } from "src/application/services/comment.service";
import { CommentCreateDto, CommentUpdateDto } from "src/domain/dto/comment.dto";
import { Comment } from "src/domain/entities/comment.entity";

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) { }

    @Get(':taskId')
    async findByTaskId(taskId: string): Promise<Comment[]> {
        return await this.commentService.findByTaskId(taskId);
    }

    @Post()
    async createComment(@Body() comment: CommentCreateDto): Promise<Comment> {
        return await this.commentService.create(comment);
    }

    @Put()
    async updateComment(@Body() comment: CommentUpdateDto): Promise<Comment> {
        return await this.commentService.update(comment);
    }

    @Delete(':commentId')
    async deleteComment(commentId: string): Promise<void> {
        await this.commentService.delete(commentId);
    }
}