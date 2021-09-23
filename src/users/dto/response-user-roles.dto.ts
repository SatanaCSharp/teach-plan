import { ResponseUserDto } from './response-user.dto';
import { UserDocument } from '../user.schema';
import { ResponseRoleDto } from '../../roles';

export class ResponseUserRolesDto extends ResponseUserDto {
  role: ResponseRoleDto;
  constructor(user: UserDocument) {
    super(user);
    if (user.role) {
      this.role = new ResponseRoleDto(user.role);
    }
  }
}
