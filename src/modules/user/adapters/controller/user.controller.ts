import { Controller, Get } from '@nestjs/common';
import { FindAllUseCase } from '../../use-cases/find-all.use-case';
import { User } from '../../entities/user';

@Controller('users')
export class UsersController {
  constructor(private readonly findAllUseCase: FindAllUseCase) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.findAllUseCase.findAll();
  }
}
