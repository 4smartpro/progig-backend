import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@app/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { UsersResponse } from './dto/user.dto';
import { FindUserParams } from './dto/find-user.dto';
import { UpdateUserInput } from './dto/update-user.dto';
import { CreateUserInput } from './dto/create-user.dto';

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
  createUser(createUserDto: CreateUserInput): Promise<User> {
    return this.userRepository.create(createUserDto).save();
  }

  async updateUser(
    id: string,
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    if (updateUserInput.email) {
      const exists = await this.userRepository.findOne({
        where: { email: updateUserInput.email, id: Not(id) },
      });

      if (exists) {
        throw new BadRequestException(
          'This email already exists with other user',
        );
      }
    }

    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundException('User does not exists');

    Object.assign(user, updateUserInput);
    await user.save();

    console.log(user);

    return user;
  }

  async updateProfile(
    user: User,
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    if (updateUserInput.email) {
      const exists = await this.userRepository.findOne({
        where: { email: updateUserInput.email, id: Not(user.id) },
      });

      if (exists) {
        throw new BadRequestException(
          'This email already exists with other user',
        );
      }
    }

    Object.assign(user, updateUserInput);
    await user.save();

    return user;
  }

  async findOne(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findAll(params: FindUserParams): Promise<UsersResponse> {
    // const [entries, total] = await this.userRepository.findAndCount({
    //   where: [{ id: Not(params.userId) }],
    //   skip: params.page ? (params.page - 1) * params.limit : 0,
    //   take: params.limit,
    // });
    const userQuery = this.userRepository
      .createQueryBuilder('e')
      .where({
        id: Not(params.userId),
      })
      .loadRelationIdAndMap('e.connections', 'e.connections', 'c', (query) =>
        query.andWhere(
          `c.followingId = :followingId OR c.followerId = :followerId`,
          {
            followingId: params.userId,
            followerId: params.userId,
          },
        ),
      );

    const [entries, total] = await userQuery.getManyAndCount();
    // should add connection status with user

    console.log(entries);

    return {
      entries,
      total,
    };
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User does not exists');
    }

    return user;
  }
}
