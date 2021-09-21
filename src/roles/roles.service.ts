import { Injectable } from '@nestjs/common';

import { BaseService } from '../common';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { Role, RoleDocument } from './role.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RolesService extends BaseService<
  CreateRoleDto,
  UpdateRoleDto,
  RoleDocument
> {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {
    super(roleModel);
  }
}
