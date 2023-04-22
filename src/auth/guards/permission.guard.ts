import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

const matchPermissions = (
  permissions: string[],
  providedPermissions: string[],
): boolean => {
  return permissions.some((permission) =>
    providedPermissions.includes(permission),
  );
};

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    if (!permissions) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return matchPermissions(permissions, user.permissions);
  }
}
