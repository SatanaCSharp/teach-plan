import { RoleDocument } from '../role.schema';
import { PermissionEnum } from '../enums';

export class ResponseRoleDto {
  id: string;
  name: string;
  description: string;
  permissions: PermissionEnum[];
  constructor(role: RoleDocument) {
    this.id = role._id;
    this.name = role.name;
    this.description = role.description;
    this.permissions = role.permissions;
  }
}
