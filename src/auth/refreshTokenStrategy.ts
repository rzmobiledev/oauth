import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { getEnv } from 'src/utils/getEnv';
import { TLogin, TUser } from 'src/utils/userSchema';
import { TReqToken } from 'src/utils/reqTokenSchema';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req: TReqToken): string => {
          const refreshToken: string | undefined = req?.cookies?.refreshToken;
          if (!refreshToken) throw new UnauthorizedException();
          return refreshToken;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: getEnv('JWT_SECRET_REFRESH'),
      passReqToCallback: true,
      algorithms: ['HS256'],
      audience: ['user'],
      issuer: getEnv('HOST'),
    });
  }

  async validate(payload: TLogin): Promise<Omit<TUser, 'password'>> {
    const user = await this.authService.validateUser(
      payload.email,
      payload.email,
    );
    if (!user) throw new UnauthorizedException('Wrong user or password');
    return user;
  }
}
