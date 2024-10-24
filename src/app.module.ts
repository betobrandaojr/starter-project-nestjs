import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentLoaderService } from './shared/infra/utils/environment-load.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
  ],
  providers: [EnvironmentLoaderService],
  exports: [EnvironmentLoaderService],
})
export class AppModule {}
