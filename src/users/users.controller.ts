import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, ResponseUserDto, UpdateUserDto } from './dto';
import { ResponseUserRolesDto } from './dto/response-user-roles.dto';
import { AuthWithPermissionsRequired } from '../common';
import { PermissionEnum } from '../roles';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @AuthWithPermissionsRequired(PermissionEnum.CAN_CREATE_USERS)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @AuthWithPermissionsRequired(PermissionEnum.CAN_READ_USERS)
  @Get()
  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.usersService.findAll();

    return users.map((user) => new ResponseUserRolesDto(user));
  }

  @AuthWithPermissionsRequired()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseUserDto> {
    const user = await this.usersService.findById(id);

    return new ResponseUserDto(user);
  }

  @AuthWithPermissionsRequired(PermissionEnum.CAN_EDIT_USERS)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    const user = await this.usersService.update(id, updateUserDto);

    return new ResponseUserDto(user);
  }

  @AuthWithPermissionsRequired(PermissionEnum.CAN_DELETE_USERS)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResponseUserDto> {
    const user = await this.usersService.delete(id);

    return new ResponseUserDto(user);
  }
}
