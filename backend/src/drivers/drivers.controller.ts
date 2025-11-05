import { Controller, Patch, Body, Param, Get } from '@nestjs/common';
import { DriversService } from './drivers.service';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('isOnline') isOnline: boolean) {
    return this.driversService.updateStatus(id, isOnline);
  }

  @Get('available')
  findAvailableDrivers() {
    return this.driversService.findAvailableDrivers();
  }
}
