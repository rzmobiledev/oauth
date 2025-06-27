import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  Query,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';

import { User } from 'generated/prisma';
import { UserService } from './user.service';
import { TRole, TUser, TUserNoPassword } from '../utils/userSchema';
import { CreateUserDto } from './userDto/createUserDto';
import { UpdateUserDto } from './userDto/updateUserDto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  users(@Query('role') role?: TRole): Promise<TUserNoPassword[]> {
    return this.userService.users(role);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async user(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TUserNoPassword | null> {
    const user = await this.userService.user(+id);
    if (!user) throw new Error('User not found');
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) user: UpdateUserDto,
  ): Promise<TUserNoPassword> {
    const updatedUser = await this.userService.patch(+id, user);
    if (!updatedUser) throw new Error('User not found');
    return updatedUser;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body(ValidationPipe) user: CreateUserDto): Promise<TUser> {
    return this.userService.create(user);
  }
}

// TODO:
// add user login
// add bcrypt for password
// add jsonwebtoken
// add passport
