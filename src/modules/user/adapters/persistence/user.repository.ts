// user.repository.ts

import { InjectRepository } from '@nestjs/typeorm';
import { UserGateway } from '../../entities/user.gateway';
import { OrmUserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { User } from '../../entities/user';
import { UserFilterInput } from '../../user-filter-input';

export class UserRepository implements UserGateway {
  constructor(
    @InjectRepository(OrmUserEntity)
    private readonly repository: Repository<OrmUserEntity>,
  ) {}

  async create(user: User): Promise<User> {
    //console.log('User in Repository:', user);

    const ormUserEntity = new OrmUserEntity();
    ormUserEntity.customerId = user.customerId;
    ormUserEntity.username = user.username;
    ormUserEntity.email = user.email;
    ormUserEntity.password = user.password;
    ormUserEntity.createdAt = user.createdAt;
    ormUserEntity.updatedAt = user.updatedAt;
    ormUserEntity.deletedAt = user.deletedAt;

    const savedOrmUserEntity = await this.repository.save(ormUserEntity);

    const savedUser = new User({
      id: savedOrmUserEntity.id,
      customerId: savedOrmUserEntity.customerId,
      username: savedOrmUserEntity.username,
      email: savedOrmUserEntity.email,
      password: savedOrmUserEntity.password,
      createdAt: savedOrmUserEntity.createdAt,
      updatedAt: savedOrmUserEntity.updatedAt,
      deletedAt: savedOrmUserEntity.deletedAt,
    });

    return savedUser;
  }

  async findAll(filter?: UserFilterInput): Promise<User[]> {
    const ormUserEntities = await this.repository.find();

    const users = ormUserEntities.map((ormUserEntity) => {
      return new User({
        id: ormUserEntity.id,
        customerId: ormUserEntity.customerId,
        username: ormUserEntity.username,
        email: ormUserEntity.email,
        password: ormUserEntity.password,
        createdAt: ormUserEntity.createdAt,
        updatedAt: ormUserEntity.updatedAt,
        deletedAt: ormUserEntity.deletedAt,
      });
    });

    return users;
  }
}
