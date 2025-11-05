import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ride } from './entities/ride.entity';
import { DriversService } from '../drivers/drivers.service';

@Injectable()
export class RidesService {
  constructor(
    @InjectRepository(Ride)
    private readonly ridesRepository: Repository<Ride>,
    private readonly driversService: DriversService,
  ) {}

  async createRide(rideData: Partial<Ride>): Promise<Ride> {
    const availableDrivers = await this.driversService.findAvailableDrivers();
    if (availableDrivers.length === 0) {
      throw new Error('No available drivers');
    }

    const newRide = this.ridesRepository.create({
      ...rideData,
      driver: availableDrivers[0],
    });

    return this.ridesRepository.save(newRide);
  }
}
