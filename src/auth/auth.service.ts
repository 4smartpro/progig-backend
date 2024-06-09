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
import { MailService, OTP, User } from '@app/common';
import { CreateUserInput } from 'src/user/dto/create-user.dto';
import * as crypto from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';

export interface TokenPayload {
  userId: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(OTP) private readonly otpRepository: Repository<OTP>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
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

  async validateJwtUser(userId: string): Promise<User> {
    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }

    return user;
  }

  async logout(user: User, response: Response): Promise<void> {
    response.clearCookie('Authorization', { httpOnly: true });
  }

  async register(payload: CreateUserInput): Promise<User> {
    try {
      const user = await this.userService.createUser(payload);
      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async forgot(email: string) {
    const user = await this.userService.findOne(email);

    if (!user) {
      throw new UnauthorizedException('User does not exists');
    }

    const otp = crypto.randomInt(100000, 999999);

    const exists = await this.otpRepository.findOne({
      where: { email },
    });

    if (exists) {
      await exists.remove();
    }

    await this.otpRepository.create({ otp, email }).save();

    this.mailService.sendMail({
      to: email,
      subject: `Forgot Password | ProGig`,
      html: `
      Dear User,
      <br/><br/>
      Please use this OTP to reset your password
      <br/><br/>
      <h1>${otp}</h1>
      <br/><br/>
      
      `,
    });

    return otp;
  }

  async validateOtp(otp: number, email?: string) {
    const cond: any = { otp };
    if (email) cond.email = email;
    return this.otpRepository.findOne({ where: cond });
  }

  async resetPassword(otp: number, email: string, password: string) {
    const isValidOtp = await this.validateOtp(otp, email);
    // TODO: If expire throw error

    if (isValidOtp) {
      const user = await this.userService.resetPassword(email, password);
      return user;
    } else {
      throw new BadRequestException('OTP invalid or expired');
    }
  }
}

// function diffMinutes(startDate: Date, endDate: Date) {
//   // Calculate the difference in milliseconds between the two provided dates and convert it to seconds
//   let diff = (startDate.getTime() - endDate.getTime()) / 1000;
//   // Convert the difference from seconds to minutes
//   diff /= 60;
//   // Return the absolute value of the rounded difference in minutes
//   return Math.round(diff);
// }
