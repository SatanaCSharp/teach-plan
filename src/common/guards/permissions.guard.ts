import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionEnum } from '../../roles';
import { PERMISSIONS_KEY } from '../decorators';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  private static hasAccess(
    userPermissions: PermissionEnum[] = [],
    requiredPermissions: PermissionEnum[],
  ): boolean {
    const userPermissionSet: Set<PermissionEnum> = new Set([
      ...userPermissions,
    ]);
    for (const requiredPermission of requiredPermissions) {
      const hasRequiredPermission = userPermissionSet.has(requiredPermission);
      if (!hasRequiredPermission) {
        throw new ForbiddenException(
          ' You don’t have permission to access this resource',
        );
      }
    }

    return true;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<
      PermissionEnum[]
    >(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredPermissions) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    return PermissionsGuard.hasAccess(user.permissions, requiredPermissions);
  }
}
