import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './localStrategy';
import { JWTAccessStrategy } from './jwtStrategy';

@Module({
  imports: [UserModule, PassportModule, JwtModule],
  providers: [AuthService, LocalStrategy, JWTAccessStrategy],
  exports: [AuthService],
})
export class AuthModule {}
