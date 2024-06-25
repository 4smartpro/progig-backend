import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@auth/guards';
import { AzureFilesService, CurrentUser, User, UserRole } from '@app/common';
import { UsersResponse } from './dto/user.dto';
import { UpdateUserInput } from './dto/update-user.dto';
import { ChangePasswordInput } from './dto/change-password.dto';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly azureFileService: AzureFilesService,
  ) {}

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

  @Query(() => UsersResponse)
  @UseGuards(JwtAuthGuard)
  findConnections(
    @CurrentUser() user: User,
    @Args('page', { nullable: true, type: () => Int }) page?: number,
    @Args('limit', { nullable: true, type: () => Int }) limit?: number,
    @Args('searchText', { nullable: true }) searchText?: string,
    @Args('role', { nullable: true, type: () => UserRole }) role?: UserRole,
  ) {
    return this.userService.findConnections({
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

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async myProfile(@CurrentUser() user: User) {
    return user;
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Args('payload') payload: UpdateUserInput,
    @CurrentUser() user: User,
  ) {
    if (payload.profilePictureFile) {
      const fileurl = await this.azureFileService.singleUpload(
        payload.profilePictureFile,
      );
      payload.profilePicture = fileurl;
      delete payload.profilePictureFile;
    }

    return this.userService.updateProfile(user, payload);
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @Args('payload') payload: ChangePasswordInput,
    @CurrentUser() user: User,
  ) {
    return this.userService.changePassword(user, payload);
  }
}
