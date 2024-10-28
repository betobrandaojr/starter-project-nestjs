import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { User } from '../../entities/user';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUseCase } from '../../use-cases/create-user.use-case';
import { FindAllUseCase } from '../../use-cases/find-all.use-case';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findAllUseCase: FindAllUseCase,
  ) {}

  @Post('save')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = User.create(
      createUserDto.customerId,
      createUserDto.username,
      createUserDto.email,
      createUserDto.password,
    );
    // console.log('User in Controller:', user);

    return await this.createUserUseCase.create(user);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<User[]> {
    return await this.findAllUseCase.findAll();
  }
}
