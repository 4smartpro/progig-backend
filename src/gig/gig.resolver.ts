import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { GigService } from './gig.service';
import { CreateGigInput } from './dto/create-gig.input';
import { UpdateGigInput } from './dto/update-gig.input';
import { GigsResponse } from './dto/gigs.output';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, Gig, Proposal, User } from '@app/common';
import { JwtAuthGuard } from '@auth/guards';
import { SendProposalInput } from './dto/send-proposal.input';

@Resolver()
export class GigResolver {
  constructor(private readonly gigService: GigService) {}

  @Mutation(() => Gig)
  @UseGuards(JwtAuthGuard)
  createGig(
    @Args('createGigInput') createGigInput: CreateGigInput,
    @CurrentUser() user: User,
  ) {
    return this.gigService.create(createGigInput, user);
  }

  @Query(() => GigsResponse, { name: 'gigs' })
  @UseGuards(JwtAuthGuard)
  findAll(
    @Args('page', { nullable: true, type: () => Int }) page?: number,
    @Args('limit', { nullable: true, type: () => Int }) limit?: number,
    @Args('searchText', { nullable: true }) searchText?: string,
  ) {
    return this.gigService.findAll({ page, limit, searchText });
  }

  @Query(() => Gig, { name: 'gig', nullable: true })
  @UseGuards(JwtAuthGuard)
  findOne(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: User,
  ) {
    return this.gigService.findOne(id, user);
  }

  @Mutation(() => Gig)
  @UseGuards(JwtAuthGuard)
  updateGig(@Args('updateGigInput') updateGigInput: UpdateGigInput) {
    return this.gigService.update(updateGigInput.id, updateGigInput);
  }

  @Mutation(() => Gig)
  @UseGuards(JwtAuthGuard)
  removeGig(@Args('id') id: string) {
    return this.gigService.remove(id);
  }

  @Mutation(() => Proposal)
  @UseGuards(JwtAuthGuard)
  sendProposal(
    @Args('payload') payload: SendProposalInput,
    @CurrentUser() user: User,
  ) {
    return this.gigService.sendProposal(payload, user);
  }

  @Query(() => [Proposal], { name: 'proposals' })
  @UseGuards(JwtAuthGuard)
  getProposals(
    @Args('gigId', { type: () => ID }) gigId: string,
    @CurrentUser() user: User,
  ) {
    return this.gigService.getProposals(gigId, user);
  }
}
