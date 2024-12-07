import { InjectRepository } from "@nestjs/typeorm";
import { TagCreateDto, TagUpdateDto } from "src/domain/dto/tag.dto";
import { Tag } from "src/domain/entities/tag.entity";
import { Repository } from "typeorm";

export class TagService {
    constructor(
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>,
    ) { }

    async findAll(): Promise<Tag[]> {
        return await this.tagRepository.find();
    }

    async create(tagDto: TagCreateDto): Promise<Tag> {
        const tag = this.tagRepository.create(tagDto);
        return await this.tagRepository.save(tag);
    }

    async update(tagDto: TagUpdateDto): Promise<Tag> {
        const tag = await this.tagRepository.findOneBy({ id: tagDto.id });
        tag.name = tagDto.name;
        return await this.tagRepository.save(tag);
    }

    async delete(id: number): Promise<void> {
        await this.tagRepository.delete(id);
    }
}