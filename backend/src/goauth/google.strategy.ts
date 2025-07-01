import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { getEnv } from '../utils/getEnv';
import { TGoogleProfile } from '../utils/googleSchema';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: getEnv('GOOGLE_CLIENT_ID'),
      clientSecret: getEnv('GOOGLE_CLIENT_SECRET'),
      callbackURL: `http://${getEnv('HOST')}:${getEnv('PORT')}/${getEnv('GOOGLE_CALLBACK_URL')}`,
      scope: ['email', 'profile'],
    });
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: TGoogleProfile,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails, photos } = profile;
    const user = {
      id: id,
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
      picture: photos[0].value,
      accessToken: _accessToken,
    };
    done(null, user);
  }
}
