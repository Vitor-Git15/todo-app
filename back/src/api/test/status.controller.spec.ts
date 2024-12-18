import { Test, TestingModule } from '@nestjs/testing';
import { StatusController } from '../controllers/status.controller';
import { StatusService } from 'src/application/services/status.service';
import { StatusCreateDto, StatusUpdateDto } from 'src/domain/dto/status.dto';
import { Status } from 'src/domain/entities/status.entity';

describe('StatusController', () => {
  let statusController: StatusController;
  let statusService: StatusService;

  const mockStatusService = {
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StatusController],
      providers: [
        {
          provide: StatusService,
          useValue: mockStatusService,
        },
      ],
    }).compile();

    statusController = app.get<StatusController>(StatusController);
    statusService = app.get<StatusService>(StatusService);
  });

  describe('findAll', () => {
    it('should return a list of statuses', async () => {
      const result: Status[] = [{ id: '1', name: 'Open' }];
      mockStatusService.findAll.mockResolvedValue(result);

      expect(await statusController.findAll()).toEqual(result);
      expect(mockStatusService.findAll).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new status', async () => {
      const statusDto: StatusCreateDto = { name: 'In Progress' };
      const result: Status = { id: '1', name: 'In Progress' };

      mockStatusService.create.mockResolvedValue(result);

      expect(await statusController.create(statusDto)).toEqual(result);
      expect(mockStatusService.create).toHaveBeenCalledWith(statusDto);
    });
  });

  describe('update', () => {
    it('should update an existing status', async () => {
      const statusDto: StatusUpdateDto = { id: '1', name: 'Closed' };
      const result: Status = { id: '1', name: 'Closed' };

      mockStatusService.update.mockResolvedValue(result);

      expect(await statusController.update(statusDto)).toEqual(result);
      expect(mockStatusService.update).toHaveBeenCalledWith(statusDto);
    });
  });

  describe('delete', () => {
    it('should delete a status by id', async () => {
      const statusId = '1';
      mockStatusService.delete.mockResolvedValue(undefined);

      await statusController.delete(statusId);

      expect(mockStatusService.delete).toHaveBeenCalledWith(statusId);
    });
  });
});
