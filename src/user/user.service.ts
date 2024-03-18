import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { RegistrationInput } from 'src/auth/dto/register-user.input';
import { User } from '@app/common';
import { UsersResponse } from './dto/user.dto';
import { FindUserParams } from './dto/find-user.dto';

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

  async findAll(params: FindUserParams): Promise<UsersResponse> {
    const [entries, total] = await this.userRepository.findAndCount({
      where: [{ id: Not(params.userId) }],
      skip: params.page ? (params.page - 1) * params.limit : 0,
      take: params.limit,
    });

    return {
      entries,
      total,
    };
  }

  async getUserById(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }
}
