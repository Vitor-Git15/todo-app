import { Entity, Column } from "typeorm";
import { BaseEntityWithIdAndTimestamps } from "./base.entity";

@Entity()
export class Tag extends BaseEntityWithIdAndTimestamps {
    @Column()
    name: string;
}