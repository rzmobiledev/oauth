import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { TUser, TUserNoPassword } from '../utils/userSchema';
import { getEnv } from '../utils/getEnv';
import {
  clearAuthenticationCookies,
  setAuthenticationCookies,
} from '../utils/cookies';
import { Request, Response } from 'express';
import { TJWTVerify, TJWTUserPayload } from '../utils/reqTokenSchema';
import { JwtService } from '@nestjs/jwt';
import { JWTSign } from '../utils/jwtSign';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<TUserNoPassword | null> {
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

  login(payload: { user: TUser }, res: Response) {
    const jwtSign = new JWTSign(
      this.jwtService,
      payload.user.email,
      payload.user.id,
    );

    const accessToken = jwtSign.accessToken();
    const refreshToken = jwtSign.refreshToken();

    return setAuthenticationCookies(res, accessToken, refreshToken)
      .status(HttpStatus.OK)
      .json({
        message: 'User login successfully',
      });
  }

  async verifyRefreshToken(req: Request, payload: TJWTUserPayload) {
    const refreshToken = String(req.cookies['refreshToken']);
    const tokenVerified = this.jwtService.verify<TJWTVerify>(refreshToken, {
      secret: getEnv('JWT_SECRET_REFRESH'),
    });

    if (tokenVerified.id !== payload.id)
      throw new UnauthorizedException('Refresh Token not valid');

    const now: number = Date.now();
    if (Number(tokenVerified.expiredAt) < now)
      throw new UnauthorizedException('Refresh Token Expired');

    return await this.usersService.user(payload.id);
  }

  logout(res: Response) {
    clearAuthenticationCookies(res);
    return res.status(HttpStatus.OK).json({ message: 'Logout success' });
  }
}
