// import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegistrationInput } from './dto/register-user.input';
import { User } from '@app/common';

export interface TokenPayload {
  userId: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async generateJwt(user: User) {
    const tokenPayload: TokenPayload = {
      userId: user.id,
      role: user.role,
    };

    const expires = new Date();
    expires.setHours(
      expires.getHours() + this.configService.get('JWT_EXPIRES_IN') * 24,
    );

    const token = this.jwtService.sign(tokenPayload);

    return token;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const token = await this.generateJwt(user);

    return {
      user,
      accessToken: token,
    };
  }

  /**
   * this is function is used to create User in User Entity.
   * @param email this will take email of user
   * @param password this will take raw password of user
   * we have defined what are the keys we are expecting from body
   * @returns promise of user
   */

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOne(email);

    if (!user) {
      throw new UnauthorizedException('User does not found');
    }

    const isMatched = user.isPasswordMatched(password);

    if (!isMatched) {
      throw new UnauthorizedException('Password does not matched');
    }

    return user;
  }

  async logout(user: User, response: Response): Promise<void> {
    response.clearCookie('Authorization', { httpOnly: true });
  }

  async register(payload: RegistrationInput): Promise<User> {
    try {
      const user = await this.userService.createUser(payload);
      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
