import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { getEnv } from 'src/utils/getEnv';
import { TUser } from 'src/utils/userSchema';
import { TReqToken } from 'src/utils/reqTokenSchema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JWTAccessStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: TReqToken): string => {
          const accessToken: string | undefined = req?.cookies?.accessToken;
          if (!accessToken) throw new UnauthorizedException();
          return accessToken;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: getEnv('JWT_SECRET_ACCESS'),
      passReqToCallback: true,
      algorithms: ['HS256'],
      audience: ['user'],
      issuer: getEnv('HOST'),
    });
  }

  async validate(payload: TUser): Promise<Omit<TUser, 'password'> | null> {
    return await this.userService.user(payload.id);
  }
}
