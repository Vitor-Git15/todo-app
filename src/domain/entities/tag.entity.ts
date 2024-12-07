import { Entity, Column } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity()
export class Tag extends BaseEntity {
    @Column()
    name: string;
}