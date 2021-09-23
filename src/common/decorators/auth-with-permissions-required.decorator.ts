import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthJwtGuard, PermissionsGuard } from '../guards';
import { Permission } from './permission.decorator';
import { PermissionEnum } from '../../roles';

export function AuthWithPermissionsRequired(...permissions: PermissionEnum[]) {
  if (permissions.length) {
    return applyDecorators(
      UseGuards(AuthJwtGuard, PermissionsGuard),
      Permission(...permissions),
    );
  }

  return applyDecorators(UseGuards(AuthJwtGuard));
}
