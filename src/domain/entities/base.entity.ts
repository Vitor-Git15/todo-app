import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';

@Entity()
export class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
}