import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ride, RideStatus } from './entities/ride.entity';
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

    // Assign the first available driver if any
    const assignedDriver = availableDrivers.length > 0 ? availableDrivers[0] : undefined;

    const rideToCreate = {
      ...rideData,
      riderId: user.id,
      driver: assignedDriver,
      driverId: assignedDriver?.id,
    };

    const newRide = this.ridesRepository.create(rideToCreate);

    return this.ridesRepository.save(newRide);
  }

  async acceptRide(rideId: string, driverId: string): Promise<Ride> {
    const ride = await this.ridesRepository.findOne({
      where: { id: rideId },
      relations: ['driver']
    });

    if (!ride) {
      throw new Error('Ride not found');
    }

    if (ride.status !== 'requested') {
      throw new Error('Ride is not available for acceptance');
    }

    // Verify driver exists (will be handled by the driversService method)
    const driver = await this.driversService.findByUserId(driverId);
    if (!driver) {
      throw new Error('Driver not found');
    }

    ride.status = RideStatus.ACCEPTED;
    ride.driver = driver;
    ride.driverId = driverId;

    return this.ridesRepository.save(ride);
  }

  async rejectRide(rideId: string, driverId: string): Promise<Ride> {
    const ride = await this.ridesRepository.findOne({
      where: { id: rideId },
      relations: ['driver']
    });

    if (!ride) {
      throw new Error('Ride not found');
    }

    if (ride.driverId !== driverId) {
      throw new Error('Driver not assigned to this ride');
    }

    // If ride is rejected, reset to requested status and remove driver assignment
    ride.status = RideStatus.REQUESTED;
    ride.driver = undefined;
    ride.driverId = undefined;

    return this.ridesRepository.save(ride);
  }

  async startRide(rideId: string, driverId: string): Promise<Ride> {
    const ride = await this.ridesRepository.findOne({
      where: { id: rideId, driverId },
      relations: ['driver']
    });

    if (!ride) {
      throw new Error('Ride not found or not assigned to this driver');
    }

    if (ride.status !== RideStatus.ACCEPTED) {
      throw new Error('Ride must be accepted before starting');
    }

    ride.status = RideStatus.IN_PROGRESS;
    return this.ridesRepository.save(ride);
  }

  async completeRide(rideId: string, driverId: string): Promise<Ride> {
    const ride = await this.ridesRepository.findOne({
      where: { id: rideId, driverId },
      relations: ['driver']
    });

    if (!ride) {
      throw new Error('Ride not found or not assigned to this driver');
    }

    if (ride.status !== RideStatus.IN_PROGRESS) {
      throw new Error('Ride must be in progress to complete');
    }

    ride.status = RideStatus.COMPLETED;
    ride.endTime = new Date();

    // Update driver earnings and completed rides
    if (ride.driver) {
      await this.driversService.updateEarnings(ride.driver.id, Number(ride.fare));
    }

    return this.ridesRepository.save(ride);
  }

  async getDriverRides(driverId: string): Promise<Ride[]> {
    return this.ridesRepository.find({
      where: { driverId },
      relations: ['driver', 'rider'],
      order: { startTime: 'DESC' }
    });
  }

  async getAvailableRides(): Promise<Ride[]> {
    return this.ridesRepository.find({
      where: { status: RideStatus.REQUESTED },
      relations: ['rider'],
      order: { startTime: 'ASC' }
    });
  }
}
