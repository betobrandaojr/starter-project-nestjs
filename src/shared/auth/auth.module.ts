import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './service/auth.service';
import { AuthController } from './presentation/auth.controller';
import { UsersModule } from 'src/modules/user/user.module';
import { BcryptPasswordHasher } from '../utils/bcrypt-password-hasher.service';
import { FindOneUseCase } from 'src/modules/user/use-cases/find-one.use-case';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '8h',
        },
      }),
    }),
  ],
  providers: [AuthService, BcryptPasswordHasher, FindOneUseCase],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
