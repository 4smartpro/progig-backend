import { Injectable } from '@nestjs/common';
import { CreateGigInput } from './dto/create-gig.input';
import { UpdateGigInput } from './dto/update-gig.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { GigsResponse } from './dto/gigs.output';
import { Gig, User } from '@app/common';

@Injectable()
export class GigService {
  constructor(
    @InjectRepository(Gig) private readonly gigRepository: Repository<Gig>,
  ) {}

  async create(createGigInput: CreateGigInput, user: User) {
    return this.gigRepository
      .create({ ...createGigInput, contractorId: user.id })
      .save();
  }

  async findAll(params: {
    searchText: string;
    limit: number;
    page: number;
  }): Promise<GigsResponse> {
    const [entries, total] = await this.gigRepository.findAndCount({
      where: {
        description: ILike(`%${params.searchText}%`),
      },
      skip: params.page ? (params.page - 1) * params.limit : 0,
      take: params.limit,
      relations: ['contractor'],
    });
    return {
      entries,
      total,
    };
  }

  findOne(id: string) {
    return this.gigRepository.findOne({
      where: { id },
      relations: ['contractor'],
    });
  }

  update(id: string, updateGigInput: UpdateGigInput) {
    return this.gigRepository.update(id, updateGigInput);
  }

  remove(id: string) {
    return this.gigRepository.delete(id);
  }
}
