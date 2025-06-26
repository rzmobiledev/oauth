import { CreateUserDto } from './createUserDto';
import { PartialType } from '@nestjs/mapped-types';
import { TRole } from '../../utils/userSchema';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  name?: string;
  email?: string;
  role?: TRole;
  password?: string | undefined;
}
