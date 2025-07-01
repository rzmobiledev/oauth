import { Controller, Post, UseGuards, Request, Res } from '@nestjs/common';
import { Response } from 'express';
import { TUser } from '../utils/userSchema';
import { JwtRefreshAuthGuard } from './jwt.refresh.guard';
import { LocalAuthGuard } from './local.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: { user: TUser }, @Res() res: Response) {
    return this.authService.login(req, res);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  refresh(@Request() req: { user: TUser }, @Res() res: Response) {
    return this.authService.login(req, res);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  signout(@Res({ passthrough: true }) res: Response) {
    this.authService.logout(res);
  }
}
