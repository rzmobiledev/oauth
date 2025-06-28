import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { GoogleOauthGuard } from './google.oauth.guard';
import { Response } from 'express';
import { GoauthService } from './goauth.service';
import { setAuthenticationOauthCookies } from 'src/utils/cookies';
import { TGoogleUser } from 'src/utils/googleSchema';

@Controller('auth')
export class GoauthController {
  constructor(private readonly googleService: GoauthService) {}

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async auth() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(
    @Req() req: { user: TGoogleUser },
    @Res() res: Response,
  ) {
    const token = await this.googleService.signIn(req.user);
    setAuthenticationOauthCookies(res, token);
    return res.status(HttpStatus.OK).json({ message: 'Login success' });
  }
}
