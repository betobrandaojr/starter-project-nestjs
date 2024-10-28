import { Inject, Injectable } from '@nestjs/common';
import { USER_GATEWAY } from '../user.constant';
import { UserGateway } from '../entities/user.gateway';
import { User } from '../entities/user';

@Injectable()
export class FindOneUseCase {
  constructor(
    @Inject(USER_GATEWAY)
    private readonly userGateway: UserGateway,
  ) {}

  async findOne(username: string): Promise<User> {
    try {
      return await this.userGateway.findOne(username);
    } catch (error) {
      console.log('Error in FindOneUseCase:', error);
      throw new Error(error);
    }
  }
}
