import { Controller } from '@nestjs/common';
import { CreateUseCase } from '../../use-cases/create.use-case';

@Controller('user')
export class UserController {
  constructor(private readonly userService: CreateUseCase) {}
}
