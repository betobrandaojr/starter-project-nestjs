import {
  Body,
  Response,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from '../service/auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { Response as ExpressResponse } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Authenticate a user' })
  @Throttle({ short: { limit: 2, ttl: 1000 }, long: { limit: 5, ttl: 60000 } })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDto: AuthDto,
    @Response() response: ExpressResponse,
  ) {
    try {
      return await this.authService.signIn(
        response,
        signInDto.username,
        signInDto.password,
      );
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
