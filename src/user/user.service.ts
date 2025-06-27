import { Injectable, Query } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { TRole, TUser, TUserNoPassword } from '../utils/userSchema';
import { Prisma, User } from 'generated/prisma';

import { Encryption } from 'src/utils/encryption';

@Injectable()
export class UserService {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly encryption: Encryption,
  ) {}

  async users(@Query('role') role?: TRole): Promise<TUserNoPassword[]> {
    if (role) {
      return await this.dbService.user.findMany({
        where: {
          role,
        },
        omit: {
          password: true,
        },
      });
    }
    return this.dbService.user.findMany({ omit: { password: true } });
  }

  async user(id: number): Promise<TUserNoPassword | null> {
    return await this.dbService.user.findUnique({
      where: {
        id,
      },
      omit: {
        password: true,
      },
    });
  }

  async remove(id: number): Promise<User> {
    return this.dbService.user.delete({
      where: {
        id,
      },
    });
  }

  async patch(id: number, user: Prisma.UserUpdateInput): Promise<TUser> {
    return this.dbService.user.update({
      where: {
        id,
      },
      data: user,
    });
  }

  async create(user: Prisma.UserCreateInput): Promise<TUser> {
    const { password, ...rest } = user;
    const hashedPassword = await this.encryption.hashPassword(password!);
    return this.dbService.user.create({
      data: { ...rest, password: hashedPassword },
    });
  }

  async validateUser(email: string): Promise<TUser | null> {
    const user = await this.dbService.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async comparePassword(
    rawPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await this.encryption.comparePassword(rawPassword, hashedPassword);
  }
}
