import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, BeforeInsert } from 'typeorm';
import { BaseEntity } from 'typeorm';

@Entity()
export class BaseEntityWithIdAndTimestamps extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @BeforeInsert()
    setDates() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @UpdateDateColumn()
    setUpdatedAt() {
        this.updatedAt = new Date();
    }
}