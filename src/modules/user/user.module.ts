import { Module } from '@nestjs/common';
import { FindOneUseCase } from './use-cases/find-one.use-case';

//used in auth module
@Module({
  controllers: [],
  providers: [FindOneUseCase, FindOneUseCase],
  exports: [FindOneUseCase],
})
export class UsersModule {}
