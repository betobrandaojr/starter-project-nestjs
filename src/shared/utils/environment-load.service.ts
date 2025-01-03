import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentLoaderService {
  constructor(private readonly configService: ConfigService) {
    this.validateEnvVariables();
  }

  private validateEnvVariables(): void {
    const requiredVariables = [
      'PORT', //Start port
      'DB_TYPE',
      'DB_NAME',
      'DB_HOST',
      'DB_PORT',
      'DB_USER',
      'DB_PASSWORD',
      'TYPEORM_SYNCHRONIZE',
      'JWT_SECRET',
    ];
    requiredVariables.forEach((variable) => {
      const value = this.configService.get(variable);
      if (!value) {
        throw new Error(`Missing environment variable: ${variable}`);
      }
      if (variable === 'JWT_SECRET' && value.length < 32) {
        throw new Error('JWT_SECRET must be exactly 32 characters long');
      }
    });
    Logger.log(`## environment variables louders ##`);
  }

  public getEnvVariable(key: string): string {
    return this.configService.get<string>(key);
  }

  public getPort(): number {
    return this.configService.get<number>('PORT') || 3000;
  }
}
