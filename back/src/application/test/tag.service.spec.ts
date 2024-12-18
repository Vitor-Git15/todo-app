import { Test, TestingModule } from '@nestjs/testing';
import { TagService } from 'src/application/services/tag.service';
import { Tag } from 'src/domain/entities/tag.entity';
import { EntityNotFoundError } from 'src/domain/erros/entity_not_found.error';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TagService', () => {
  let tagService: TagService;
  let tagRepository: Repository<Tag>;

  const mockTagRepository = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagService,
        {
          provide: getRepositoryToken(Tag),
          useValue: mockTagRepository,
        },
      ],
    }).compile();

    tagService = module.get<TagService>(TagService);
    tagRepository = module.get<Repository<Tag>>(getRepositoryToken(Tag));
  });

  describe('findAll', () => {
    it('should return an array of tags', async () => {
      const mockTags = [new Tag(), new Tag()];
      mockTagRepository.find.mockResolvedValue(mockTags);

      const result = await tagService.findAll();

      expect(result).toEqual(mockTags);
      expect(mockTagRepository.find).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create and return a new tag', async () => {
      const tagCreateDto = { name: 'New Tag' };
      const mockTag = new Tag();
      mockTag.name = 'New Tag';

      mockTagRepository.create.mockReturnValue(mockTag);
      mockTagRepository.save.mockResolvedValue(mockTag);

      const result = await tagService.create(tagCreateDto);

      expect(result).toEqual(mockTag);
      expect(mockTagRepository.create).toHaveBeenCalledWith(tagCreateDto);
      expect(mockTagRepository.save).toHaveBeenCalledWith(mockTag);
    });
  });

  describe('update', () => {
    it('should update and return the tag', async () => {
        const tagUpdateDto = { id: '1', name: 'Updated Tag' };
        const mockTag = new Tag();
        mockTag.id = '1';
        mockTag.name = 'Updated Tag';

        mockTagRepository.findOneBy.mockResolvedValue(mockTag);
        mockTagRepository.save.mockResolvedValue(mockTag);

        const result = await tagService.update(tagUpdateDto);

        expect(result).toEqual(mockTag);
        expect(mockTagRepository.findOneBy).toHaveBeenCalledWith({ id: tagUpdateDto.id });
        expect(mockTagRepository.save).toHaveBeenCalledWith(mockTag);
    });

    it('should throw an error when tag is not found', async () => {
        const tagUpdateDto = { id: '999', name: 'Non-existent Tag' };

        mockTagRepository.findOneBy.mockResolvedValue(null);

        await expect(tagService.update(tagUpdateDto)).rejects.toThrow(new EntityNotFoundError('Tag', 'No tag with the given ID was found'));
    });

  });

  describe('delete', () => {
    it('should delete the tag', async () => {
      const tagId = 1;

      mockTagRepository.delete.mockResolvedValue(undefined);

      await tagService.delete(tagId);

      expect(mockTagRepository.delete).toHaveBeenCalledWith(tagId);
    });
  });
});
