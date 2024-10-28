import { Inject, Injectable } from '@nestjs/common';
import { USER_GATEWAY } from '../user.constant';
import { UserGateway } from '../entities/user.gateway';
import { UserFilterInput } from '../adapters/dto/user.input-dto';
import { UserOutputDto } from '../adapters/dto/user.output-dto';

@Injectable()
export class FindAllUseCase {
  constructor(
    @Inject(USER_GATEWAY)
    private readonly userGateway: UserGateway,
  ) {}

  async findAll(filter?: UserFilterInput): Promise<UserOutputDto[]> {
    try {
      return await this.userGateway.findAll(filter);
    } catch (error) {
      console.log('Error in FindAllUseCase:', error);
      throw new Error(error);
    }
  }
}
