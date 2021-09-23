import { UserDocument } from '../user.schema';
import { PermissionEnum } from '../../roles';

export class ResponseUserDto {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  permissions: PermissionEnum[];

  constructor(user: UserDocument) {
    this.id = user._id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.permissions = user.role?.permissions || [];
  }
}
