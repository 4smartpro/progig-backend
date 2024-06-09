import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import {
  ForgotPasswordResponse,
  LoginResponse,
  RegistrationResponse,
} from './dto/auth-response.dto';
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
      message: 'Registration successful!',
      user,
    };
  }

  @Mutation(() => ForgotPasswordResponse)
  async forgotPassword(@Args('email') email: string) {
    const otp = await this.authService.forgot(email);

    return {
      message: `An OTP sent to your email ${email} successfully`,
      otp, // TODO: otp should not send to frontend. It should send through email
    };
  }

  @Mutation(() => RegistrationResponse)
  async resetPassword(
    @Args('otp', { type: () => Int }) otp: number,
    @Args('password') password: string,
    @Args('email') email: string,
  ) {
    await this.authService.resetPassword(otp, email, password);

    return {
      message: 'Password reset successful!',
    };
  }

  @Mutation(() => Boolean)
  async validateOTP(@Args('otp', { type: () => Int }) otp: number) {
    const exists = await this.authService.validateOtp(otp);
    if (exists) {
      return true;
    } else {
      return false;
    }
  }
}
