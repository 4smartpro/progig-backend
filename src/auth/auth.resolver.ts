import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { LoginResponse, RegistrationResponse } from './dto/auth-response.dto';
import { AuthService } from './auth.service';
import { CreateUserInput } from 'src/user/dto/create-user.dto';
import { CurrentUser, User } from '@app/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards';
@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return this.authService.login(email, password);
  }

  @Mutation(() => RegistrationResponse)
  async register(@Args('payload') payload: CreateUserInput) {
    const user = await this.authService.register(payload);

    return {
      success: true,
      message: 'Registration successful!',
      user,
    };
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async myProfile(@CurrentUser() user: User) {
    console.log(user);
    return user;
  }
}
