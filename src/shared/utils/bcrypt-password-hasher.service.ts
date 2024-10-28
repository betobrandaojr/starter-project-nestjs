import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { PasswordHasher } from '../@types/password-hasher.interface';

@Injectable()
export class BcryptPasswordHasher implements PasswordHasher {
  async hash(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
