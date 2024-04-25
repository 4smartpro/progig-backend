import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractResolver } from './contract.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from '@app/common';

@Module({
  imports: [TypeOrmModule.forFeature([Contract])],
  providers: [ContractResolver, ContractService],
  exports: [],
})
export class ContractModule {}
