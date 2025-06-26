import { HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { TUser } from 'src/utils/userSchema';
import { getEnv } from 'src/utils/getEnv';
import { setAuthenticationCookies } from 'src/utils/cookies';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<TUser, 'password'> | null> {
    const user = await this.usersService.validateUser(email);
    if (!user) return null;

    const isAuthorized = await this.usersService.comparePassword(
      pass,
      user.password!,
    );

    if (!isAuthorized) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  login(payload: TUser, res: Response) {
    const payloadContent = { email: payload.email, id: payload.id };
    const accessToken = this.jwtService.sign(payloadContent, {
      expiresIn: getEnv('JWT_ACCESS_TOKEN_EXPIRATION_MS') + 's',
      secret: getEnv('JWT_SECRET_ACCESS'),
    });

    const refreshToken = this.jwtService.sign(payloadContent, {
      expiresIn: getEnv('JWT_REFRESH_TOKEN_EXPIRATION_MS') + 's',
      secret: getEnv('JWT_SECRET_REFRESH'),
    });

    return setAuthenticationCookies(res, accessToken, refreshToken)
      .status(HttpStatus.OK)
      .json({
        message: 'User login successfully',
      });
  }
}
