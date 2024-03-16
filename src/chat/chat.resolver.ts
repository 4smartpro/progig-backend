import {
  Resolver,
  Query,
  Args,
  Subscription,
  ID,
  Mutation,
} from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { Chat, CurrentUser, User } from '@app/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@auth/guards';
import { CreateChatInput } from './dto/create-chat.input';

@Resolver(() => Chat)
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Mutation()
  @UseGuards(JwtAuthGuard)
  createChat(
    @Args('payload') payload: CreateChatInput,
    @CurrentUser() user: User,
  ) {
    this.chatService.create(payload, user);
  }

  @Query(() => [Chat], { name: 'chats' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.chatService.findAll();
  }

  @Subscription(() => Chat, { name: 'chat' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.chatService.findOne(id);
  }
}
