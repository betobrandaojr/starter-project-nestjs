import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { User } from '../../entities/user';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserUseCase } from '../../use-cases/create-user.use-case';
import { FindAllUseCase } from '../../use-cases/find-all.use-case';
import { UserFilterInput } from '../dto/user.input-dto';
import { UserOutputDto } from '../dto/user.output-dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findAllUseCase: FindAllUseCase,
  ) {}

  @Post('save')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserOutputDto> {
    try {
      const user = User.create(
        createUserDto.customerId,
        createUserDto.username,
        createUserDto.email,
        createUserDto.password,
      );
      return await this.createUserUseCase.create(user);
    } catch (error) {
      throw HttpCode(HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() filter: UserFilterInput): Promise<UserOutputDto[]> {
    try {
      return await this.findAllUseCase.findAll(filter);
    } catch (error) {
      throw HttpCode(HttpStatus.BAD_REQUEST);
    }
  }

  @Put('update')
  @HttpCode(HttpStatus.OK)
  async update(@Body() user: User): Promise<UserOutputDto> {
    try {
      return await this.createUserUseCase.create(user);
    } catch (error) {
      throw HttpCode(HttpStatus.BAD_REQUEST);
    }
  }
}
