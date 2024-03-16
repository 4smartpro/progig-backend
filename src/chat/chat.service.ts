import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from '@app/common';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
  ) {}

  findAll() {
    return this.chatRepository.find({});
  }

  findOne(id: string) {
    return this.chatRepository.findOne({ where: { id } });
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
