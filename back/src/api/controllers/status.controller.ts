import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { StatusService } from "src/application/services/status.service";
import { StatusCreateDto, StatusUpdateDto } from "src/domain/dto/status.dto";
import { Status } from "src/domain/entities/status.entity";

@Controller('status')
export class StatusController {
    constructor(private readonly statusService: StatusService) { }

    @Get()
    async findAll(): Promise<Status[]> {
        return await this.statusService.findAll();
    }

    @Post()
    async create(@Body() statusDto: StatusCreateDto): Promise<Status> {
        return await this.statusService.create(statusDto);
    }

    @Put()
    async update(@Body() statusDto: StatusUpdateDto): Promise<Status> {
        return await this.statusService.update(statusDto);
    }

    @Delete(':id')
    async delete(id: string): Promise<void> {
        await this.statusService.delete(id);
    }
}