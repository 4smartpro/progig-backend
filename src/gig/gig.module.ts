import { Module } from '@nestjs/common';
import { GigService } from './gig.service';
import { GigResolver } from './gig.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gig, Proposal } from '@app/common';

@Module({
  imports: [TypeOrmModule.forFeature([Gig, Proposal])],
  providers: [GigResolver, GigService],
})
export class GigModule {}
