// users.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmUserEntity } from './adapters/persistence/user.entity';
import { UserRepository } from './adapters/persistence/user.repository';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { FindOneUseCase } from './use-cases/find-one.use-case';
import { DatabaseModule } from 'src/shared/databases/database.module';
import { UsersController } from './adapters/controller/user.controller';
import { FindAllUseCase } from './use-cases/find-all.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([OrmUserEntity]), DatabaseModule],
  controllers: [UsersController],
  providers: [
    {
      provide: 'UserGateway',
      useClass: UserRepository,
    },
    CreateUserUseCase,
    FindOneUseCase,
    FindAllUseCase,
  ],
  exports: ['UserGateway', CreateUserUseCase, FindOneUseCase],
})
export class UsersModule {}
