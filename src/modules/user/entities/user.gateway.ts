import { User } from './user';

export interface UserGateway {
  create(user: User): Promise<User>;
  findAll(): Promise<User[]>;
  //findAll
  //findOne
  //update
}
