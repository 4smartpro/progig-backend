import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ContractService } from './contract.service';
import { Contract, CurrentUser, User, UserRole } from '@app/common';
import { ContractsResponse } from './dto/get-contracts.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RolesGuard } from '@auth/guards';
import { UpdateContractInput } from './dto/update-contract.input';
import { UseRoles } from 'src/auth/auth.decorator';

@Resolver(() => Contract)
export class ContractResolver {
  constructor(private readonly contractService: ContractService) {}

  @Query(() => ContractsResponse, { name: 'contracts' })
  @UseGuards(JwtAuthGuard)
  findAll(
    @CurrentUser() user: User,
    @Args('page', { nullable: true, type: () => Int }) page?: number,
    @Args('limit', { nullable: true, type: () => Int }) limit?: number,
    @Args('searchText', { nullable: true }) searchText?: string,
    @Args('asContractor', { nullable: true }) asContractor?: boolean,
  ) {
    return this.contractService.findAll({
      page,
      limit,
      searchText,
      userId: user.id,
      asContractor,
    });
  }

  @Query(() => Contract, { name: 'contract' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.contractService.findOne(id);
  }

  @Mutation(() => Contract)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseRoles(UserRole.CONTRACTOR)
  contractUpdate(@Args('payload') payload: UpdateContractInput) {
    return this.contractService.update(payload);
  }

  @Mutation(() => Contract)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseRoles(UserRole.CONTRACTOR)
  contractRemove(@Args('id', { nullable: true }) id: string) {
    return this.contractService.remove(id);
  }
}
