import { Injectable } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat, ChatUser, Message, User } from '@app/common';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    private readonly chatUserRepository: Repository<ChatUser>,
    private readonly messageRepository: Repository<Message>,
  ) {}

  async create(payload: CreateChatInput, user: User) {
    const chat = await this.chatRepository.create({});
    const users = await this.chatUserRepository.insert([
      {
        chatId: chat.id,
        userId: payload.receiverId,
      },
      {
        chatId: chat.id,
        userId: user.id,
      },
    ]);
    const message = await this.messageRepository.create({
      message: payload.message,
      senderId: user.id,
      chatId: chat.id,
    });
  }

  findAll() {
    return this.chatRepository.find({});
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
