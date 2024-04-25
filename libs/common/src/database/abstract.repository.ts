import { AbstractEntity } from '@app/common';
import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { BaseInterfaceRepository } from './abstract.interface';

export abstract class AbstractRepositry<T extends AbstractEntity>
  implements BaseInterfaceRepository<T>
{
  constructor(private entity: Repository<T>) {}

  public create(data: DeepPartial<T>): Promise<T> {
    return this.entity.create(data).save();
  }

  public async findOneById(id: any): Promise<T> {
    const options: FindOptionsWhere<T> = { id };
    return await this.entity.findOneBy(options);
  }

  public async findOne(options: FindOneOptions<T>): Promise<T> {
    return this.entity.findOne(options);
  }

  public async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.entity.find(options);
  }

  public async remove(id: string): Promise<DeleteResult> {
    return this.entity.delete(id);
  }

  public async update(data: DeepPartial<T>): Promise<T> {
    return this.entity.save(data);
  }
}
