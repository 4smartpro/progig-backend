import { Injectable } from '@nestjs/common';
import { UpdateContractInput } from './dto/update-contract.input';
import { GetContractsDto } from './dto/get-contracts.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contract } from '@app/common';
import { Repository } from 'typeorm';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,
  ) {}

  async findAll(params: GetContractsDto) {
    const where = {};

    if (params.asContractor) {
      where['contractorId'] = params.userId;
    } else {
      where['helperId'] = params.userId;
    }

    const [entries, total] = await this.contractRepository.findAndCount({
      where,
      skip: params.page ? (params.page - 1) * params.limit : 0,
      take: params.limit,
      relations: ['gig', 'proposal', 'helper', 'contractor'],
    });

    return {
      entries,
      total,
    };
  }

  findOne(id: string) {
    return this.contractRepository.findOne({
      where: { id },
      relations: ['gig', 'proposal', 'helper', 'contractor'],
    });
  }

  update({ id, ...payload }: UpdateContractInput) {
    return this.contractRepository.update(id, payload);
  }

  remove(id: string) {
    return this.contractRepository.delete(id);
  }
}
