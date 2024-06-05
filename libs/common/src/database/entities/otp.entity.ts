import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../abstract.entity';

@Entity()
export class OTP extends AbstractEntity {
  @Column()
  email: string;

  @Column()
  otp: number;
}
