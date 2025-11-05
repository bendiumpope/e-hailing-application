import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './entities/driver.entity';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private readonly driversRepository: Repository<Driver>,
  ) {}

  async updateStatus(driverId: string, isOnline: boolean): Promise<Driver> {
    const driver = await this.driversRepository.findOne({ where: { id: driverId } });
    driver.isOnline = isOnline;
    return this.driversRepository.save(driver);
  }

  async findAvailableDrivers(): Promise<Driver[]> {
    return this.driversRepository.find({ where: { isOnline: true } });
  }
}
