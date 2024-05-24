import { ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../abstract.entity';

@ObjectType()
@Entity()
export class Content extends AbstractEntity {
  @Column()
  url: string;
}
