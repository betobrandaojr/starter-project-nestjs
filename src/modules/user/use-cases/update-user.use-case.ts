import { Inject, Injectable } from '@nestjs/common';
import { UserGateway } from '../entities/user.gateway';
import { User } from '../entities/user';
import { USER_GATEWAY } from '../user.constant';
import { UserOutputDto } from '../adapters/dto/user.output-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_GATEWAY)
    private readonly userGateway: UserGateway,
  ) {}

  async update(id: number, updates: Partial<User>): Promise<UserOutputDto> {
    try {
      const user = await this.userGateway.findById(id);
      if (!user) {
        throw new Error('User not found');
      }

      if (updates.password) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(updates.password, saltRounds);
        updates = { ...updates, password: hashedPassword };
      }

      user.update(
        updates.customerId,
        updates.username,
        updates.email,
        updates.password,
      );

      await this.userGateway.update(user);

      return new UserOutputDto(user);
    } catch (error) {
      throw new Error(error.message || 'Failed to update user');
    }
  }
}
