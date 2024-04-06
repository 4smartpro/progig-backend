import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const roles = this.reflector.get<string[]>('roles', ctx.getHandler());
    if (!roles) {
      return true;
    }

    const request = ctx.getContext().req;
    const user = request.user;

    return matchRoles(roles, user.role);
  }
}

const matchRoles = (roles: string[], role: string): any => {
  if (roles.includes(role)) {
    return true;
  } else {
    throw new UnauthorizedException('Permissionn denied');
  }
};
