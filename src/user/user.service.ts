import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Connection, User } from '@app/common';

import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Not, Repository } from 'typeorm';
import { UsersResponse } from './dto/user.dto';
import { FindUserParams } from './dto/find-user.dto';
import { UpdateUserInput } from './dto/update-user.dto';
import { CreateUserInput } from './dto/create-user.dto';
import { ChangePasswordInput } from './dto/change-password.dto';

@Injectable()
export class UserService {
  /**
   * Here, we have used data mapper approch for this tutorial that is why we
   * injecting repository here. Another approch can be Active records.
   */
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Connection)
    private readonly connectionRepository: Repository<Connection>,
  ) {}

  /**
   * this is function is used to create User in User Entity.
   * @param createUserDto this will type of createUserDto in which
   * we have defined what are the keys we are expecting from body
   * @returns promise of user
   */
  async createUser(payload: CreateUserInput): Promise<User> {
    const exists = await this.userRepository.findOne({
      where: { email: payload.email },
    });

    if (exists) {
      throw new BadRequestException('This email already exists');
    }

    return this.userRepository.create(payload).save();
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

    return user;
  }

  async resetPassword(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) throw new NotFoundException('User does not exists');

    user.password = user.hashPassword(password);

    await user.save();

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

  async changePassword(
    user: User,
    payload: ChangePasswordInput,
  ): Promise<string> {
    if (!user.isPasswordMatched(payload.oldPassword)) {
      throw new UnauthorizedException('Old password does not match');
    }

    user.password = user.hashPassword(payload.newPassword);
    await user.save();

    return 'Password successfully changed';
  }

  async findOne(email: string): Promise<User> {
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

  async findConnections(params: FindUserParams): Promise<UsersResponse> {
    const connections = await this.connectionRepository.find({
      select: { followerId: true, followingId: true },
    });

    const users = {
      [params.userId]: 1,
    };

    connections.forEach((e) => {
      users[e.followerId] = 1;
      users[e.followingId] = 1;
    });

    const excludes = Object.keys(users);

    const [entries, total] = await this.userRepository.findAndCount({
      where: {
        id: Not(In(excludes)),
        role: params.role,
        firstname: ILike(`%${params.searchText}%`),
      },
      skip: params.page ? (params.page - 1) * params.limit : 0,
      take: params.limit,
    });

    return {
      entries,
      total,
    };
  }

  // async getUserById(id: string, tag?: string): Promise<User> {
  //   let relations = ['gigs'];

  //   if (tag === 'AUTH') {
  //     relations = [
  //       ...relations,
  //       'savedGigs',
  //       'savedGigs.user',
  //       'savedGigs.gig',
  //     ];
  //   }

  //   const user = await this.userRepository.findOne({
  //     where: { id },
  //     relations,
  //   });

  //   if (!user) {
  //     let message = 'User does not exists';
  //     if (tag === 'AUTH') {
  //       message = 'Unauthorized';
  //     }
  //     throw new NotFoundException(message);
  //   }

  //   return user;
  // }

  async getUserById(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['gigs', 'savedGigs', 'savedGigs.user', 'savedGigs.gig'],
    });
  }
}
