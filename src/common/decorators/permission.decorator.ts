import { SetMetadata } from '@nestjs/common';
import { PermissionEnum } from '../../roles';

export const PERMISSIONS_KEY = 'permissions';
export const Permission = (...permissions: PermissionEnum[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
