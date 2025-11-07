import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Ride } from '../../rides/entities/ride.entity';

export enum DriverStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  SUSPENDED = 'suspended'
}

@Entity('drivers')
export class Driver {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  carModel: string;

  @Column()
  plateNumber: string;

  @Column({ type: 'jsonb', nullable: true })
  currentLocation: { lat: number; lng: number };

  @Column({ default: false })
  isOnline: boolean;

  @Column({
    type: 'enum',
    enum: DriverStatus,
    default: DriverStatus.PENDING,
  })
  status: DriverStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalEarnings: number;

  @Column({ default: 0 })
  completedRides: number;

  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
  rating: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  userId: string;

  @OneToMany(() => Ride, ride => ride.driver)
  rides: Ride[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
