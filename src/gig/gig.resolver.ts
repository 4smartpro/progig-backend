import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { GigService } from './gig.service';
import { CreateGigInput } from './dto/create-gig.input';
import { UpdateGigInput } from './dto/update-gig.input';
import { GigsResponse } from './dto/gigs.output';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser, Gig, User } from '@app/common';

@Resolver(() => Gig)
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
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.gigService.findOne(id);
  }

  @Mutation(() => Gig)
  updateGig(@Args('updateGigInput') updateGigInput: UpdateGigInput) {
    return this.gigService.update(updateGigInput.id, updateGigInput);
  }

  @Mutation(() => Gig)
  removeGig(@Args('id') id: string) {
    return this.gigService.remove(id);
  }
}
