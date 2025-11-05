import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('drivers')
export class Driver {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  carModel: string;

  @Column()
  plateNumber: string;

  @Column({ default: false })
  isOnline: boolean;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  userId: string;
}
