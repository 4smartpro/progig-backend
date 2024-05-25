import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AzureFilesService, Chat, Message, User } from '@app/common';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { ChatsResponse } from './dto/chat.dto';
import { ConversationsResponse } from './dto/message.dto';
import { ConnectionService } from 'src/connection/connection.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,

    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,

    private readonly userService: UserService,
    private readonly connectionService: ConnectionService,
    private readonly azureFileService: AzureFilesService,
  ) {}

  async sendMessage({ file, ...payload }: CreateChatInput, user: User) {
    let chat = await this.chatRepository.findOne({
      where: [
        { senderId: user.id, receiverId: payload.receiverId },
        { senderId: payload.receiverId, receiverId: user.id },
      ],
      relations: ['sender', 'receiver'],
    });

    console.log(chat, payload.receiverId);

    if (!chat) {
      const receiver = await this.userService.getUserById(payload.receiverId);
      chat = await this.chatRepository
        .create({ sender: user, receiver })
        .save();
    } else {
      // Is Connected? if so then send message else send first message
      if (chat.senderId === user.id) {
        const isConnected = await this.connectionService.isConnected(
          user.id,
          payload.receiverId,
        );
        if (!isConnected) {
          throw new NotAcceptableException(
            'You cannot send another message before connecting with the user',
          );
        }
      }
    }

    const message = await this.messageRepository
      .create({ message: payload.message, sender: user, chatId: chat.id })
      .save();

    if (file) {
      const fileurl = await this.azureFileService.singleUpload(file);
      message.attachment = fileurl;
    }

    chat.lastMessage = message;

    console.log(chat);

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
}
