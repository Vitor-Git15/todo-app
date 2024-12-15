import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from 'src/application/services/comment.service';
import { Comment } from 'src/domain/entities/comment.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EntityNotFoundError } from 'src/domain/erros/entity_not_found.error';
import { CommentCreateDto, CommentUpdateDto } from 'src/domain/dto/comment.dto';

describe('CommentService', () => {
  let commentService: CommentService;
  let commentRepository: Repository<Comment>;

  const mockCommentRepository = {
    createQueryBuilder: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    getMany: jest.fn(),
    save: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: getRepositoryToken(Comment),
          useValue: mockCommentRepository,
        },
      ],
    }).compile();

    commentService = module.get<CommentService>(CommentService);
    commentRepository = module.get<Repository<Comment>>(getRepositoryToken(Comment));
  });

  describe('findByTaskId', () => {
    it('should return an array of comments', async () => {
      const taskId = 123; // Ajuste para o tipo número
      const mockComments = [new Comment(), new Comment()];
      mockCommentRepository.getMany.mockResolvedValue(mockComments);

      const result = await commentService.findByTaskId(String(taskId));

      expect(result).toEqual(mockComments);
      expect(mockCommentRepository.createQueryBuilder).toHaveBeenCalledWith('comment');
      expect(mockCommentRepository.getMany).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create and return a new comment', async () => {
      const commentCreateDto: CommentCreateDto = { taskId: 123, content: 'New comment', userId: 123 }; // taskId como número
      const mockComment = new Comment();
      mockComment.task = { id: 123 } as any; // Relacionamento com a tarefa
      mockComment.content = 'New comment';

      mockCommentRepository.save.mockResolvedValue(mockComment);

      const result = await commentService.create(commentCreateDto);

      expect(result).toEqual(mockComment);
      expect(mockCommentRepository.save).toHaveBeenCalledWith(commentCreateDto);
    });
  });

  describe('update', () => {
    it('should update and return the comment', async () => {
      const commentUpdateDto: CommentUpdateDto = { id: 'comment-id', content: 'Updated content', taskId: 123, userId: 1 }; // Adicionando taskId e userId
      const mockComment = new Comment();
      mockComment.id = 'comment-id';
      mockComment.content = 'Updated content';
      mockComment.task = { id: 123 } as any; // Relacionamento com a tarefa

      mockCommentRepository.findOneBy.mockResolvedValue(mockComment);
      mockCommentRepository.save.mockResolvedValue(mockComment);

      const result = await commentService.update(commentUpdateDto);

      expect(result).toEqual(mockComment);
      expect(mockCommentRepository.findOneBy).toHaveBeenCalledWith({ id: commentUpdateDto.id });
      expect(mockCommentRepository.save).toHaveBeenCalledWith(mockComment);
    });

    it('should throw EntityNotFoundError when comment is not found', async () => {
      const commentUpdateDto: CommentUpdateDto = { id: 'non-existent-id', content: 'Updated content', taskId: 123, userId: 1 };

      mockCommentRepository.findOneBy.mockResolvedValue(null);

      await expect(commentService.update(commentUpdateDto)).rejects.toThrow(EntityNotFoundError);
      await expect(commentService.update(commentUpdateDto)).rejects.toThrow(
        new EntityNotFoundError(Comment.constructor.name),
      );
    });
  });

  describe('delete', () => {
    it('should delete the comment', async () => {
      const commentId = 'comment-id';

      mockCommentRepository.delete.mockResolvedValue(undefined);

      await commentService.delete(commentId);

      expect(mockCommentRepository.delete).toHaveBeenCalledWith(commentId);
    });
  });
});
