import { Inject, Injectable } from '@nestjs/common';
import { User } from '../entities/user';
import { USER_GATEWAY } from '../user.constant';
import { UserGateway } from '../entities/user.gateway';

@Injectable()
export class FindAllUseCase {
  constructor(
    @Inject(USER_GATEWAY)
    private readonly userGateway: UserGateway,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userGateway.findAll();
  }
}
