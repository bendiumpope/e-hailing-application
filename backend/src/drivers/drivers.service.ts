import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './entities/driver.entity';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private readonly driversRepository: Repository<Driver>,
  ) {}

  async updateStatus(id: string, isOnline: boolean): Promise<Driver> {
    const driver = await this.driversRepository.findOne({ where: { id } });

    if (!driver) {
      throw new NotFoundException(`Driver with id ${id} not found`);
    }

    driver.isOnline = isOnline;
    return await this.driversRepository.save(driver);
  }

  async findAvailableDrivers(): Promise<Driver[]> {
    return this.driversRepository.find({ where: { isOnline: true } });
  }
}
