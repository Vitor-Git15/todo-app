import { Repository, DataSource, DeepPartial, FindOptionsWhere } from 'typeorm';
import { BaseEntityWithIdAndTimestamps } from '../../domain/entities/base.entity';

export class BaseRepository<T extends BaseEntityWithIdAndTimestamps> extends Repository<T> {

    constructor(dataSource: DataSource) {
        super(BaseEntityWithIdAndTimestamps, dataSource.manager);
    }

    async findOneById(id: string): Promise<T | undefined> {
        return this.findOne({ where: { id: id as any } });
    }

    async findOneWhere(where: FindOptionsWhere<T>): Promise<T | undefined> {
        return this.findOne({ where });
    }

    async findAll(): Promise<T[]> {
        return this.find();
    }

    async findAllWhere(where: FindOptionsWhere<T>): Promise<T[]> {
        return this.findBy(where);
    }

    async createEntity(entityData: DeepPartial<T>): Promise<T> {
        return this.save(entityData);
    }

    async updateEntity(entityData: DeepPartial<T>): Promise<T> {
        return this.save(entityData);
    }

    async deleteEntity(id: string): Promise<void> {
        await this.delete(id);
    }
}