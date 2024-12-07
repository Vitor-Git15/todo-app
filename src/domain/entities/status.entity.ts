import { Entity, Column } from "typeorm";
import { BaseEntityWithIdAndTimestamps } from "./base.entity";

@Entity()
export class Status extends BaseEntityWithIdAndTimestamps {
    @Column()
    name: string;

    @Column()
    value: number; // Will be returned sorted by this value
}