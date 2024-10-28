import { Injectable, UnauthorizedException } from '@nestjs/common';

import { createSecretKey } from 'crypto';
import { EncryptJWT, jwtDecrypt } from 'jose';
import { FindOneUseCase } from 'src/modules/user/use-cases/find-one.use-case';
import { Response } from 'express';
//import { FastifyReply } from 'fastify';
import { ERRORS } from 'src/shared/constants/errors';

@Injectable()
export class AuthService {
  private readonly secretKey;

  constructor(private readonly usersService: FindOneUseCase) {
    this.secretKey = createSecretKey(
      Buffer.from(process.env.JWT_SECRET, 'utf-8'),
    );
  }

  async signIn(response: Response, username: string, pass: string) {
    try {
      const user = await this.usersService.findOne(username);
      if (user?.password !== pass) {
        throw new UnauthorizedException();
      }

      const payload = { sub: user.userId, username: user.username };

      const createToken = await this.generateToken(payload);
      return this.responseAutentication(response, {
        access_token: createToken,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async validateToken(token: string): Promise<any> {
    try {
      const { payload } = await jwtDecrypt(token, this.secretKey);
      return payload;
    } catch (error) {
      if (error.code === ERRORS.JWT_EXPIRED) {
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

  setCookiesToken(response: Response, token: string) {
    response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
  }

  private responseAutentication(
    response: Response,
    data: { access_token: string },
  ) {
    this.setCookiesToken(response, data.access_token);
    response.json(data);
  }
}
