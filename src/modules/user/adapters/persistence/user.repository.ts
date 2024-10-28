// user.repository.ts

import { InjectRepository } from '@nestjs/typeorm';
import { UserGateway } from '../../entities/user.gateway';
import { OrmUserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { User } from '../../entities/user';
import { UserFilterInput } from '../dto/user.input-dto';
import { UserOutputDto } from '../dto/user.output-dto';

export class UserRepository implements UserGateway {
  constructor(
    @InjectRepository(OrmUserEntity)
    private readonly repository: Repository<OrmUserEntity>,
  ) {}

  async create(user: User): Promise<User> {
    //console.log('User in Repository:', user);
    try {
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
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id: number): Promise<User | undefined> {
    try {
      const ormUserEntity = await this.repository.findOne({
        where: { id: Number(id) },
      });

      if (!ormUserEntity) {
        return undefined;
      }

      const user = new User({
        id: ormUserEntity.id,
        customerId: ormUserEntity.customerId,
        username: ormUserEntity.username,
        email: ormUserEntity.email,
        password: ormUserEntity.password,
        createdAt: ormUserEntity.createdAt,
        updatedAt: ormUserEntity.updatedAt,
        deletedAt: ormUserEntity.deletedAt,
      });

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(username: string): Promise<User | undefined> {
    try {
      const ormUserEntity = await this.repository.findOne({
        where: { username },
      });

      if (!ormUserEntity) {
        return undefined;
      }

      const user = new User({
        id: ormUserEntity.id,
        customerId: ormUserEntity.customerId,
        username: ormUserEntity.username,
        email: ormUserEntity.email,
        password: ormUserEntity.password,
        createdAt: ormUserEntity.createdAt,
        updatedAt: ormUserEntity.updatedAt,
        deletedAt: ormUserEntity.deletedAt,
      });

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(filter?: UserFilterInput): Promise<UserOutputDto[]> {
    try {
      const queryBuilder = this.repository.createQueryBuilder('user');

      if (filter) {
        this.applyFilters(queryBuilder, filter);
      }

      if (filter.sortBy) {
        this.applySorting(queryBuilder, filter);
      }

      const page = filter.page || 1;
      const limit = filter.limit || 10;
      const offset = (page - 1) * limit;

      queryBuilder.skip(offset).take(limit);

      const ormUserEntities = await queryBuilder.getMany();

      const users = ormUserEntities.map((ormUserEntity) => {
        const user = new User({
          id: ormUserEntity.id,
          customerId: ormUserEntity.customerId,
          username: ormUserEntity.username,
          email: ormUserEntity.email,
          password: ormUserEntity.password,
          createdAt: ormUserEntity.createdAt,
          updatedAt: ormUserEntity.updatedAt,
          deletedAt: ormUserEntity.deletedAt,
        });

        return new UserOutputDto(user);
      });

      return users;
    } catch (error) {
      console.error('Error in findAll method:', error);
      throw error;
    }
  }

  private applyFilters(queryBuilder: any, filter: UserFilterInput) {
    if (filter.id !== undefined) {
      queryBuilder.andWhere('user.id = :id', {
        id: filter.id,
      });
    }

    if (filter.customerId !== undefined) {
      queryBuilder.andWhere('user.customerId = :customerId', {
        customerId: filter.customerId,
      });
    }

    if (filter.username !== undefined) {
      queryBuilder.andWhere('user.username LIKE :username', {
        username: `%${filter.username}%`,
      });
    }

    if (filter.email !== undefined) {
      queryBuilder.andWhere('user.email LIKE :email', {
        email: `%${filter.email}%`,
      });
    }

    if (
      filter.createdAtFrom !== undefined &&
      filter.createdAtTo !== undefined
    ) {
      queryBuilder.andWhere(
        'user.createdAt BETWEEN :createdAtFrom AND :createdAtTo',
        {
          createdAtFrom: filter.createdAtFrom,
          createdAtTo: filter.createdAtTo,
        },
      );
    } else if (filter.createdAtFrom !== undefined) {
      queryBuilder.andWhere('user.createdAt >= :createdAtFrom', {
        createdAtFrom: filter.createdAtFrom,
      });
    } else if (filter.createdAtTo !== undefined) {
      queryBuilder.andWhere('user.createdAt <= :createdAtTo', {
        createdAtTo: filter.createdAtTo,
      });
    }
  }

  private applySorting(queryBuilder: any, filter: UserFilterInput) {
    const sortOrder =
      filter.sortOrder?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    queryBuilder.orderBy(`user.${filter.sortBy}`, sortOrder);
  }

  async update(user: User): Promise<UserOutputDto> {
    try {
      const ormUserEntity = await this.repository.findOne({
        where: { id: user.id },
      });

      if (!ormUserEntity) {
        throw new Error('User not found');
      }

      ormUserEntity.customerId = user.customerId;
      ormUserEntity.username = user.username;
      ormUserEntity.email = user.email;
      ormUserEntity.password = user.password;
      ormUserEntity.updatedAt = user.updatedAt;

      const updatedOrmUserEntity = await this.repository.save(ormUserEntity);

      const updatedUser = new User({
        id: updatedOrmUserEntity.id,
        customerId: updatedOrmUserEntity.customerId,
        username: updatedOrmUserEntity.username,
        email: updatedOrmUserEntity.email,
        password: updatedOrmUserEntity.password,
        createdAt: updatedOrmUserEntity.createdAt,
        updatedAt: updatedOrmUserEntity.updatedAt,
        deletedAt: updatedOrmUserEntity.deletedAt,
      });

      return new UserOutputDto(updatedUser);
    } catch (error) {
      throw new Error(error);
    }
  }
}
