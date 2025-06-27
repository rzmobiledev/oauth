import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Response,
} from '@nestjs/common';
import { Response as Res } from 'express';
import { AppService } from './app.service';
import { LocalAuthGuard } from 'src/auth/local.guard';
import { AuthService } from './auth/auth.service';
import { TUser } from './utils/userSchema';
import { JwtRefreshAuthGuard } from './auth/jwt.refresh.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Request() req: { user: TUser }, @Response() res: Res) {
    return this.authService.login(req, res);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('auth/refresh')
  refresh(@Request() req: { user: TUser }, @Response() res: Res) {
    return this.authService.login(req, res);
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('auth/logout')
  // logout(@Request() req) {
  //   return req.logout();
  // }
}
