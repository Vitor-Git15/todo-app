import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from '../controllers/comment.controller';
import { CommentService } from 'src/application/services/comment.service';
import { Comment } from 'src/domain/entities/comment.entity';
import { CommentCreateDto, CommentUpdateDto } from 'src/domain/dto/comment.dto';
import { Task } from 'src/domain/entities/task.entity';
import { User } from 'src/domain/entities/user.entity';

describe('CommentController', () => {
  let commentController: CommentController;
  let commentService: CommentService;

  const mockCommentService = {
    findByTaskId: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [
        {
          provide: CommentService,
          useValue: mockCommentService,
        },
      ],
    }).compile();

    commentController = module.get<CommentController>(CommentController);
    commentService = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(commentController).toBeDefined();
  });

  describe('findByTaskId', () => {
    it('should return a list of comments', async () => {
      const task = new Task();
      task.id = '123';
      task.title = 'Test Task';

      const user = new User();
      user.username = 'testuser';
      user.email = 'testuser@example.com';
      user.password = 'password123';

      const result: Comment[] = [
        { id: '1', task: task, user: user, content: 'Test comment' },
      ];

      mockCommentService.findByTaskId.mockResolvedValue(result);

      expect(await commentController.findByTaskId(task.id)).toEqual(result);
      expect(mockCommentService.findByTaskId).toHaveBeenCalledWith(task.id);
    });
  });

  describe('createComment', () => {
    it('should create and return a comment', async () => {
      const task = new Task();
      task.id = '123';

      const user = new User();
      user.username = 'testuser';
      user.email = 'testuser@example.com';
      user.password = 'password123';

      const dto: CommentCreateDto = { taskId: 123, userId: 456, content: 'New comment' };
      const result: Comment = { id: '1', task: task, user: user, content: 'New comment' };

      mockCommentService.create.mockResolvedValue(result);

      expect(await commentController.createComment(dto)).toEqual(result);
      expect(mockCommentService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('updateComment', () => {
    it('should update and return a comment', async () => {
      const task = new Task();
      task.id = '123';

      const user = new User();
      user.username = 'testuser';
      user.email = 'testuser@example.com';
      user.password = 'password123';

      const dto: CommentUpdateDto = { id: '1', taskId: 123, userId: 456, content: 'Updated comment' };
      const result: Comment = { id: '1', task: task, user: user, content: 'Updated comment' };

      mockCommentService.update.mockResolvedValue(result);

      expect(await commentController.updateComment(dto)).toEqual(result);
      expect(mockCommentService.update).toHaveBeenCalledWith(dto);
    });
  });

  describe('deleteComment', () => {
    it('should delete a comment', async () => {
      const commentId = '1';

      mockCommentService.delete.mockResolvedValue(undefined);

      await commentController.deleteComment(commentId);

      expect(mockCommentService.delete).toHaveBeenCalledWith(commentId);
    });
  });
});
