import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from '../controllers/tasks.controller';
import { TasksService } from 'src/application/services/tasks.service';
import { Task } from 'src/domain/entities/task.entity';
import { TaskCreateDto, TaskUpdateDto } from 'src/domain/dto/task.dto';
import { User } from 'src/domain/entities/user.entity';
import { Status } from 'src/domain/entities/status.entity';

describe('TasksController', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;

  const mockTasksService = {
    findAll: jest.fn(),
    findByStatus: jest.fn(),
    findParentTask: jest.fn(),
    findSubTasks: jest.fn(),
    findByAssignee: jest.fn(),
    findByCreator: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    tasksController = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
  });

  describe('findAll', () => {
    it('should return all tasks', async () => {
      const mockTasks = [
        new Task(),
        new Task(),
      ];
      mockTasksService.findAll.mockResolvedValue(mockTasks);

      const result = await tasksController.findAll();

      expect(result).toEqual(mockTasks);
      expect(mockTasksService.findAll).toHaveBeenCalled();
    });
  });

  describe('findByStatus', () => {
    it('should return tasks by status', async () => {
      const mockStatus = 'status-id';
      const mockTasks = [
        new Task(),
        new Task(),
      ];
      mockTasksService.findByStatus.mockResolvedValue(mockTasks);

      const result = await tasksController.findByStatus(mockStatus);

      expect(result).toEqual(mockTasks);
      expect(mockTasksService.findByStatus).toHaveBeenCalledWith(mockStatus);
    });
  });

  describe('findParentTask', () => {
    it('should return parent task', async () => {
      const mockTask = new Task();
      const mockTaskId = 'task-id';
      mockTasksService.findParentTask.mockResolvedValue(mockTask);

      const result = await tasksController.findParentTask(mockTaskId);

      expect(result).toEqual(mockTask);
      expect(mockTasksService.findParentTask).toHaveBeenCalledWith(mockTaskId);
    });
  });

  describe('findSubTasks', () => {
    it('should return subtasks for a task', async () => {
      const mockSubTasks = [new Task(), new Task()];
      const mockTaskId = 'task-id';
      mockTasksService.findSubTasks.mockResolvedValue(mockSubTasks);

      const result = await tasksController.findSubTasks(mockTaskId);

      expect(result).toEqual(mockSubTasks);
      expect(mockTasksService.findSubTasks).toHaveBeenCalledWith(mockTaskId);
    });
  });

  describe('findByAssignee', () => {
    it('should return tasks assigned to a user', async () => {
      const mockUserId = 'user-id';
      const mockTasks = [new Task(), new Task()];
      mockTasksService.findByAssignee.mockResolvedValue(mockTasks);

      const result = await tasksController.findByAssignee(mockUserId);

      expect(result).toEqual(mockTasks);
      expect(mockTasksService.findByAssignee).toHaveBeenCalledWith(mockUserId);
    });
  });

  describe('findByCreator', () => {
    it('should return tasks created by a user', async () => {
      const mockUserId = 'user-id';
      const mockTasks = [new Task(), new Task()];
      mockTasksService.findByCreator.mockResolvedValue(mockTasks);

      const result = await tasksController.findByCreator(mockUserId);

      expect(result).toEqual(mockTasks);
      expect(mockTasksService.findByCreator).toHaveBeenCalledWith(mockUserId);
    });
  });

  describe('create Task', () => {
    it('should create a task with all necessary relationships', async () => {
      const mockStatus = { id: 'status-id', name: 'OPEN' };
      const mockCreator = { id: 'creator-id', username: 'creator', email: 'creator@example.com' };
      const mockTask = {
        id: 'task-id',
        title: 'New Task',
        description: 'Task description',
        status: mockStatus,
        creator: mockCreator,
        assignedUsers: [mockCreator],
        tags: [],
        comments: [],
      };

      mockTasksService.create.mockResolvedValue(mockTask);

      const result = await tasksController.create({
        title: 'New Task',
        description: 'Task description',
        statusId: mockStatus.id,
        creatorId: mockCreator.id,
        assignedUserIds: [mockCreator.id],
        tagsIds: [],
        parentTaskId: null,
        subtasksIds: [],
      });

      expect(result).toEqual(mockTask);
      expect(mockTasksService.create).toHaveBeenCalled();
    });
  });

  describe('update Task', () => {
    it('should update an existing task', async () => {
      const mockTaskUpdateDto: TaskUpdateDto = {
        id: 'task-id',
        title: 'Updated Task',
        description: 'Updated description',
        statusId: 'status-id',
        parentTaskId: null, // Ou o ID de uma tarefa pai, se necessário
        subtasksIds: [],
        creatorId: 'creator-id',
        assignedUserIds: ['user-id'],
        tagsIds: [],
      };

      const mockUpdatedTask = new Task();
      mockUpdatedTask.id = 'task-id';
      mockUpdatedTask.title = 'Updated Task';
      mockUpdatedTask.description = 'Updated description';

      mockTasksService.update.mockResolvedValue(mockUpdatedTask);

      const result = await tasksController.update(mockTaskUpdateDto);

      expect(result).toEqual(mockUpdatedTask);
      expect(mockTasksService.update).toHaveBeenCalledWith(mockTaskUpdateDto);
    });
  });

  describe('delete Task', () => {
    it('should delete a task', async () => {
      const mockTaskId = 'task-id';
      mockTasksService.delete.mockResolvedValue(undefined);

      await tasksController.delete(mockTaskId);

      expect(mockTasksService.delete).toHaveBeenCalledWith(mockTaskId);
    });
  });
});
