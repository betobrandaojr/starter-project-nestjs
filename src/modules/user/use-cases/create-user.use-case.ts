import { Inject, Injectable } from '@nestjs/common';
import { UserGateway } from '../entities/user.gateway';
import { User } from '../entities/user';
import { USER_GATEWAY } from '../user.constant';
import { UserOutputDto } from '../adapters/dto/user.output-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_GATEWAY)
    private readonly userGateway: UserGateway,
  ) {}

  async create(user: User): Promise<UserOutputDto> {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);

      const newUser = User.create(
        user.customerId,
        user.username,
        user.email,
        hashedPassword,
      );

      return await this.userGateway.create(newUser);
    } catch (error) {
      throw new Error(error);
    }
  }
}
