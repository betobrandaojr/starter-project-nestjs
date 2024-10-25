import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class FindOneUseCase {
  private readonly users = [
    {
      userId: 1,
      username: 'Beto',
      password: '1234',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    try {
      return this.users.find((user) => user.username === username);
    } catch (error) {
      throw console.error(error);
    }
  }
}
