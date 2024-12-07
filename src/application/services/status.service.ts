import { InjectRepository } from "@nestjs/typeorm";
import { StatusCreateDto, StatusUpdateDto } from "src/domain/dto/status.dto";
import { Status } from "src/domain/entities/status.entity";
import { EntityNotFoundError } from "src/domain/erros/entity_not_found.error";
import { Repository } from "typeorm";

export class StatusService {
    constructor(
        @InjectRepository(Status)
        private readonly statusRepository: Repository<Status>,
    ) { }

    async findAll(): Promise<Status[]> {
        return this.statusRepository.find();
    }

    async create(statusDto: StatusCreateDto): Promise<Status> {
        return this.statusRepository.save(statusDto);
    }

    async update(statusDto: StatusUpdateDto): Promise<Status> {
        const status = await this.statusRepository.findOneBy({ id: statusDto.id });
        if (!status) throw new EntityNotFoundError(Status.constructor.name);
        return this.statusRepository.save(status);
    }

    async delete(statusId: string): Promise<void> {
        await this.statusRepository.delete(statusId);
    }
}