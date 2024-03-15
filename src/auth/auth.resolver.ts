import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  GqlExecutionContext,
  GraphQLExecutionContext,
  Mutation,
  Resolver,
} from '@nestjs/graphql';
import { LocalAuthGuard } from './guards/local.guard';
import { LoginResponse, RegistrationResponse } from './dto/auth.response';
import { AuthService } from './auth.service';
import { RegistrationInput } from './dto/register-user.input';
import { CurrentUser, User } from '@app/common';
@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  /**
   * Login API done with everything
   */
  @Mutation(() => LoginResponse)
  @UseGuards(LocalAuthGuard)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @CurrentUser() user: User,
  ) {
    const token = await this.authService.generateJwt(user);

    return {
      user,
      accessToken: token,
    };
  }

  @Mutation(() => RegistrationResponse)
  async register(@Args('payload') payload: RegistrationInput) {
    const user = await this.authService.register(payload);

    return {
      success: true,
      message: 'Registration successful!',
      user,
    };
  }
}
