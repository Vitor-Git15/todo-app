import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { TagService } from "src/application/services/tag.service";
import { TagCreateDto, TagUpdateDto } from "src/domain/dto/tag.dto";
import { Tag } from "src/domain/entities/tag.entity";

@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagService) { }

    @Get()
    async findAll(): Promise<Tag[]> {
        return await this.tagService.findAll();
    }

    @Post()
    async create(@Body() tagDto: TagCreateDto): Promise<Tag> {
        return await this.tagService.create(tagDto);
    }

    @Put()
    async update(@Body() tagDto: TagUpdateDto): Promise<Tag> {
        return await this.tagService.update(tagDto);
    }

    @Delete(':id')
    async delete(id: number): Promise<void> {
        await this.tagService.delete(id);
    }
}