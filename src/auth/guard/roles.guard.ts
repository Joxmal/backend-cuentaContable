import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { $Enums } from '@prisma/client';

/* import { UserAuth } from '../auth.service'; */
import { JwtStrategyInterface } from '../interface/jwt-strategy.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<$Enums.PrimaryRole>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRole) {
      return true;
    }

    const { user: request }: { user: JwtStrategyInterface } = context
      .switchToHttp()
      .getRequest();

    // user.role = Role.SUPERADMIN
    if (!request) {
      throw new ForbiddenException('No se ha iniciado sesión');
    }

    return this.hasAccess(request.role, requiredRole);
  }

  private hasAccess(
    userRequestRole: $Enums.PrimaryRole,
    requiredRole: $Enums.PrimaryRole,
  ): boolean {
    console.log('userRequestRole', userRequestRole);
    console.log('requiredRole', requiredRole);

    switch (userRequestRole) {
      case $Enums.PrimaryRole.root:
        return true;

      case $Enums.PrimaryRole.superAdmin:
        if (requiredRole === $Enums.PrimaryRole.root) {
          throw new ForbiddenException(
            'No tiene los permisos necesarios, no es root',
          );
        }
        return true;
      case $Enums.PrimaryRole.admin:
        if (requiredRole === $Enums.PrimaryRole.admin) {
          throw new ForbiddenException(
            'No tiene los permisos necesarios para acceder como SuperAdmin.',
          );
        }
        if (requiredRole === $Enums.PrimaryRole.user) {
          return true;
        }
        return true;

      case $Enums.PrimaryRole.user:
        if (
          requiredRole === $Enums.PrimaryRole.superAdmin ||
          requiredRole === $Enums.PrimaryRole.admin
        ) {
          throw new ForbiddenException('No tiene los permisos necesarios.');
        }

        return true;

      default:
        throw new ForbiddenException('Rol de usuario no reconocido.');
    }
  }
}
