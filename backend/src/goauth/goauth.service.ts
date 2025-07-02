import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { TGoogleUser } from '../utils/googleSchema';
import { JWTSign } from '../utils/jwtSign';

@Injectable()
export class GoauthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(user: TGoogleUser) {
    if (!user) throw new BadRequestException('Unauthenticated');
    const userExist = await this.userService.email(user.email);
    if (!userExist) return this.registerUser(user);
    return this.generateJwt({ email: user.email, id: userExist.id });
  }

  async registerUser(user: TGoogleUser) {
    try {
      const newUser = await this.userService.createGooleUser(user);
      const payloadContent = { email: newUser.email, id: newUser.id };
      return this.generateJwt(payloadContent);
    } catch {
      throw new HttpException(
        'Cannot Register your email',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  generateJwt(payload: { email: string; id: number | string }) {
    const jwtSign = new JWTSign(this.jwtService, payload.email, payload.id);
    const accessToken = jwtSign.goAuthAccessToken();
    return accessToken;
  }
}
