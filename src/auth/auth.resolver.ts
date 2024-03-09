import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LocalAuthGuard } from './guards/local.guard';
import { LoginResponse, RegistrationResponse } from './dto/auth.response';
import { AuthService } from './auth.service';
import { CurrentUser } from 'src/user/user.decorator';
import { User } from 'src/user/entities/user.entity';
import { RegistrationInput } from './dto/register-user.input';
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
