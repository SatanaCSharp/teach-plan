import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto, ResponseRoleDto, UpdateRoleDto } from './dto';
import { AuthWithPermissionsRequired } from '../common';
import { PermissionEnum } from './enums';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @AuthWithPermissionsRequired(PermissionEnum.CAN_CREATE_ROLES)
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto): Promise<ResponseRoleDto> {
    const role = await this.rolesService.create(createRoleDto);

    return new ResponseRoleDto(role);
  }

  @AuthWithPermissionsRequired(PermissionEnum.CAN_READ_ROLES)
  @Get()
  async findAll(): Promise<ResponseRoleDto[]> {
    const roles = await this.rolesService.findAll();

    return roles.map((role) => new ResponseRoleDto(role));
  }

  @AuthWithPermissionsRequired(PermissionEnum.CAN_READ_ROLES)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseRoleDto> {
    const role = await this.rolesService.findById(id);

    return new ResponseRoleDto(role);
  }

  @AuthWithPermissionsRequired(PermissionEnum.CAN_EDIT_ROLES)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<ResponseRoleDto> {
    const role = await this.rolesService.update(id, updateRoleDto);

    return new ResponseRoleDto(role);
  }

  @AuthWithPermissionsRequired(PermissionEnum.CAN_DELETE_ROLES)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResponseRoleDto> {
    const role = await this.rolesService.delete(id);

    return new ResponseRoleDto(role);
  }
}
