import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import * as os from 'os';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Health')
@ApiBearerAuth('JWT-auth')
@Controller('health')
export class HealthController {
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  async getHealth(): Promise<string> {
    const memoryUsage = process.memoryUsage();
    const totalMemory = os.totalmem();
    const rss = memoryUsage.rss;
    const memoryUsagePercentage = ((rss / totalMemory) * 100).toFixed(2);

    Logger.log(`Server is ok... 
Memory Usage: ${memoryUsagePercentage}%`);

    return `Server is ok...
Memory Usage: ${memoryUsagePercentage}%`;
  }
}
