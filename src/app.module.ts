import { Module } from '@nestjs/common';
import { AppController } from './api/controllers/app.controller';
import { AppService } from './services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './domain/entities/comment.entity';
import { Status } from './domain/entities/status.entity';
import { Tag } from './domain/entities/tag.entity';
import { Task } from './domain/entities/task.entity';
import { User } from './domain/entities/user.entity';
import { CommentRepository } from './infra/repositories/comment.repository';
import { StatusRepository } from './infra/repositories/status.repository';
import { TagRepository } from './infra/repositories/tag.repository';
import { TaskRepository } from './infra/repositories/task.repository';
import { UserRepository } from './infra/repositories/user.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [
        Comment,
        Status,
        Tag,
        Task,
        User
      ],
      synchronize: true,
      logging: true
    }),
    TypeOrmModule.forFeature([
      CommentRepository,
      StatusRepository,
      TagRepository,
      TaskRepository,
      UserRepository
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
