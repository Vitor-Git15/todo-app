// import { Module } from '@nestjs/common';
// import { AppController } from './api/controllers/app.controller';
// import { AppService } from './application/services/app.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Comment } from './domain/entities/comment.entity';
// import { Status } from './domain/entities/status.entity';
// import { Tag } from './domain/entities/tag.entity';
// import { Task } from './domain/entities/task.entity';
// import { User } from './domain/entities/user.entity';
// import { UserRepository } from './infra/repositories/user.repository';
// import { UserController } from './api/controllers/user.controller';
// import { UserService } from './application/services/user.service';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'sqlite',
//       database: 'db.sqlite',
//       entities: [Comment, Status, Tag, Task, User],
//       synchronize: true,
//       logging: true
//     }),
//     TypeOrmModule.forFeature([Comment, Status, Tag, Task, User, UserRepository])
//   ],
//   controllers: [AppController, UserController],
//   providers: [
//     AppService,
//     UserService,
//   ],
// })
// export class AppModule { }


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './api/controllers/user.controller';
import { UserService } from './application/services/user.service';
import { User } from './domain/entities/user.entity';
import { Comment } from './domain/entities/comment.entity';
import { Status } from './domain/entities/status.entity';
import { Tag } from './domain/entities/tag.entity';
import { Task } from './domain/entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Comment, Status, Tag, Task, User],
      synchronize: true,
      logging: true
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule { }
