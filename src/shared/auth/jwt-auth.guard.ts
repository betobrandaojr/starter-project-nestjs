import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './service/auth.service';
import { RequestCustom } from '../@types/request-custom';
import { Response } from 'express';
import { ERRORS } from '../constants/errors';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestCustom>();
    const response = context.switchToHttp().getResponse<Response>();
    const authHeader = request.headers.authorization;
    //stracting the cookie from the request
    const authCookie = request.cookies;

    let token = '';

    if (authCookie?.token) {
      token = authCookie.token;
    } else if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
    if (!token) {
      throw new UnauthorizedException('Token missing or malformed');
    }

    try {
      return await this.validateToken(request, token);
    } catch (error) {
      if (error.code === ERRORS.JWT_EXPIRED) {
        const newToken = await this.authService.generateToken(error.payload);
        await this.validateToken(request, newToken);
        this.authService.setCookiesToken(response, newToken);
        return true;
      }
      throw new UnauthorizedException('Invalid token');
    }
  }

  private async validateToken(request: RequestCustom, token: string) {
    const payload = await this.authService.validateToken(token);
    request.user = payload;
    return true;
  }
}
