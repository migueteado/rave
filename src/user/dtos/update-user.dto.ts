import { Prisma } from '@prisma/client';
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto implements Prisma.UserUpdateInput {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  name: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password?: string;

  @IsOptional()
  @MinLength(4)
  @MaxLength(20)
  passwordConfirmation?: string;
}
