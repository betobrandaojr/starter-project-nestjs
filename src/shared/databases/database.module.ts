// database.module.ts

import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmUserEntity } from 'src/modules/user/adapters/persistence/user.entity';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const dataSourceOptions = {
          type: process.env.DB_TYPE as any,
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT),
          username: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_NAME,
          entities: [OrmUserEntity],
          synchronize: process.env.TYPEORM_SYNCHRONIZE !== 'true',
        };

        const dataSource = new DataSource(dataSourceOptions);

        try {
          await dataSource.initialize();
          Logger.log(
            `## Database: ${process.env.DB_NAME} Connection established... ##`,
          );
        } catch (error) {
          Logger.error(`Failed to connect to the database:`, error);
          throw error;
        }

        return dataSourceOptions;
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
