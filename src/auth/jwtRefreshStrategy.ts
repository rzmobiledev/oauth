import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { getEnv } from 'src/utils/getEnv';
import { TJWTUserPayload, TReqToken } from 'src/utils/reqTokenSchema';
import { AuthService } from 'src/auth/auth.service';
import { Request, Response } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: TReqToken) => {
          const refreshToken: string | undefined =
            request?.cookies?.refreshToken;
          if (!refreshToken)
            throw new UnauthorizedException('Refresh token not found!');
          return refreshToken;
        },
      ]),
      secretOrKey: getEnv('JWT_SECRET_REFRESH'),
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: TJWTUserPayload) {
    return this.authService.verifyRefreshToken(req, payload);
  }
}
