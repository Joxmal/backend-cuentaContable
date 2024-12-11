import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from '../../common/enums/rol.enum';
import { Roles } from './roles.decorator';
import { RolesGuard } from '../guard/roles.guard';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';

export function Auth(role: Role) {
  return applyDecorators(
    SetMetadata('role', role),
    Roles(role),
    UseGuards(JwtAuthGuard, RolesGuard),
  );
}
