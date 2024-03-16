import { Resolver, Query, Args, Subscription, ID } from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { Chat } from '@app/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@auth/guards';

@Resolver(() => Chat)
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

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
