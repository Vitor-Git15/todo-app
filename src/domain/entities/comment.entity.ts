import { Column, Entity } from "typeorm";
import { BaseEntityWithIdAndTimestamps } from "./base.entity";

@Entity()
export class Comment extends BaseEntityWithIdAndTimestamps {
    @Column()
    content: string;
}