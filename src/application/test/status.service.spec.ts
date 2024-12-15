import { Test, TestingModule } from '@nestjs/testing';
import { StatusService } from 'src/application/services/status.service';
import { Status } from 'src/domain/entities/status.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EntityNotFoundError } from 'src/domain/erros/entity_not_found.error';
import { StatusCreateDto, StatusUpdateDto } from 'src/domain/dto/status.dto';

describe('StatusService', () => {
  let statusService: StatusService;
  let statusRepository: Repository<Status>;

  const mockStatusRepository = {
    find: jest.fn(),
    save: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatusService,
        {
          provide: getRepositoryToken(Status),
          useValue: mockStatusRepository,
        },
      ],
    }).compile();

    statusService = module.get<StatusService>(StatusService);
    statusRepository = module.get<Repository<Status>>(getRepositoryToken(Status));
  });

  describe('findAll', () => {
    it('should return an array of statuses', async () => {
      const mockStatuses = [new Status(), new Status()];
      mockStatusRepository.find.mockResolvedValue(mockStatuses);

      const result = await statusService.findAll();

      expect(result).toEqual(mockStatuses);
      expect(mockStatusRepository.find).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create and return a new status', async () => {
      const statusCreateDto: StatusCreateDto = { name: 'New Status' };
      const mockStatus = new Status();
      mockStatus.name = 'New Status';

      mockStatusRepository.save.mockResolvedValue(mockStatus);

      const result = await statusService.create(statusCreateDto);

      expect(result).toEqual(mockStatus);
      expect(mockStatusRepository.save).toHaveBeenCalledWith(statusCreateDto);
    });
  });

  describe('update', () => {
    it('should update and return the status', async () => {
      const statusUpdateDto: StatusUpdateDto = { id: 'status-id', name: 'Updated Status' };
      const mockStatus = new Status();
      mockStatus.id = 'status-id';
      mockStatus.name = 'Updated Status';

      mockStatusRepository.findOneBy.mockResolvedValue(mockStatus);
      mockStatusRepository.save.mockResolvedValue(mockStatus);

      const result = await statusService.update(statusUpdateDto);

      expect(result).toEqual(mockStatus);
      expect(mockStatusRepository.findOneBy).toHaveBeenCalledWith({ id: statusUpdateDto.id });
      expect(mockStatusRepository.save).toHaveBeenCalledWith(mockStatus);
    });

    it('should throw EntityNotFoundError when status is not found', async () => {
      const statusUpdateDto: StatusUpdateDto = { id: 'non-existent-id', name: 'Updated Status' };

      mockStatusRepository.findOneBy.mockResolvedValue(null);

      await expect(statusService.update(statusUpdateDto)).rejects.toThrow(EntityNotFoundError);
      await expect(statusService.update(statusUpdateDto)).rejects.toThrow(
        new EntityNotFoundError(Status.constructor.name),
      );
    });
  });

  describe('delete', () => {
    it('should delete the status', async () => {
      const statusId = 'status-id';

      mockStatusRepository.delete.mockResolvedValue(undefined);

      await statusService.delete(statusId);

      expect(mockStatusRepository.delete).toHaveBeenCalledWith(statusId);
    });
  });
});
