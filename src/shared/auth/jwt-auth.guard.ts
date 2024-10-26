import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './service/auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token missing or malformed');
    }

    const token = authHeader.split(' ')[1];
    try {
      const payload = await this.authService.validateToken(token);
      request.user = payload;
      return true;
    } catch (error) {
      if (error.code === 'ERR_JWT_EXPIRED') {
        console.log('Token expired, generating new one');
        const newToken = await this.authService.generateToken(error.payload);
        const payload = await this.authService.validateToken(newToken);
        request.user = payload;
        return true;
      }
      throw new UnauthorizedException('Invalid token');
    }
  }
}
