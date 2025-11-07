import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ride } from './entities/ride.entity';
import { DriversService } from '../drivers/drivers.service';
import { CreateRideDto } from './dto/create-ride.dto';

@Injectable()
export class RidesService {
  constructor(
    @InjectRepository(Ride)
    private readonly ridesRepository: Repository<Ride>,
    private readonly driversService: DriversService,
  ) {}

  async createRide(rideData: CreateRideDto, user: any): Promise<Ride> {
    const availableDrivers = await this.driversService.findAvailableDrivers();

    // For now, create a ride without assigning a driver if none are available
    // TODO: Implement proper driver assignment logic
    const rideToCreate = {
      ...rideData,
      riderId: user.id,
    };

    const newRide = this.ridesRepository.create(rideToCreate);

    return this.ridesRepository.save(newRide);
  }
}
