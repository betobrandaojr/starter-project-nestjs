import { UserFilterInput } from '../adapters/dto/user.input-dto';
import { UserOutputDto } from '../adapters/dto/user.output-dto';
import { User } from './user';

export interface UserGateway {
  create(user: User): Promise<User>;
  findById(id: number): Promise<User | undefined>;
  findOne(username: string): Promise<User | undefined>;
  findAll(filter?: UserFilterInput): Promise<UserOutputDto[]>;
  update(user: User): Promise<UserOutputDto>;
}
