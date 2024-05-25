import {
  Resolver,
  Query,
  Args,
  Subscription,
  ID,
  Mutation,
  Int,
} from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { Chat, CurrentUser, Message, User } from '@app/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@auth/guards';
import { CreateChatInput } from './dto/create-chat.dto';
import { ChatsResponse } from './dto/chat.dto';
import { ConversationsResponse } from './dto/message.dto';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();
@Resolver(() => Chat)
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Mutation(() => Chat)
  @UseGuards(JwtAuthGuard)
  async sendMessage(
    @Args('payload') payload: CreateChatInput,
    @CurrentUser() user: User,
  ) {
    const chat = await this.chatService.sendMessage(payload, user);
    pubSub.publish('messageAdded', { messageAdded: chat.lastMessage });
    return chat;
  }

  @Query(() => ChatsResponse, { name: 'chats' })
  @UseGuards(JwtAuthGuard)
  findAllChat(
    @CurrentUser() user: User,
    @Args('page', { nullable: true, type: () => Int }) page?: number,
    @Args('limit', { nullable: true, type: () => Int }) limit?: number,
    @Args('searchText', { nullable: true }) searchText?: string,
  ) {
    return this.chatService.getChats({
      page,
      limit,
      searchText,
      userId: user.id,
    });
  }

  @Query(() => ConversationsResponse, { name: 'conversations' })
  @UseGuards(JwtAuthGuard)
  findAllConversations(
    @Args('chatId', { type: () => ID }) chatId?: string,
    @Args('page', { nullable: true, type: () => Int }) page?: number,
    @Args('limit', { nullable: true, type: () => Int }) limit?: number,
    @Args('searchText', { nullable: true }) searchText?: string,
  ) {
    return this.chatService.getConversations({
      page,
      limit,
      searchText,
      chatId,
    });
  }

  @Subscription(() => Message, {
    filter: (
      payload: { messageAdded: { chatId: string } },
      variables: { chatId: string },
    ) => payload.messageAdded.chatId === variables.chatId,
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  messageAdded(@Args('chatId', { type: () => ID }) _chatId: string) {
    return pubSub.asyncIterator('messageAdded');
  }
}
