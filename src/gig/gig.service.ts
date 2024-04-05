import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateGigInput } from './dto/create-gig.input';
import { UpdateGigInput } from './dto/update-gig.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { GigsResponse } from './dto/gigs.output';
import { Gig, Proposal, User } from '@app/common';
import { SendProposalInput } from './dto/send-proposal.input';

@Injectable()
export class GigService {
  constructor(
    @InjectRepository(Gig)
    private readonly gigRepository: Repository<Gig>,

    @InjectRepository(Proposal)
    private readonly proposalRepository: Repository<Proposal>,
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

  async findOne(id: string, user: User) {
    const gig = await this.gigRepository.findOne({
      where: { id },
      relations: ['contractor', 'proposals'],
    });

    if (user.id !== gig.contractorId) {
      gig.proposals = gig.proposals.filter((p) => p.helperId === user.id);
    }

    return gig;
  }

  update(id: string, updateGigInput: UpdateGigInput) {
    return this.gigRepository.update(id, updateGigInput);
  }

  remove(id: string) {
    return this.gigRepository.delete(id);
  }

  async sendProposal(payload: SendProposalInput, user: User) {
    const isExists = await this.proposalRepository.findOne({
      where: {
        gigId: payload.gigId,
        helperId: user.id,
      },
    });

    if (isExists)
      throw new UnprocessableEntityException('You already sent propsal');

    return this.proposalRepository
      .create({ ...payload, helperId: user.id })
      .save();
  }

  async getProposals(gigId: string, user: User) {
    const gig = await this.gigRepository.findOne({ where: { id: gigId } });

    const where = { gigId };

    if (gig.contractorId !== user.id) where['helperId'] = user.id;

    return this.proposalRepository.find({
      where,
    });
  }
}
