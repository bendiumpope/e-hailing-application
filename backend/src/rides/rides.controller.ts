import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { RidesService } from './rides.service';
import { Ride } from './entities/ride.entity';
import { CreateRideDto } from './dto/create-ride.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('rides')
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createRide(@Body() rideData: CreateRideDto, @Request() req) {
    return this.ridesService.createRide(rideData, req.user);
  }
}
