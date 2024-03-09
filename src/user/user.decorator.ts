import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './entities/user.entity';
import { GqlExecutionContext } from '@nestjs/graphql';

const getCurrentUserByContext = (context: ExecutionContext): User => {
  // Check if the context is an HTTP or GraphQL context
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest().user;
  } else {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  }
};

export const CurrentUser = createParamDecorator(
  (_data: undefined, contenxt: ExecutionContext) =>
    getCurrentUserByContext(contenxt),
);
