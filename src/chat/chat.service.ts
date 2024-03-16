import { Injectable } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat, ChatUser, Message, User } from '@app/common';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { ChatsResponse } from './dto/chat.dto';
import { ConversationsResponse } from './dto/message.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,

    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,

    private readonly userService: UserService,
  ) {}

  async sendMessage(payload: CreateChatInput, user: User) {
    let chat = await this.chatRepository.findOne({
      where: [
        { senderId: user.id, receiverId: payload.receiverId },
        { senderId: payload.receiverId, receiverId: user.id },
      ],
      relations: ['sender', 'receiver'],
    });

    if (!chat) {
      const receiver = await this.userService.getUserById(payload.receiverId);
      chat = await this.chatRepository
        .create({ sender: user, receiver })
        .save();
    }

    const message = await this.messageRepository
      .create({ message: payload.message, senderId: user.id, chatId: chat.id })
      .save();

    chat.lastMessage = message;

    await chat.save();

    return chat;
  }

  async getChats(params: {
    searchText: string;
    limit: number;
    page: number;
    userId: string;
  }): Promise<ChatsResponse> {
    const [entries, total] = await this.chatRepository.findAndCount({
      where: [{ senderId: params.userId }, { receiverId: params.userId }],
      skip: params.page ? (params.page - 1) * params.limit : 0,
      take: params.limit,
      relations: ['sender', 'receiver', 'lastMessage'],
    });

    return {
      entries,
      total,
    };
  }

  async getConversations(params: {
    searchText: string;
    limit: number;
    page: number;
    chatId: string;
  }): Promise<ConversationsResponse> {
    const [entries, total] = await this.messageRepository.findAndCount({
      where: { chatId: params.chatId },
      skip: params.page ? (params.page - 1) * params.limit : 0,
      take: params.limit,
      relations: ['sender'],
    });

    return {
      entries,
      total,
    };
  }

  findOne(id: string) {
    return this.chatRepository.findOne({ where: { id } });
  }

  update(id: number, updateChatInput: UpdateChatInput) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
