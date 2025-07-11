import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './localStrategy';
import { JwtStrategy } from './jwtStrategy';
import { JwtRefreshStrategy } from './jwtRefreshStrategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule, JwtModule],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
