import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'auth', schema: '_user' })
export class OrmUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customer_id: number;

  @Column({ name: 'user_name' })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'deleted_at' })
  deletedAt: Date | null;
}
