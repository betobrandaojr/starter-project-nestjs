import { Module } from '@nestjs/common';
import { CreateUseCase } from './use-cases/create.use-case';
import { UserController } from './infra/controller/user.controller';

@Module({
  controllers: [UserController],
  providers: [CreateUseCase],
})
export class UserModule {}
