import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentLoaderService } from './shared/utils/environment-load.service';
import { AuthModule } from './shared/auth/auth.module';
import { DatabaseModule } from './shared/databases/database.module';
import { HealthController } from './shared/utils/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
    AuthModule,
    DatabaseModule,
  ],
  controllers: [HealthController],
  providers: [EnvironmentLoaderService],
  exports: [EnvironmentLoaderService],
})
export class AppModule {}
