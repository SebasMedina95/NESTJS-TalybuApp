import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { RoleProtected } from './role-protected.decorator';
import { UserRoleGuard } from '../guards/user-role.guard';
import { EValidRoles } from '../constants/valid-roles';

//? ----------------------------------------------------------------
//? https://docs.nestjs.com/custom-decorators#decorator-composition
//? ----------------------------------------------------------------

export function Auth(...roles: EValidRoles[]) {
  return applyDecorators(
    RoleProtected( ...roles ),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}