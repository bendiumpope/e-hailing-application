import { Controller, Post, Body } from '@nestjs/common';
import { RidesService } from './rides.service';
import { Ride } from './entities/ride.entity';

@Controller('rides')
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  @Post()
  createRide(@Body() rideData: Partial<Ride>) {
    return this.ridesService.createRide(rideData);
  }
}
