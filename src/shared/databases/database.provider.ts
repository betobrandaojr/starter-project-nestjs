import { Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: process.env.DB_TYPE as any,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: process.env.TYPEORM_SYNCHRONIZE === 'false',
      });

      const databaseName = process.env.DB_NAME;

      try {
        await dataSource.initialize();
        Logger.log(`## Database: ${databaseName} Connection established... ##`);
        return dataSource;
      } catch (error) {
        Logger.log(`Nenhuma conexão com o banco de dados foi estabelecida.`);
      }
    },
  },
];
