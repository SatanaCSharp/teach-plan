import { IsArray, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { PermissionEnum } from '../enums';

export class CreateRoleDto {
  @IsString()
  @Length(1, 200)
  name: string;

  @IsString()
  @Length(1, 200)
  description: string;

  @IsArray()
  @IsEnum(PermissionEnum, { each: true })
  @IsNotEmpty()
  permissions: PermissionEnum[];
}
