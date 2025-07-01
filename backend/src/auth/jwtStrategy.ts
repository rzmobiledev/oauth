import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { getEnv } from '../utils/getEnv';
import { TUserNoPassword } from '../utils/userSchema';
import { TReqToken } from '../utils/reqTokenSchema';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: TReqToken) => {
          const accessToken: string | undefined = request?.cookies?.accessToken;
          if (!accessToken) throw new UnauthorizedException();
          return accessToken;
        },
      ]),
      secretOrKey: getEnv('JWT_SECRET_ACCESS'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: {
    email: string;
    id: number;
  }): Promise<TUserNoPassword | null> {
    return await this.userService.user(payload.id);
  }
}
