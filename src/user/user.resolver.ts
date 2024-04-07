import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@auth/guards';
import { CurrentUser, User, UserRole } from '@app/common';
import { UsersResponse } from './dto/user.dto';
import { UpdateUserInput } from './dto/update-user.dto';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => UsersResponse, { name: 'users' })
  @UseGuards(JwtAuthGuard)
  findAll(
    @CurrentUser() user: User,
    @Args('page', { nullable: true, type: () => Int }) page?: number,
    @Args('limit', { nullable: true, type: () => Int }) limit?: number,
    @Args('searchText', { nullable: true }) searchText?: string,
    @Args('role', { nullable: true, type: () => UserRole }) role?: UserRole,
  ) {
    return this.userService.findAll({
      page,
      limit,
      searchText,
      userId: user.id,
      role,
    });
  }

  @Query(() => User, { name: 'user' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.userService.getUserById(id);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  updateUser(
    @Args('payload') payload: UpdateUserInput,
    @CurrentUser() user: User,
  ) {
    return this.userService.updateUser(user.id, payload);
  }
}
