import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ContractService } from './contract.service';
import { CreateContractInput } from './dto/create-contract.input';
import { UpdateContractInput } from './dto/update-contract.input';
import { Contract } from '@app/common';

@Resolver(() => Contract)
export class ContractResolver {
  constructor(private readonly contractService: ContractService) {}

  @Mutation(() => Contract)
  createContract(
    @Args('createContractInput') createContractInput: CreateContractInput,
  ) {
    return this.contractService.create(createContractInput);
  }

  @Query(() => [Contract], { name: 'contract' })
  findAll() {
    return this.contractService.findAll();
  }

  @Query(() => Contract, { name: 'contract' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.contractService.findOne(id);
  }

  @Mutation(() => Contract)
  updateContract(
    @Args('updateContractInput') updateContractInput: UpdateContractInput,
  ) {
    return this.contractService.update(
      updateContractInput.id,
      updateContractInput,
    );
  }

  @Mutation(() => Contract)
  removeContract(@Args('id', { type: () => Int }) id: number) {
    return this.contractService.remove(id);
  }

  @Mutation(() => Contract)
  mitualDiscussion(@Args('id', { type: () => Int }) id: number) {
    return this.contractService.remove(id);
  }
}
