import { Module } from '@nestjs/common';
import { GigService } from './gig.service';
import { GigResolver } from './gig.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gig } from '@app/common';

@Module({
  imports: [TypeOrmModule.forFeature([Gig])],
  providers: [GigResolver, GigService],
})
export class GigModule {}
