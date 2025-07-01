import * as bcrypt from 'bcrypt';
import { getEnv } from './getEnv';

export class Encryption {
  constructor(private readonly salt: string = getEnv('SALT_ROUND')) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(+this.salt);
    return await bcrypt.hash(password, salt);
  }

  comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
