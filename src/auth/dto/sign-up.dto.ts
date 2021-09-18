import { IsEmail, IsString, Length } from 'class-validator';

export class SignUpDto {
  @IsString() @Length(1, 200) firstName: string;
  @IsString() @Length(1, 200) lastName: string;
  @IsString() @IsEmail() email: string;
  @IsString() @Length(6, 64) password: string;
}
