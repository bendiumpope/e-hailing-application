import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Driver } from '../../drivers/entities/driver.entity';

export enum RideStatus {
  REQUESTED = 'requested',
  ACCEPTED = 'accepted',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('rides')
export class Ride {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'jsonb' })
  pickupLocation: { lat: number; lng: number };

  @Column({ type: 'jsonb' })
  destination: { lat: number; lng: number };

  @Column()
  fare: number;

  @Column({
    type: 'enum',
    enum: RideStatus,
    default: RideStatus.REQUESTED,
  })
  status: RideStatus;

  @ManyToOne(() => User)
  @JoinColumn()
  rider: User;

  @Column()
  riderId: string;

  @ManyToOne(() => Driver, { nullable: true })
  @JoinColumn()
  driver?: Driver;

  @Column({ nullable: true })
  driverId?: string;

  @CreateDateColumn()
  startTime: Date;

  @Column({ nullable: true })
  endTime?: Date;
}
