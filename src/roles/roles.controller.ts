import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto, ResponseRoleDto, UpdateRoleDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto): Promise<ResponseRoleDto> {
    const role = await this.rolesService.create(createRoleDto);
    return new ResponseRoleDto(role);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<ResponseRoleDto[]> {
    const roles = await this.rolesService.findAll();
    return roles.map((role) => new ResponseRoleDto(role));
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseRoleDto> {
    const role = await this.rolesService.findById(id);
    return new ResponseRoleDto(role);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<ResponseRoleDto> {
    const role = await this.rolesService.update(id, updateRoleDto);
    return new ResponseRoleDto(role);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResponseRoleDto> {
    const role = await this.rolesService.delete(id);
    return new ResponseRoleDto(role);
  }
}
