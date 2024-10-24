import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentLoaderService {
  constructor(private readonly configService: ConfigService) {
    this.validateEnvVariables();
  }

  private validateEnvVariables(): void {
    const requiredVariables = [
      'PORT', //Start port
      'DB_HOST',
      'DB_PORT',
      'DB_USER',
      'DB_PASSWORD',
    ];

    requiredVariables.forEach((variable) => {
      const value = this.configService.get(variable);
      if (!value) {
        throw new Error(`Missing environment variable: ${variable}`);
      }
    });
  }

  public getEnvVariable(key: string): string {
    return this.configService.get<string>(key);
  }

  public getPort(): number {
    return this.configService.get<number>('PORT') || 3000;
  }
}
