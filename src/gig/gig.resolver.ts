import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { GigService } from './gig.service';
import { CreateGigInput } from './dto/create-gig.dto';
import { UpdateGigInput } from './dto/update-gig.dto';
import { GigsResponse } from './dto/gigs.dto';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, Gig, Proposal, User, UserRole } from '@app/common';
import { JwtAuthGuard, RolesGuard } from '@auth/guards';
import { SendProposalInput } from './dto/send-proposal.dto';
import { UseRoles } from 'src/auth/auth.decorator';
import { AcceptProposalResponse } from './dto/accept-proposal.dto';
import { ProposalsResponse } from './dto/get-proposals.dto';

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
    @Args('contractorId', { nullable: true }) contractorId?: string,
  ) {
    return this.gigService.findAll({
      page,
      limit,
      searchText,
      contractorId,
    });
  }

  @Query(() => GigsResponse, { name: 'myGigs' })
  @UseGuards(JwtAuthGuard)
  findAllMyGigs(
    @CurrentUser() user: User,
    @Args('page', { nullable: true, type: () => Int }) page?: number,
    @Args('limit', { nullable: true, type: () => Int }) limit?: number,
    @Args('searchText', { nullable: true }) searchText?: string,
  ) {
    return this.gigService.findAll({
      page,
      limit,
      searchText,
      contractorId: user.id,
    });
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

  /**
   * All Proposal Related API
   */
  @Mutation(() => Proposal)
  @UseGuards(JwtAuthGuard)
  sendProposal(
    @Args('payload') payload: SendProposalInput,
    @CurrentUser() user: User,
  ) {
    return this.gigService.sendProposal(payload, user);
  }

  @Mutation(() => AcceptProposalResponse)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseRoles(UserRole.CONTRACTOR)
  acceptProposal(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: User,
  ) {
    return this.gigService.acceptProposal(id, user);
  }

  @Mutation(() => Proposal)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseRoles(UserRole.CONTRACTOR)
  rejectProposal(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: User,
  ) {
    return this.gigService.rejectProposal(id, user);
  }

  @Query(() => [Proposal], { name: 'proposals' })
  @UseGuards(JwtAuthGuard)
  getProposals(
    @Args('gigId', { type: () => ID }) gigId: string,
    @CurrentUser() user: User,
  ) {
    return this.gigService.getProposals(gigId, user);
  }

  @Query(() => ProposalsResponse, { name: 'myProposals' })
  @UseGuards(JwtAuthGuard)
  getMyProposals(
    @CurrentUser() user: User,
    @Args('page', { nullable: true, type: () => Int }) page?: number,
    @Args('limit', { nullable: true, type: () => Int }) limit?: number,
    @Args('searchText', { nullable: true }) searchText?: string,
  ) {
    return this.gigService.getMyProposals({
      helperId: user.id,
      page,
      limit,
      searchText,
    });
  }

  // Get My All Sent Proposals List

  /**
   * All Contract Related API
   */
}
