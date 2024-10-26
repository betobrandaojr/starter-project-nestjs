import { Injectable, UnauthorizedException } from '@nestjs/common';

import { createSecretKey } from 'crypto';
import { EncryptJWT, jwtDecrypt } from 'jose';
import { FindOneUseCase } from 'src/modules/user/use-cases/find-one.use-case';

@Injectable()
export class AuthService {
  private readonly secretKey;

  constructor(private readonly usersService: FindOneUseCase) {
    this.secretKey = createSecretKey(
      Buffer.from(process.env.JWT_SECRET, 'utf-8'),
    );
  }

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    try {
      const user = await this.usersService.findOne(username);
      if (user?.password !== pass) {
        throw new UnauthorizedException();
      }

      const payload = { sub: user.userId, username: user.username };

      const createToken = await this.generateToken(payload);
      return { access_token: createToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async validateToken(token: string): Promise<any> {
    try {
      const { payload } = await jwtDecrypt(token, this.secretKey);
      return payload;
    } catch (error) {
      if (error.code === 'ERR_JWT_EXPIRED') {
        throw error;
      }
      throw new UnauthorizedException('Invalid token');
    }
  }

  async generateToken(payload: {
    sub: string;
    username: string;
  }): Promise<string> {
    return await new EncryptJWT(payload)
      .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
      .setIssuedAt()
      .setExpirationTime('10s')
      .encrypt(this.secretKey);
  }
}
