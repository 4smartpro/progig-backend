import { Injectable } from '@nestjs/common';
import { CreateContractInput } from './dto/create-contract.input';
import { UpdateContractInput } from './dto/update-contract.input';

@Injectable()
export class ContractService {
  constructor() {}
  create(createContractInput: CreateContractInput) {
    return 'This action adds a new contract';
  }

  findAll() {
    return `This action returns all contract`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contract`;
  }

  update(id: number, updateContractInput: UpdateContractInput) {
    return `This action updates a #${id} contract`;
  }

  remove(id: number) {
    return `This action removes a #${id} contract`;
  }
}
