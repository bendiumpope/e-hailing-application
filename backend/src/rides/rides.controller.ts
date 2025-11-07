import { Controller, Post, Get, Patch, Body, Param, UseGuards, Request } from '@nestjs/common';
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

  @UseGuards(JwtAuthGuard)
  @Get('available')
  getAvailableRides() {
    return this.ridesService.getAvailableRides();
  }

  @UseGuards(JwtAuthGuard)
  @Get('driver')
  getDriverRides(@Request() req) {
    return this.ridesService.getDriverRides(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/accept')
  acceptRide(@Param('id') rideId: string, @Request() req) {
    return this.ridesService.acceptRide(rideId, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/reject')
  rejectRide(@Param('id') rideId: string, @Request() req) {
    return this.ridesService.rejectRide(rideId, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/start')
  startRide(@Param('id') rideId: string, @Request() req) {
    return this.ridesService.startRide(rideId, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/complete')
  completeRide(@Param('id') rideId: string, @Request() req) {
    return this.ridesService.completeRide(rideId, req.user.id);
  }
}
