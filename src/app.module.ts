import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './api/controllers/user.controller';
import { UserService } from './application/services/user.service';
import { User } from './domain/entities/user.entity';
import { Comment } from './domain/entities/comment.entity';
import { Status } from './domain/entities/status.entity';
import { Tag } from './domain/entities/tag.entity';
import { Task } from './domain/entities/task.entity';
import { AppController } from './api/controllers/app.controller';
import { AppService } from './application/services/app.service';
import { TasksController } from './api/controllers/tasks.controller';
import { TasksService } from './application/services/tasks.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Comment, Status, Tag, Task, User],
      synchronize: true,
      logging: true
    }),
    TypeOrmModule.forFeature([Comment, Status, Tag, Task, User]),
  ],
  controllers: [AppController, UserController, TasksController],
  providers: [AppService, UserService, TasksService],
})
export class AppModule { }
