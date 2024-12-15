import { Test, TestingModule } from '@nestjs/testing';
import { TagController } from '../controllers/tag.controller';
import { TagService } from 'src/application/services/tag.service';
import { TagCreateDto, TagUpdateDto } from 'src/domain/dto/tag.dto';
import { Tag } from 'src/domain/entities/tag.entity';

describe('TagController', () => {
  let tagController: TagController;
  let tagService: TagService;

  const mockTagService = {
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TagController],
      providers: [
        {
          provide: TagService,
          useValue: mockTagService,
        },
      ],
    }).compile();

    tagController = app.get<TagController>(TagController);
    tagService = app.get<TagService>(TagService);
  });

  describe('findAll', () => {
    it('should return a list of tags', async () => {
      const result: Tag[] = [{ id: '1', name: 'Important' }];
      mockTagService.findAll.mockResolvedValue(result);

      expect(await tagController.findAll()).toEqual(result);
      expect(mockTagService.findAll).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create and return a new tag', async () => {
      const tagDto: TagCreateDto = { name: 'Urgent' };
      const result: Tag = { id: '1', name: 'Urgent' };

      mockTagService.create.mockResolvedValue(result);

      expect(await tagController.create(tagDto)).toEqual(result);
      expect(mockTagService.create).toHaveBeenCalledWith(tagDto);
    });
  });

  describe('update', () => {
    it('should update and return an existing tag', async () => {
      const tagDto: TagUpdateDto = { id: '1', name: 'Updated Tag' };
      const result: Tag = { id: '1', name: 'Updated Tag' };

      mockTagService.update.mockResolvedValue(result);

      expect(await tagController.update(tagDto)).toEqual(result);
      expect(mockTagService.update).toHaveBeenCalledWith(tagDto);
    });
  });

  describe('delete', () => {
    it('should delete a tag by id', async () => {
      const tagId = 1;
      mockTagService.delete.mockResolvedValue(undefined);

      await tagController.delete(tagId);

      expect(mockTagService.delete).toHaveBeenCalledWith(tagId);
    });
  });
});
