import { JwtService } from '@nestjs/jwt';
import { getEnv } from './getEnv';
import { calculateRefreshTokenExpiresIn } from './dateCalculation';

export class JWTSign {
  constructor(
    private jwtService: JwtService,
    private email: string,
    private userId: number | string,
  ) {}

  accessToken() {
    const payloadContent = { email: this.email, id: this.userId };
    return this.jwtService.sign(payloadContent, {
      expiresIn: getEnv('JWT_ACCESS_TOKEN_EXPIRATION_MINS') + 'ms',
      secret: getEnv('JWT_SECRET_ACCESS'),
    });
  }

  goAuthAccessToken() {
    const payloadContent = { email: this.email, id: this.userId };
    return this.jwtService.sign(payloadContent, {
      expiresIn: getEnv('GOOGLE_OAUTH_TOKEN_EXPIRATION_MINS') + 'ms',
      secret: getEnv('GOOGLE_CLIENT_SECRET'),
    });
  }

  refreshToken() {
    const payloadContent = { email: this.email, id: this.userId };
    return this.jwtService.sign(
      {
        ...payloadContent,
        expiredAt: calculateRefreshTokenExpiresIn(
          getEnv('JWT_REFRESH_TOKEN_EXPIRATION_MINS'),
        ),
      },
      {
        expiresIn: getEnv('JWT_REFRESH_TOKEN_EXPIRATION_MINS') + 'ms',
        secret: getEnv('JWT_SECRET_REFRESH'),
      },
    );
  }
}
