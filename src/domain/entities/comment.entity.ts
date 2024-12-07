import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity()
export class Comment extends BaseEntity {
    @Column()
    content: string;
}