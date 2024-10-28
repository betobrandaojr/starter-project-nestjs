import { Inject, Injectable } from '@nestjs/common';
import { UserGateway } from '../entities/user.gateway';
import { User } from '../entities/user';
import { USER_GATEWAY } from '../user.constant';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_GATEWAY)
    private readonly userGateway: UserGateway,
  ) {}

  async create(user: User): Promise<User> {
    // console.log('User in UseCase:', user);
    try {
      return await this.userGateway.create(user);
    } catch (error) {
      throw new Error(error);
    }
  }
}
