import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginResponse, RegistrationResponse } from './dto/auth.response';
import { AuthService } from './auth.service';
import { CreateUserInput } from 'src/user/dto/create-user.dto';
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
}
