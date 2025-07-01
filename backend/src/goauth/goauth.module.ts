import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { GoauthService } from './goauth.service';
import { GoauthController } from './goauth.controller';
import { GoogleStrategy } from './google.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, JwtModule],
  providers: [GoauthService, GoogleStrategy, GoogleStrategy],
  controllers: [GoauthController],
})
export class GoauthModule {}
