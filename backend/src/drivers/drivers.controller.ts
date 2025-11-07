import { Controller, Post, Get, Patch, Body, Param, UseGuards, Request } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @UseGuards(JwtAuthGuard)
  @Post('register')
  registerDriver(@Body() createDriverDto: CreateDriverDto, @Request() req) {
    return this.driversService.create(createDriverDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMyDriverProfile(@Request() req) {
    return this.driversService.findByUserId(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() updateDto: UpdateDriverDto) {
    if (updateDto.isOnline !== undefined) {
      return this.driversService.updateStatus(id, updateDto.isOnline);
    }
    return this.driversService.updateDriver(id, updateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/location')
  updateLocation(@Param('id') id: string, @Body('location') location: { lat: number; lng: number }) {
    return this.driversService.updateLocation(id, location);
  }

  @Get('available')
  findAvailableDrivers() {
    return this.driversService.findAvailableDrivers();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllDrivers() {
    return this.driversService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/approve')
  approveDriver(@Param('id') id: string) {
    return this.driversService.approveDriver(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/reject')
  rejectDriver(@Param('id') id: string) {
    return this.driversService.rejectDriver(id);
  }
}
