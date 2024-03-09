import { Injectable } from '@nestjs/common';

import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistrationInput } from 'src/auth/dto/register-user.input';

@Injectable()
export class UserService {
  /**
   * Here, we have used data mapper approch for this tutorial that is why we
   * injecting repository here. Another approch can be Active records.
   */
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  /**
   * this is function is used to create User in User Entity.
   * @param createUserDto this will type of createUserDto in which
   * we have defined what are the keys we are expecting from body
   * @returns promise of user
   */
  createUser(createUserDto: RegistrationInput): Promise<User> {
    return this.userRepository.create(createUserDto).save();
  }

  findOne(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }
}
