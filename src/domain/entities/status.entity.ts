import { Entity, Column } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity()
export class Status extends BaseEntity {
    @Column()
    name: string;
}