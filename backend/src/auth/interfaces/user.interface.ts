// src/auth/interfaces/user.interface.ts
import { IsString, IsEmail, IsNotEmpty, MinLength, Length } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class UserDTO {
  @Expose()
  @IsString()
  @IsNotEmpty()
  username: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  password: string;

  refresh_token: string;
}
  