import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
} from 'typeorm';

export interface BaseInterfaceRepository<T> {
  create(data: DeepPartial<T>): Promise<T>;
  findOneById(id: string): Promise<T>;
  findAll(options?: FindManyOptions<T>): Promise<T[]>;
  remove(id: any): Promise<DeleteResult>;
  update(data: DeepPartial<T>): Promise<T>;
  findOne(options: FindOneOptions<T>): Promise<T>;
}
