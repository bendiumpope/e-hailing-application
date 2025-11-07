import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { DriversModule } from './drivers/drivers.module';
import { RidesModule } from './rides/rides.module';
import { Driver } from './drivers/entities/driver.entity';
import { Ride } from './rides/entities/ride.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST') || 'localhost',
        port: configService.get<number>('DATABASE_PORT') || 5432,
        username: configService.get<string>('DATABASE_USER') || 'postgres',
        password: configService.get<string>('DATABASE_PASSWORD') || 'password',
        database: configService.get<string>('DATABASE_DB') || 'ehailing',
        entities: [User, Driver, Ride],
        synchronize: true,
        // Keep database between restarts in development
        // dropSchema: process.env.NODE_ENV !== 'production',
      }),
    }),
    AuthModule,
    UsersModule,
    DriversModule,
    RidesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
