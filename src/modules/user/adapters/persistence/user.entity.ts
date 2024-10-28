import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users', schema: '_api' })
export class OrmUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'customer_id', type: 'int', nullable: false })
  customerId: number;

  @Column({ name: 'username', type: 'varchar', length: 255, nullable: false })
  username: string;

  @Column({ name: 'email', type: 'varchar', length: 255, nullable: false })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
