import { Module } from '@nestjs/common';
import { GigService } from './gig.service';
import { GigResolver } from './gig.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract, Gig, Proposal, SavedGig } from '@app/common';

@Module({
  imports: [TypeOrmModule.forFeature([Gig, Proposal, Contract, SavedGig])],
  providers: [GigResolver, GigService],
})
export class GigModule {}
