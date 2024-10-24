import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentLoaderService } from './shared/utils/environment-load.service';
import { AuthModule } from './shared/auth/auth.module';
import { DatabaseModule } from './shared/databases/database.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
    AuthModule,
    DatabaseModule,
    UserModule,
  ],
  providers: [EnvironmentLoaderService],
  exports: [EnvironmentLoaderService],
})
export class AppModule {}
