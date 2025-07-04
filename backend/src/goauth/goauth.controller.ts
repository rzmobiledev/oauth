import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleOauthGuard } from './google.oauth.guard';
import { Response } from 'express';
import { GoauthService } from './goauth.service';
import { setAuthenticationOauthCookies } from '../utils/cookies';
import { TGoogleUser } from '../utils/googleSchema';
import { getEnv } from 'src/utils/getEnv';

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
    const clientUrl = String(getEnv('ALLOWED_HOST_CORS').split(',')[0]) + '/';
    res.redirect(clientUrl);
  }
}
