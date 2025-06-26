import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  Query,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';

import { User } from 'generated/prisma';
import { UserService } from './user.service';
import { TRole, TUser } from '../utils/userSchema';
import { CreateUserDto } from './userDto/createUserDto';
import { UpdateUserDto } from './userDto/updateUserDto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  users(@Query('role') role?: TRole): Promise<TUser[]> {
    return this.userService.users(role);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async user(@Param('id') id: number): Promise<User | null> {
    const user = await this.userService.user(+id);
    if (!user) throw new Error('User not found');
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body(ValidationPipe) user: UpdateUserDto,
  ): Promise<TUser> {
    const updatedUser = await this.userService.patch(+id, user);
    if (!updatedUser) throw new Error('User not found');
    return updatedUser;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number): Promise<User> {
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
