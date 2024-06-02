import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AzureFilesService, Chat, Message, User } from '@app/common';
import { Not, Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { ChatsResponse } from './dto/chat.dto';
import { ConversationsResponse } from './dto/message.dto';
import { ConnectionService } from 'src/connection/connection.service';
import { GetConversationDto } from './dto/get-conversation.dto';

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
      await message.save();
    }

    chat.lastMessage = message;

    await chat.save();

    const unread = await this.messageRepository.count({
      where: { chatId: chat.id, senderId: user.id, seen: false },
    });

    const findTotalUnseen = await this.findTotalUnseen(payload.receiverId);

    chat.unseen = unread;
    chat.totalUnseen = findTotalUnseen.unseen;

    console.log(chat);

    return { message, chat };
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

  async getConversations({
    limit,
    page,
    chatId,
    userId,
    participantId,
  }: GetConversationDto): Promise<ConversationsResponse> {
    const where: any = {};
    if (chatId) {
      where.chatId = chatId;
    } else if (participantId) {
      const chat = await this.chatRepository.findOne({
        where: [
          { senderId: userId, receiverId: participantId },
          { senderId: participantId, receiverId: userId },
        ],
      });

      if (chat) {
        where.chatId = chat.id;
      }
    } else {
      return {
        entries: [],
        total: 0,
      };
    }

    const [entries, total] = await this.messageRepository.findAndCount({
      where,
      skip: page ? (page - 1) * limit : 0,
      take: limit,
      relations: ['sender'],
      order: { createdAt: 'DESC' },
    });

    return {
      entries,
      total,
    };
  }

  findOne(id: string) {
    return this.chatRepository.findOne({ where: { id } });
  }

  findTotalUnseen(userId: string) {
    return this.chatRepository
      .createQueryBuilder('chat')
      .where({ senderId: userId })
      .orWhere({ receiverId: userId })
      .loadRelationCountAndMap(
        'chat.unseen',
        'chat.conversations',
        'message',
        (query) => query.andWhere(`message.seen = :seen`, { seen: false }),
      )
      .getOne();
  }
}
