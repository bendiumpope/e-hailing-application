import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ride } from './entities/ride.entity';
import { RidesService } from './rides.service';
import { RidesController } from './rides.controller';
import { DriversModule } from '../drivers/drivers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ride]), DriversModule],
  providers: [RidesService],
  controllers: [RidesController],
})
export class RidesModule {}
