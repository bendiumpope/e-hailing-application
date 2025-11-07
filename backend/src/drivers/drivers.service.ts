import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver, DriverStatus } from './entities/driver.entity';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../users/entities/user-role.enum';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private readonly driversRepository: Repository<Driver>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createDriverDto: CreateDriverDto, userId: string): Promise<Driver> {
    // Basic validation
    if (!createDriverDto.carModel || !createDriverDto.plateNumber) {
      throw new BadRequestException('Car model and plate number are required');
    }

    // Check if user is already a driver
    const existingDriver = await this.driversRepository.findOne({ where: { userId } });
    if (existingDriver) {
      throw new BadRequestException('User is already registered as a driver');
    }

    // Check if user exists
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Ensure user has driver role (should already be set during signup)
    if (user.role !== UserRole.DRIVER) {
      user.role = UserRole.DRIVER;
      await this.usersRepository.save(user);
    }

    const driver = this.driversRepository.create({
      ...createDriverDto,
      userId,
      user,
    });

    return this.driversRepository.save(driver);
  }

  async updateStatus(id: string, isOnline: boolean): Promise<Driver> {
    const driver = await this.driversRepository.findOne({ where: { id } });

    if (!driver) {
      throw new NotFoundException(`Driver with id ${id} not found`);
    }

    if (driver.status !== DriverStatus.APPROVED) {
      throw new BadRequestException('Driver must be approved to change online status');
    }

    driver.isOnline = isOnline;
    return await this.driversRepository.save(driver);
  }

  async updateLocation(id: string, location: { lat: number; lng: number }): Promise<Driver> {
    const driver = await this.driversRepository.findOne({ where: { id } });

    if (!driver) {
      throw new NotFoundException(`Driver with id ${id} not found`);
    }

    driver.currentLocation = location;
    return this.driversRepository.save(driver);
  }

  async updateDriver(id: string, updateDriverDto: UpdateDriverDto): Promise<Driver> {
    const driver = await this.driversRepository.findOne({ where: { id } });

    if (!driver) {
      throw new NotFoundException(`Driver with id ${id} not found`);
    }

    Object.assign(driver, updateDriverDto);
    return this.driversRepository.save(driver);
  }

  async findAvailableDrivers(): Promise<Driver[]> {
    return this.driversRepository.find({
      where: { isOnline: true, status: DriverStatus.APPROVED },
      relations: ['user']
    });
  }

  async findByUserId(userId: string): Promise<Driver | null> {
    return this.driversRepository.findOne({
      where: { userId },
      relations: ['user', 'rides']
    });
  }

  async findAll(): Promise<Driver[]> {
    return this.driversRepository.find({
      relations: ['user'],
      order: { createdAt: 'DESC' }
    });
  }

  async approveDriver(id: string): Promise<Driver> {
    const driver = await this.driversRepository.findOne({ where: { id } });

    if (!driver) {
      throw new NotFoundException(`Driver with id ${id} not found`);
    }

    driver.status = DriverStatus.APPROVED;
    return this.driversRepository.save(driver);
  }

  async rejectDriver(id: string): Promise<Driver> {
    const driver = await this.driversRepository.findOne({ where: { id } });

    if (!driver) {
      throw new NotFoundException(`Driver with id ${id} not found`);
    }

    driver.status = DriverStatus.REJECTED;
    return this.driversRepository.save(driver);
  }

  async updateEarnings(driverId: string, amount: number): Promise<Driver> {
    const driver = await this.driversRepository.findOne({ where: { id: driverId } });

    if (!driver) {
      throw new NotFoundException(`Driver with id ${driverId} not found`);
    }

    driver.totalEarnings += amount;
    driver.completedRides += 1;
    return this.driversRepository.save(driver);
  }
}
