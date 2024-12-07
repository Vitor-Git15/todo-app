import { Injectable, NotImplementedException } from "@nestjs/common";
import { TaskCreateDto } from "src/domain/dto/task_create.dto";
import { Status } from "src/domain/entities/status.entity";
import { Tag } from "src/domain/entities/tag.entity";
import { Task } from "src/domain/entities/task.entity";
import { User } from "src/domain/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class MapperService {
    mapTaskCreateDto(
        taskDto: TaskCreateDto,
        statusRepository: Repository<Status>,
        usersRepository: Repository<User>,
        tagsRepository: Repository<Tag>
    ): Task {
        throw new NotImplementedException();
    }
}