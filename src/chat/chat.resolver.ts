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
import { MessageResponse } from './dto/message-added.dto';

const pubSub = new PubSub();
@Resolver(() => Chat)
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Mutation(() => Message)
  @UseGuards(JwtAuthGuard)
  async sendMessage(
    @Args('payload') payload: CreateChatInput,
    @CurrentUser() user: User,
  ) {
    console.log(user.id, payload.receiverId);
    const { message, chat } = await this.chatService.sendMessage(payload, user);

    pubSub.publish('messageAdded', { messageAdded: message });
    pubSub.publish('chatAdded', { chatAdded: chat });
    return message;
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
    @CurrentUser() user: User,
    @Args('chatId', { type: () => ID, nullable: true }) chatId?: string,
    @Args('participantId', { type: () => ID, nullable: true })
    participantId?: string,
    @Args('page', { nullable: true, type: () => Int }) page?: number,
    @Args('limit', { nullable: true, type: () => Int }) limit?: number,
    @Args('searchText', { nullable: true }) searchText?: string,
  ) {
    return this.chatService.getConversations({
      page,
      limit,
      searchText,
      chatId,
      userId: user.id,
      participantId,
    });
  }

  @Subscription(() => MessageResponse, {
    filter: (
      payload: { messageAdded: { chatId: string } },
      variables: { chatId: string },
    ) => payload.messageAdded.chatId === variables.chatId,
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  messageAdded(@Args('chatId', { type: () => ID }) chatId: string) {
    return pubSub.asyncIterator('messageAdded');
  }

  @Subscription(() => Chat, {
    filter: (
      { chatAdded }: { chatAdded: Chat },
      variables: { userId: string },
    ) => {
      Object.assign(chatAdded, {
        unseen:
          chatAdded.lastMessage.senderId !== variables.userId
            ? chatAdded.unseen
            : 0,

        totalUnseen:
          chatAdded.lastMessage.senderId !== variables.userId
            ? chatAdded.totalUnseen
            : 0,
      });

      return (
        chatAdded.receiverId === variables.userId ||
        chatAdded.senderId === variables.userId
      );
    },
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  chatAdded(@Args('userId', { type: () => ID }) _userId: string) {
    return pubSub.asyncIterator('chatAdded');
  }
}
