import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TRole } from '../../utils/userSchema';
import { EnumRole } from 'src/utils/enums';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum([EnumRole.ADMIN, EnumRole.STAFF, EnumRole.USER], {
    message: 'Invalid Role.',
  })
  role: TRole;

  @IsNotEmpty()
  password: string;
}
