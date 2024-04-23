import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateGigInput } from './dto/create-gig.dto';
import { UpdateGigInput } from './dto/update-gig.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { GigsResponse } from './dto/gigs.dto';
import {
  Contract,
  Gig,
  Proposal,
  ProposalStatus,
  SavedGig,
  User,
} from '@app/common';
import { SendProposalInput } from './dto/send-proposal.dto';
import { PaginationDto } from '@app/common/util/default.dto';
import { GetMyProposalDto } from './dto/get-proposals.dto';
import { SaveGigInput } from './dto/save-gig.dto';

@Injectable()
export class GigService {
  constructor(
    @InjectRepository(Gig)
    private readonly gigRepository: Repository<Gig>,

    @InjectRepository(Proposal)
    private readonly proposalRepository: Repository<Proposal>,

    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,

    @InjectRepository(SavedGig)
    private readonly savedGigRepository: Repository<SavedGig>,
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
    contractorId?: string;
  }): Promise<GigsResponse> {
    const where = {};

    if (params.contractorId) {
      where['contractorId'] = params.contractorId;
    }
    const [entries, total] = await this.gigRepository.findAndCount({
      where: {
        description: ILike(`%${params.searchText}%`),
        ...where,
      },
      skip: params.page ? (params.page - 1) * params.limit : 0,
      take: params.limit,
      relations: ['contractor', 'proposals'],
    });

    return {
      entries: entries.map((e) => {
        e.noOfProposals = e.proposals.length;
        return e;
      }),
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
    const gig = await this.gigRepository.findOne({
      where: {
        id: payload.gigId,
      },
      relations: ['proposals'],
    });

    if (gig.proposals.length >= gig.maxProposal) {
      throw new UnprocessableEntityException(
        'Proposal limit exceed. You cannot send any proposal',
      );
    }
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

  async withdrawProposal(id: string, user: User) {
    const proposal = await this.proposalRepository.findOne({
      where: {
        id,
        helperId: user.id,
      },
    });

    if (!proposal) throw new NotFoundException('Proposal does not exists');

    proposal.status = ProposalStatus.DELETED;
    await proposal.save();

    return proposal;
  }

  async acceptProposal(id: string, user: User) {
    const proposal = await this.proposalRepository.findOne({
      where: { id },
      relations: ['gig'],
    });

    if (proposal.gig.contractorId !== user.id) {
      throw new UnauthorizedException('Permission denied');
    }

    if (proposal.status === ProposalStatus.PENDING) {
      proposal.status = ProposalStatus.ACCEPTED;
      await proposal.save();

      const contract = await this.contractRepository
        .create({
          gigId: proposal.gigId,
          proposal: proposal,
          helperId: proposal.helperId,
          contractorId: proposal.gig.contractorId,
          startDate: proposal.gig.startDate,
          endDate: proposal.gig.startDate,
        })
        .save();

      return { contract, proposal };
    } else if (proposal.status === ProposalStatus.ACCEPTED) {
      throw new BadRequestException('Proposal already accepted');
    } else {
      throw new BadRequestException();
    }
  }

  async rejectProposal(id: string, user: User) {
    const proposal = await this.proposalRepository.findOne({
      where: { id },
      relations: ['gig'],
    });

    if (proposal.gig.contractorId !== user.id) {
      throw new UnauthorizedException('Permission denied');
    }

    if (proposal.status === ProposalStatus.PENDING) {
      proposal.status = ProposalStatus.REJECTED;
      await proposal.save();

      return proposal;
    } else if (proposal.status === ProposalStatus.ACCEPTED) {
      throw new BadRequestException('Proposal already accepted');
    } else {
      throw new BadRequestException();
    }
  }

  async getProposals(gigId: string, user: User) {
    const gig = await this.gigRepository.findOne({ where: { id: gigId } });

    const where = { gigId };

    if (gig.contractorId !== user.id) where['helperId'] = user.id;

    return this.proposalRepository.find({
      where,
    });
  }

  async getMyProposals({
    helperId,
    page,
    limit,
    searchText,
  }: GetMyProposalDto) {
    const [entries, total] = await this.proposalRepository.findAndCount({
      where: {
        helperId,
        coverLetter: ILike(`%${searchText}%`),
      },
      skip: page ? (page - 1) * limit : 0,
      take: limit,
      relations: ['gig'],
    });

    return {
      entries,
      total,
    };
  }

  async saveUnsaveGig({ gigId, userId }: SaveGigInput) {
    const isExists = await this.savedGigRepository.findOne({
      where: { userId, gigId },
    });

    if (isExists) {
      await isExists.remove();
      return null;
    }

    const saved = await this.savedGigRepository
      .create({ userId, gigId })
      .save();
    return saved.id;
  }

  async savedGigs(params: {
    searchText: string;
    limit: number;
    page: number;
    userId: string;
  }): Promise<GigsResponse> {
    const [entries, total] = await this.savedGigRepository.findAndCount({
      where: {
        userId: params.userId,
      },
      skip: params.page ? (params.page - 1) * params.limit : 0,
      take: params.limit,
      relations: ['gig'],
    });

    return {
      entries: entries.map((e) => {
        return e.gig;
      }),
      total,
    };
  }
}
