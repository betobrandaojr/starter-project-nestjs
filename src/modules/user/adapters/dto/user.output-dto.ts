import { User } from '../../entities/user';

export class UserOutputDto {
  id: number;
  customerId: number;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(user: User) {
    this.id = user.id;
    this.customerId = user.customerId;
    this.username = user.username;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.deletedAt = user.deletedAt;
  }
}
