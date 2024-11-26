import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ConnectionService } from './connection.service';
import { Connection, ConnectionStatus, CurrentUser, User } from '@app/common';
import { UseGuards } from '@nestjs/common';
import { ConnectionType, ConnectionsResponse } from './dto/connection.dto';
import { JwtAuthGuard } from '@auth/guards';

@Resolver(() => Connection)
export class ConnectionResolver {
  constructor(private readonly connectionService: ConnectionService) {}

  @Query(() => ConnectionsResponse, { name: 'connections' })
  @UseGuards(JwtAuthGuard)
  findAll(
    @CurrentUser() user: User,
    @Args('page', { nullable: true, type: () => Int }) page?: number,
    @Args('limit', { nullable: true, type: () => Int }) limit?: number,
    @Args('searchText', { nullable: true }) searchText?: string,
    @Args('status', { nullable: true, type: () => ConnectionStatus })
    status?: ConnectionStatus,
    @Args('connectionType', { nullable: true, type: () => ConnectionType })
    connectionType?: ConnectionType,
  ) {
    return this.connectionService.findAll({
      page,
      limit,
      searchText,
      userId: user.id,
      status,
      connectionType,
    });
  }

  @Mutation(() => Connection)
  @UseGuards(JwtAuthGuard)
  sendConnectionRequest(
    @Args('followingId', { type: () => ID }) followingId: string,
    @CurrentUser() user: User,
  ) {
    return this.connectionService.sendRequest({
      followingId,
      followerId: user.id,
    });
  }

  @Mutation(() => Connection)
  @UseGuards(JwtAuthGuard)
  acceptConnectionRequest(@Args('id', { type: () => ID }) id: string) {
    return this.connectionService.acceptRequest(id);
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  deleteConnectionRequest(@Args('id', { type: () => ID }) id: string) {
    return this.connectionService.deleteRequest(id);
  }
}
