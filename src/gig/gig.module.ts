import { Module } from '@nestjs/common';
import { GigService } from './gig.service';
import { GigResolver } from './gig.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AzureFilesService,
  Content,
  Contract,
  Gig,
  Proposal,
  SavedGig,
} from '@app/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([Gig, Proposal, SavedGig, Contract, Content]),
  ],
  providers: [GigResolver, GigService, AzureFilesService],
})
export class GigModule {}
